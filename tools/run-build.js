/* Quick-and-dirty ES6 module bundler */

const fs = require('fs')
const path = require('path')
const { Lexer, frontmatter, backmatter, read, getPathAndFilename, minify, getSizeStr } = require('./build-helpers')

var files = {}
var absPathToFid = {}
var _fileCounter = 0

const addFile = (absPath, config) => {
  if (files[absPathToFid[absPath]]) return
  const file = new ModuleFile(absPath, config)
  files[file.fid] = file
  console.log('Add:', absPath, `(${getSizeStr(file.target)})`)
}

const getFid = absPath => {
  const fid = 'fid' + _fileCounter++
  absPathToFid[absPath] = fid
  return fid
}

const getAbsPath = (currPath, newPath, config) => {
  if (newPath[0] === '.') return path.resolve(currPath, newPath)
  return path.resolve(config.libPath, newPath)
}

const resetBuild = () => {
  files = {}
  absPathToFid = {}
  _fileCounter = 100
}

class ModuleFile {
  constructor(absPath, config) {
    if (!/\.js/.test(absPath)) absPath += '.js'
    this.config = config
    this.fid = getFid(absPath)
    this.absPath = absPath
    Object.assign(this, getPathAndFilename(absPath))  // { path, filename }
    this.src = read(this.absPath)
    this.parse(new Lexer(this.src))
  }

  parse(lexer) {
    let target = [], backtickCount = 0, inBacktickHack = []
    while (!lexer.eof) {
      backtickCount += (lexer.line.rest.match(/`/g) || []).length
      backtickCount %= 2
      inBacktickHack.push(backtickCount)

      // The import statement
      if (lexer.is('import')) {
        let ident, brace, path
        lexer.token('import')
        lexer.skipWhite()

        // import a from './a'         => const a = require('./a')
        // import modA from 'modA'     => const modA = require('modA')
        // import { b, c } from './a'  => const { b, c } = require('./a')
        if (lexer.is('ident') || lexer.is('{')) {
          if (lexer.is('ident')) {
            lexer.token('ident', lexeme => { ident = lexeme })
          } else {
            lexer.token('brace', lexeme => { brace = lexeme })
          }
          lexer.skipWhite()
          lexer.token('from')
          lexer.skipWhite()
          lexer.token('\'')
          lexer.without('\'', lexeme => {
            path = getAbsPath(this.path, lexeme, this.config)
            if (!/\.js/.test(path)) path += '.js'
          })
          lexer.token('\'')
          addFile(path, this.config)
          target.push(
            `const ${ident || brace} = require('${absPathToFid[path]}')`
          )
        } else {
          lexer.error('Not implemented in import')
        }

      // The export statement
      } else if (lexer.is('export')) {
        lexer.token('export')
        lexer.skipWhite()

        // export default class a {}   => const a = module.exports = class a {}
        // export default function a   => const a = module.exports = function a
        // export default a            => module.exports = a
        // export default a =          => const a = module.exports.a =
        if (lexer.is('default')) {
          lexer.token('default')
          lexer.skipWhite()
          if (lexer.is('funcls')) {
            let keyword, ident
            lexer.token('funcls', lexeme => { keyword = lexeme })
            lexer.skipWhite()
            lexer.token('ident', lexeme => { ident = lexeme })
            lexer.token('ALL', lexeme => {
              target.push(`const ${ident} = module.exports = ${keyword} ${ident}${lexeme}`)
            })
          } else if (lexer.is('ident')) {
            let ident
            lexer.token('ident', lexeme => { ident = lexeme })
            lexer.skipWhite()
            if (lexer.is('=')) {
              lexer.optional('ALL', lexeme => {
                target.push(`const ${ident} = module.exports${lexeme}`)
              })
            } else {
              lexer.token('ALL', lexeme => {
                target.push(`module.exports = ${ident} ${lexeme}`)
              })
            }
          } else {
            lexer.token('ALL', lexeme => {
              target.push(`module.exports = ${lexeme}`)
            })
          }

        // export const a =            => module.exports.a =
        } else if (lexer.is('const')) {
          let ident
          lexer.token('const')
          lexer.skipWhite()
          lexer.token('ident', lexeme => { ident = lexeme })
          lexer.token('ALL', lexeme => {
            target.push(`const ${ident} = module.exports.${ident}${lexeme}`)
          })
        } else if (lexer.is('function')) {
          let ident
          lexer.token('function')
          lexer.skipWhite()
          lexer.token('ident', lexeme => { ident = lexeme })
          lexer.token('ALL', lexeme => {
            target.push(`const ${ident} = module.exports.${ident} = function ${ident}${lexeme}`)
          })
        } else {
          lexer.error('Not implemented in export')
        }

      // Any other lines
      } else {
        lexer.optional('ALL', lexeme => { target.push(lexeme) })
      }

      // lexer.skipWhite()
      if (!lexer.eof) lexer.nextLine()
    }

    // Sourcemark
    if (this.config.sourcemark) {
      const rulers = [50, 60, 70, 80, 90, 100]
      const getRuler = len => {
        for (let i = 0; i < rulers.length; i++) {
          if (len < rulers[i]) return rulers[i]
        }
        return len
      }
      const pad = num => new Array(num + 1).join(' ')
      target = target.map((line, i) => {
        const { length } = line
        const ruler = getRuler(length + 2)
        return inBacktickHack[i] ? line :
                  `${line}${pad(ruler - length)}// ${this.filename}: ${i + 1}`
      })
    }

    target.unshift(`    ${this.fid}(module) {`)
    target.unshift('////////////////////////////////////////////////')
    target.push(`    },  ///</${this.fid}>`)
    this.target = target.join('\n')
  }
}

const runBuild = (config, toSave = true) => {
  const entryFullPath = config.entry
  const outputFullPath = config.output

  console.log('===============================================================')
  console.log('[' + new Date().toGMTString() + ']')
  console.log('Build:', entryFullPath)
  console.log('---------------------------------------------------------------')

  resetBuild()
  addFile(entryFullPath, config)

  let result = [frontmatter, '///<content>']
  Object.keys(files).forEach(fid => result.push(files[fid].target))
  result.push('///</content>', backmatter)

  if (config.minify) result = minify(result.join('\n'))
  const targetStr = result.join('\n')
  if (toSave) fs.writeFileSync(outputFullPath, targetStr)

  // console.log(absPathToFid)
  console.log('---------------------------------------------------------------')
  console.log('Emit:', outputFullPath, `(${getSizeStr(targetStr)})`)
  console.log('===============================================================')

  if (!toSave) return targetStr
}

module.exports = runBuild
