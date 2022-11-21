import makeLexerClass from 'makeLexerClass'

const sign = '[\\+\\-]'
const integer = `${sign}?([1-9]\\d*|0)`
const decimal = `${integer}(\\.\\d+)?`
const fraction = `[eE]${integer}`
const real = `${decimal}(${fraction})?`
const ident = '[a-zA-Z_][a-zA-Z\\d_]*'
const unit = '[a-zA-Z][a-zA-Z_\\^\\{\\}\\-\\d\\/\\s]*'

const Lexer = makeLexerClass({
  '=': '=',
  '+': '\\+',
  '-': '\\-',
  '*': '\\*',
  '/': '\\/',
  '!': '!',
  '(': '\\(',
  ')': '\\)',
  '[': '\\[',
  ']': '\\]',
  ',': '\\,',
  '.': '\\.',
  ':': ':',
  '\'': '\'',
  'esc-sq': '\\\\\'',  // \'
  '"': '"',
  'esc-dq': '\\\\"',  // \"
  $: '\\$',
  'esc-latex': '\\\\\\$',  // \$
  '```': '```',
  sign,
  addop: sign,
  mulop: '[\\*\\/]',
  powop: '\\^',
  ident,
  integer,
  digits: '\\d+',
  real,
  unit,
  scaler: real,  // tmp
  i: 'i',
  d: 'd',
  r: 'r',
  c: 'c',
  lang: '[a-zA-Z][a-zA-Z_\\-\\,\\.\\d]*',

  // Filters
  paren: '\\(',
  assignment: `${ident}\\s*\\=`,
  function: `${ident}\\s*\\(`,
  types: [
    '(', `[irdc]?${sign}?\\d`, '|', '[\'"\\[\\$]', '|', '```', ')'
  ].join(''),
  'unit-value': `${real}\\s*${unit}`,
  text: '[\'"]',
  latex: '\\$',
  blockquote: '```',
  vector: '\\[',
  matrix: '\\[',  // not defined yet

  // Comment
  '//': '\\/\\/',
  '/*': '\\/\\*',
  '*/': '\\*\\/',
  all: '.*',
  'sl-comment': '\\/\\/',
  'ml-comment': '\\/\\*',
  comment: '\\/[\\/\\*]'
})


Lexer.prototype.skipWhite = function () {
  while ((this.is('S') || this.is('comment') || this.eol) && !this.eof) {
    if (this.eol) {
      this.nextLine()
    } else if (this.is('S')) {
      this.token('SS')
    } else if (this.is('sl-comment')) {
      this.token('//')
      this.token('all')
    } else {
      this.token('/*')
      this.mlwithout('*/')
      this.token('*/')
    }
  }
}

export default Lexer

//
