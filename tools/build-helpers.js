const fs = require('fs')
const path = require('path')
const makeLexerClass = require('../lib/makeLexerClass')

module.exports.read = pathToFile => fs.readFileSync(pathToFile, 'UTF-8')

const PathLexer = makeLexerClass({ path: '.*[\\/\\\\]' })

module.exports.getPathAndFilename = fullPath => {
  const lexer = new PathLexer(fullPath)
  let path, filename
  lexer.token('path', lexeme => { path = lexeme })
  lexer.token('ALL', lexeme => { filename = lexeme })
  return { path, filename }
}

module.exports.getSizeStr = str => {
  const size = str.length
  if (size < 10000) return size + ' B'
  if (size < 5e6) return Math.round(size / 1024) + ' KB'
  return Math.round(size / 1024 / 1024) + ' MB'
}

module.exports.frontmatter = `/* By Quick-and-dirty ES6 module bundler */
///<front-matter>
;(function () {
  'use strict'
  const files = {}

  const require = fid => {
    const module = { exports: {} }
    if (!files[fid]) {
      modules[fid](module)
      files[fid] = { exports: module.exports }
    }
    return files[fid].exports
  }

  const modules = {
///</front-matter>
`

module.exports.backmatter = `
///<back-matter>
  }
  require('fid100')   // entry
}())
///</back-matter>
`

// For development, livereload by polling.
module.exports.livereloadmatter = `
setInterval(() => {
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const reload = xhttp.responseText === 'yes' ? true : false
      if (reload) document.location.reload(reload)
    }
  }
  xhttp.open('GET', 'livereload', true)
  xhttp.send()
}, 2000)
`

module.exports.Lexer = makeLexerClass({
  '{': '\\{',
  '}': '\\}',
  '\'': '\'',
  ',': ',',
  '=': '=',
  import: 'import',
  from: 'from',
  export: 'export',
  default: 'default',
  function: 'function',
  class: 'class',
  funcls: 'function|class',
  const: 'const',
  ident: '[a-zA-Z_$][a-zA-Z_$\\d]*',
  brace: '\\{.+\\}'
})

const MinLexer = makeLexerClass({
  S: ' \t',
  SS: '[ \t]+',
  "'": "'",
  '"': '"',
  '`': '`',
  '/': '\\/',
  '//': '\\/\\/',
  '/*': '\\/\\*',
  '*/': '\\*\\/',
  'sq-str-esc': "\\\\.",
  'dq-str-esc': '\\\\.',
  'regexp-esc': '\\\\/',
  quoat: '["\'`]',
  comment: '\\/[\\/\\*]',
  block: '[\'"`]|\\/[\\/\\*]?|\\/'
})

// The minify remove comments and spaces from the raw build.
module.exports.minify = raw => {
  const result = []
  const lexer = new MinLexer(raw)

  const removeSpaces = str => {
    return str.trim().replace(/ *[\+\-\*\/%<>\=\?\:\|&!\(\)\[\]\{\},;] */g,
      match => match.trim())
  }

  const parseComment = () => {
    if (lexer.is('//')) {
      lexer.token('ALL')
    } else if (lexer.is('/*')) {
      lexer.token('/*')
      lexer.mlwithout('*/')
      lexer.token('*/')
    }
  }

  const parseQuoate = line => {
    if (lexer.is("'")) {
      lexer.token("'")
      lexer.escwithout("'", 'sq-str-esc', lexeme => { line += `'${lexeme}'` })
      lexer.token("'")
    } else if (lexer.is('"')) {
      lexer.token('"')
      lexer.escwithout('"', 'dq-str-esc', lexeme => { line += `"${lexeme}"` })
      lexer.token('"')
    } else if (lexer.is('`')) {
      lexer.token('`')
      lexer.mlwithout('`', lexeme => { line += '`' + lexeme + '`'})
      lexer.token('`')
    }
    return line
  }

  lexer.skipWhite()

  let line = ''
  while (!lexer.eof) {
    if (lexer.is('quoat')) {
      line = parseQuoate(line)
    } else if (lexer.is('comment')) {
      parseComment()

    // Ambiguous: /: div-op, /regexp/, //|/* comment
    // The minify() do not know the context.
    } else if (lexer.is('/')) {
      lexer.token('/')
      lexer.escwithout('/', 'regexp-esc', lexeme => { line += `/${lexeme}` })
      if (lexer.is('/') && !lexer.is('comment')) {
        lexer.token('/', lexeme => { line += lexeme })
      }
    } else {
      lexer.without('block', lexeme => { line += removeSpaces(lexeme) })
    }
    lexer.skipSS()
    if (lexer.eol && line) { result.push(line); line = '' }
    lexer.skipWhite()
  }
  return result
}
