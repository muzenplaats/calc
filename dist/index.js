/* By Quick-and-dirty ES6 module bundler */
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

///<content>
////////////////////////////////////////////////
    fid103(module) {
const repeat = (rep, num) => new Array(num + 1).join(rep)   // makeLexerClass.js: 1
                                                  // makeLexerClass.js: 2
class Lines {                                     // makeLexerClass.js: 3
  constructor(str) {                              // makeLexerClass.js: 4
    this.data = str.split('\n')                   // makeLexerClass.js: 5
    this.ln = -1                                  // makeLexerClass.js: 6
    this.nextLine()                               // makeLexerClass.js: 7
  }                                               // makeLexerClass.js: 8
                                                  // makeLexerClass.js: 9
  get eof() { return this.ln === this.data.length - 1 && this.line.eol }        // makeLexerClass.js: 10
                                                  // makeLexerClass.js: 11
  nextLine() {                                    // makeLexerClass.js: 12
    this.ln++                                     // makeLexerClass.js: 13
    this.line = new Line(this.data[this.ln])      // makeLexerClass.js: 14
  }                                               // makeLexerClass.js: 15
}                                                 // makeLexerClass.js: 16
                                                  // makeLexerClass.js: 17
class Line {                                      // makeLexerClass.js: 18
  constructor(str) {                              // makeLexerClass.js: 19
    this.str = str                                // makeLexerClass.js: 20
    this.rest = str                               // makeLexerClass.js: 21
    this.col = 0                                  // makeLexerClass.js: 22
  }                                               // makeLexerClass.js: 23
                                                  // makeLexerClass.js: 24
  get eol() { return this.rest.length === 0 }     // makeLexerClass.js: 25
                                                  // makeLexerClass.js: 26
  advance(num) {                                  // makeLexerClass.js: 27
    this.col += num                               // makeLexerClass.js: 28
    this.rest = this.rest.substr(num)             // makeLexerClass.js: 29
  }                                               // makeLexerClass.js: 30
                                                  // makeLexerClass.js: 31
  cutoff(length) {                                // makeLexerClass.js: 32
    this.cutoffRest = this.rest.substr(length)    // makeLexerClass.js: 33
    this.rest = this.rest.substr(0, length)       // makeLexerClass.js: 34
    this.isCutoff = true                          // makeLexerClass.js: 35
  }                                               // makeLexerClass.js: 36
  joinCutoff() {                                  // makeLexerClass.js: 37
    this.rest += this.cutoffRest                  // makeLexerClass.js: 38
    this.isCutoff = false                         // makeLexerClass.js: 39
  }                                               // makeLexerClass.js: 40
}                                                 // makeLexerClass.js: 41
                                                  // makeLexerClass.js: 42
const defaultPatterns = {                         // makeLexerClass.js: 43
  S: ' ',                                         // makeLexerClass.js: 44
  SS: ' +',                                       // makeLexerClass.js: 45
  ALL: '.+'                                       // makeLexerClass.js: 46
}                                                 // makeLexerClass.js: 47
                                                  // makeLexerClass.js: 48
const treatKeywords = patterns => {               // makeLexerClass.js: 49
  const { keywords } = patterns                   // makeLexerClass.js: 50
  if (!keywords) return patterns                  // makeLexerClass.js: 51
  patterns.keywords = `(${keywords})\\b`          // makeLexerClass.js: 52
  keywords.split('|').forEach(keyword => {        // makeLexerClass.js: 53
    patterns[keyword] = keyword + '\\b'           // makeLexerClass.js: 54
  })                                              // makeLexerClass.js: 55
  return patterns                                 // makeLexerClass.js: 56
}                                                 // makeLexerClass.js: 57
                                                  // makeLexerClass.js: 58
const getPatterns = patterns => {                 // makeLexerClass.js: 59
  patterns = { ...defaultPatterns, ...treatKeywords(patterns) }       // makeLexerClass.js: 60
  const result = [{}, {}, {}]                     // makeLexerClass.js: 61
  for (let key in patterns) {                     // makeLexerClass.js: 62
    result[0][key] = new RegExp('^' + patterns[key])        // makeLexerClass.js: 63
    result[1][key] = new RegExp(patterns[key])    // makeLexerClass.js: 64
    result[2][key] = new RegExp(patterns[key], 'g')         // makeLexerClass.js: 65
  }                                               // makeLexerClass.js: 66
  return result                                   // makeLexerClass.js: 67
}                                                 // makeLexerClass.js: 68
                                                  // makeLexerClass.js: 69
module.exports = function makeLexerClass(patterns) {        // makeLexerClass.js: 70
  const ptrns = getPatterns(patterns)             // makeLexerClass.js: 71
  return class Lexer {                            // makeLexerClass.js: 72
    constructor(src) {                            // makeLexerClass.js: 73
      this.name = 'lexer'                         // makeLexerClass.js: 74
      this.src = src.replace(/\r\n/g, '\n')       // makeLexerClass.js: 75
      this.lines = new Lines(this.src)            // makeLexerClass.js: 76
      this.patterns = ptrns[0]                    // makeLexerClass.js: 77
      this.aheadPatterns = ptrns[1]               // makeLexerClass.js: 78
      this.globalPatterns = ptrns[2]              // makeLexerClass.js: 79
    }                                             // makeLexerClass.js: 80
                                                  // makeLexerClass.js: 81
    get line() { return this.lines.line }         // makeLexerClass.js: 82
    get ln() { return this.lines.ln }             // makeLexerClass.js: 83
    get col() { return this.line.col }            // makeLexerClass.js: 84
    get eol() { return this.line.eol }            // makeLexerClass.js: 85
    get eof() { return this.lines.eof }           // makeLexerClass.js: 86
                                                  // makeLexerClass.js: 87
    nextLine() { this.lines.nextLine() }          // makeLexerClass.js: 88
                                                  // makeLexerClass.js: 89
    getPattern(token) {                           // makeLexerClass.js: 90
      if (token in this.patterns) return this.patterns[token]         // makeLexerClass.js: 91
      this.error(`Undefined token [${token}]`)    // makeLexerClass.js: 92
    }                                             // makeLexerClass.js: 93
                                                  // makeLexerClass.js: 94
    getAheadPattern(token) {                      // makeLexerClass.js: 95
      if (token in this.aheadPatterns) return this.aheadPatterns[token]         // makeLexerClass.js: 96
      this.error(`Undefined token [${token}]`)    // makeLexerClass.js: 97
    }                                             // makeLexerClass.js: 98
                                                  // makeLexerClass.js: 99
    getGlobalPattern(token) {                     // makeLexerClass.js: 100
      if (token in this.globalPatterns) return this.globalPatterns[token]       // makeLexerClass.js: 101
      this.error(`Undefined token [${token}]`)    // makeLexerClass.js: 102
    }                                             // makeLexerClass.js: 103
                                                  // makeLexerClass.js: 104
    eat(token) {                                  // makeLexerClass.js: 105
      const matched = this.line.rest.match(this.getPattern(token))    // makeLexerClass.js: 106
      if (!matched) this.error(`token [${token}]`)          // makeLexerClass.js: 107
      this.lexeme = matched[0]                    // makeLexerClass.js: 108
      if (this.line.isCutoff) this.line.joinCutoff()        // makeLexerClass.js: 109
      this.line.advance(this.lexeme.length)       // makeLexerClass.js: 110
    }                                             // makeLexerClass.js: 111
                                                  // makeLexerClass.js: 112
    // Look ahead boundary tmp-cutoff.            // makeLexerClass.js: 113
    prevent(token) {                              // makeLexerClass.js: 114
      const matched = this.line.rest.match(this.getAheadPattern(token))         // makeLexerClass.js: 115
      if (matched) this.line.cutoff(matched.index)          // makeLexerClass.js: 116
      return this                                 // makeLexerClass.js: 117
    }                                             // makeLexerClass.js: 118
                                                  // makeLexerClass.js: 119
    escprevent(token, escToken) {                 // makeLexerClass.js: 120
      const matched = this.line.rest.matchAll(this.getGlobalPattern(token))     // makeLexerClass.js: 121
      if (!matched) return this                   // makeLexerClass.js: 122
      const escMatched = this.line.rest.matchAll(this.getGlobalPattern(escToken))         // makeLexerClass.js: 123
      const escRanges = []                        // makeLexerClass.js: 124
      let index                                   // makeLexerClass.js: 125
                                                  // makeLexerClass.js: 126
      const withinEsc = idx => {                  // makeLexerClass.js: 127
        for (let i = 0; i < escRanges.length; i++) {        // makeLexerClass.js: 128
          const range = escRanges[i]              // makeLexerClass.js: 129
          if (idx >= range[0] && idx < range[1]) return true          // makeLexerClass.js: 130
        }                                         // makeLexerClass.js: 131
      }                                           // makeLexerClass.js: 132
                                                  // makeLexerClass.js: 133
      for (const match of escMatched) {           // makeLexerClass.js: 134
        escRanges.push([match.index, match.index + match[0].length])            // makeLexerClass.js: 135
      }                                           // makeLexerClass.js: 136
      for (const match of matched) {              // makeLexerClass.js: 137
        if (!withinEsc(match.index)) { index = match.index; break }   // makeLexerClass.js: 138
      }                                           // makeLexerClass.js: 139
      if (index >= 0) this.line.cutoff(index)     // makeLexerClass.js: 140
      return this                                 // makeLexerClass.js: 141
    }                                             // makeLexerClass.js: 142
                                                  // makeLexerClass.js: 143
    is(token) {                                   // makeLexerClass.js: 144
      return this.getPattern(token).test(this.line.rest)    // makeLexerClass.js: 145
    }                                             // makeLexerClass.js: 146
                                                  // makeLexerClass.js: 147
    token(tkn, act) {                             // makeLexerClass.js: 148
      this.eat(tkn)                               // makeLexerClass.js: 149
      if (act) act(this.lexeme)                   // makeLexerClass.js: 150
    }                                             // makeLexerClass.js: 151
                                                  // makeLexerClass.js: 152
    optional(token, act) {                        // makeLexerClass.js: 153
      this.lexeme = ''                            // makeLexerClass.js: 154
      if (this.is(token)) {                       // makeLexerClass.js: 155
        this.eat(token)                           // makeLexerClass.js: 156
      } else {                                    // makeLexerClass.js: 157
        if (this.line.isCutoff) this.line.joinCutoff()      // makeLexerClass.js: 158
      }                                           // makeLexerClass.js: 159
      if (act) act(this.lexeme)                   // makeLexerClass.js: 160
    }                                             // makeLexerClass.js: 161
                                                  // makeLexerClass.js: 162
    without(token, act) {                         // makeLexerClass.js: 163
      this.prevent(token).optional('ALL', lexeme => act(lexeme))      // makeLexerClass.js: 164
    }                                             // makeLexerClass.js: 165
                                                  // makeLexerClass.js: 166
    escwithout(token, escToken, act) {            // makeLexerClass.js: 167
      this.escprevent(token, escToken)            // makeLexerClass.js: 168
          .optional('ALL', lexeme => act(lexeme))           // makeLexerClass.js: 169
    }                                             // makeLexerClass.js: 170
                                                  // makeLexerClass.js: 171
    // without(token, act) {                      // makeLexerClass.js: 172
    //   const matched = this.line.rest.match(this.getAheadPattern(token))      // makeLexerClass.js: 173
    //   this.lexeme = matched ? this.line.rest.substr(0, matched.index) :      // makeLexerClass.js: 174
    //                           this.line.rest   // makeLexerClass.js: 175
    //   this.line.advance(this.lexeme.length)    // makeLexerClass.js: 176
    //   if (act) act(this.lexeme)                // makeLexerClass.js: 177
    // }                                          // makeLexerClass.js: 178
                                                  // makeLexerClass.js: 179
    mlwithout(token, act) {                       // makeLexerClass.js: 180
      const pattern = this.getAheadPattern(token)           // makeLexerClass.js: 181
      const strs = []                             // makeLexerClass.js: 182
      let matched = this.line.rest.match(pattern)           // makeLexerClass.js: 183
                                                  // makeLexerClass.js: 184
      while (!matched) {                          // makeLexerClass.js: 185
        strs.push(this.line.rest)                 // makeLexerClass.js: 186
        this.line.advance(this.line.rest.length)            // makeLexerClass.js: 187
        if (this.eof) break                       // makeLexerClass.js: 188
        this.nextLine()                           // makeLexerClass.js: 189
        matched = this.line.rest.match(pattern)   // makeLexerClass.js: 190
      }                                           // makeLexerClass.js: 191
      if (matched) {                              // makeLexerClass.js: 192
        let without = this.line.rest.substr(0, matched.index)         // makeLexerClass.js: 193
        strs.push(without)                        // makeLexerClass.js: 194
        this.line.advance(without.length)         // makeLexerClass.js: 195
      }                                           // makeLexerClass.js: 196
      this.lexeme = strs.join('\n')               // makeLexerClass.js: 197
      if (act) act(this.lexeme)                   // makeLexerClass.js: 198
    }                                             // makeLexerClass.js: 199
                                                  // makeLexerClass.js: 200
    error(message) {                              // makeLexerClass.js: 201
      throw new Error(`${message} at line ${this.ln + 1} column ${this.col + 1}.
${this.line.str}
${repeat(' ', this.line.col)}^`)                  // makeLexerClass.js: 204
    }                                             // makeLexerClass.js: 205
                                                  // makeLexerClass.js: 206
    skipSS() { this.optional('SS') }              // makeLexerClass.js: 207
                                                  // makeLexerClass.js: 208
    skipWhite() {                                 // makeLexerClass.js: 209
      while ((this.is('S') || this.eol) && !this.eof) {     // makeLexerClass.js: 210
        if (this.eol) {                           // makeLexerClass.js: 211
          this.nextLine()                         // makeLexerClass.js: 212
        } else {                                  // makeLexerClass.js: 213
          this.token('SS')                        // makeLexerClass.js: 214
        }                                         // makeLexerClass.js: 215
      }                                           // makeLexerClass.js: 216
    }                                             // makeLexerClass.js: 217
  }                                               // makeLexerClass.js: 218
}                                                 // makeLexerClass.js: 219
    },  ///</fid103>
////////////////////////////////////////////////
    fid102(module) {
const makeLexerClass = require('fid103')          // Lexer.js: 1
                                                  // Lexer.js: 2
const sign = '[\\+\\-]'                           // Lexer.js: 3
const integer = `${sign}?([1-9]\\d*|0)`           // Lexer.js: 4
const decimal = `${integer}(\\.\\d+)?`            // Lexer.js: 5
const fraction = `[eE]${integer}`                 // Lexer.js: 6
const real = `${decimal}(${fraction})?`           // Lexer.js: 7
const ident = '[a-zA-Z_][a-zA-Z\\d_]*'            // Lexer.js: 8
const unit = '[a-zA-Z][a-zA-Z_\\^\\{\\}\\-\\d\\/\\s]*'      // Lexer.js: 9
                                                  // Lexer.js: 10
const Lexer = makeLexerClass({                    // Lexer.js: 11
  '=': '=',                                       // Lexer.js: 12
  '+': '\\+',                                     // Lexer.js: 13
  '-': '\\-',                                     // Lexer.js: 14
  '*': '\\*',                                     // Lexer.js: 15
  '/': '\\/',                                     // Lexer.js: 16
  '!': '!',                                       // Lexer.js: 17
  '(': '\\(',                                     // Lexer.js: 18
  ')': '\\)',                                     // Lexer.js: 19
  '[': '\\[',                                     // Lexer.js: 20
  ']': '\\]',                                     // Lexer.js: 21
  ',': '\\,',                                     // Lexer.js: 22
  '.': '\\.',                                     // Lexer.js: 23
  ':': ':',                                       // Lexer.js: 24
  '\'': '\'',                                     // Lexer.js: 25
  'esc-sq': '\\\\\'',  // \'                      // Lexer.js: 26
  '"': '"',                                       // Lexer.js: 27
  'esc-dq': '\\\\"',  // \"                       // Lexer.js: 28
  $: '\\$',                                       // Lexer.js: 29
  'esc-latex': '\\\\\\$',  // \$                  // Lexer.js: 30
  '```': '```',                                   // Lexer.js: 31
  sign,                                           // Lexer.js: 32
  addop: sign,                                    // Lexer.js: 33
  mulop: '[\\*\\/]',                              // Lexer.js: 34
  powop: '\\^',                                   // Lexer.js: 35
  ident,                                          // Lexer.js: 36
  integer,                                        // Lexer.js: 37
  digits: '\\d+',                                 // Lexer.js: 38
  real,                                           // Lexer.js: 39
  unit,                                           // Lexer.js: 40
  scaler: real,  // tmp                           // Lexer.js: 41
  i: 'i',                                         // Lexer.js: 42
  d: 'd',                                         // Lexer.js: 43
  r: 'r',                                         // Lexer.js: 44
  c: 'c',                                         // Lexer.js: 45
  lang: '[a-zA-Z][a-zA-Z_\\-\\,\\.\\d]*',         // Lexer.js: 46
                                                  // Lexer.js: 47
  // Filters                                      // Lexer.js: 48
  paren: '\\(',                                   // Lexer.js: 49
  assignment: `${ident}\\s*\\=`,                  // Lexer.js: 50
  function: `${ident}\\s*\\(`,                    // Lexer.js: 51
  types: [                                        // Lexer.js: 52
    '(', `[irdc]?${sign}?\\d`, '|', '[\'"\\[\\$]', '|', '```', ')'
  ].join(''),
  'unit-value': `${real}\\s*${unit}`,
  text: '[\'"]',
  latex: '\\$',
  blockquote: '```',                              // Lexer.js: 58
  vector: '\\[',                                  // Lexer.js: 59
  matrix: '\\[',  // not defined yet              // Lexer.js: 60
                                                  // Lexer.js: 61
  // Comment                                      // Lexer.js: 62
  '//': '\\/\\/',                                 // Lexer.js: 63
  '/*': '\\/\\*',                                 // Lexer.js: 64
  '*/': '\\*\\/',                                 // Lexer.js: 65
  all: '.*',                                      // Lexer.js: 66
  'sl-comment': '\\/\\/',                         // Lexer.js: 67
  'ml-comment': '\\/\\*',                         // Lexer.js: 68
  comment: '\\/[\\/\\*]'                          // Lexer.js: 69
})                                                // Lexer.js: 70
                                                  // Lexer.js: 71
                                                  // Lexer.js: 72
Lexer.prototype.skipWhite = function () {         // Lexer.js: 73
  while ((this.is('S') || this.is('comment') || this.eol) && !this.eof) {       // Lexer.js: 74
    if (this.eol) {                               // Lexer.js: 75
      this.nextLine()                             // Lexer.js: 76
    } else if (this.is('S')) {                    // Lexer.js: 77
      this.token('SS')                            // Lexer.js: 78
    } else if (this.is('sl-comment')) {           // Lexer.js: 79
      this.token('//')                            // Lexer.js: 80
      this.token('all')                           // Lexer.js: 81
    } else {                                      // Lexer.js: 82
      this.token('/*')                            // Lexer.js: 83
      this.mlwithout('*/')                        // Lexer.js: 84
      this.token('*/')                            // Lexer.js: 85
    }                                             // Lexer.js: 86
  }                                               // Lexer.js: 87
}                                                 // Lexer.js: 88
                                                  // Lexer.js: 89
module.exports = Lexer //                         // Lexer.js: 90
    },  ///</fid102>
////////////////////////////////////////////////
    fid105(module) {
                                                  // Scalar.js: 1
/* sketch                                         // Scalar.js: 2
                                                  // Scalar.js: 3
// All scalar number types are implement in the JavaScript standard number (IEEE).        // Scalar.js: 4
// The overflow or other errors is not covered in brief.    // Scalar.js: 5
complex = { re: 123.456, im: 0 }                  // Scalar.js: 6
real  = { value: 123.456e7 }                      // Scalar.js: 7
decimal  = { a: 123456, b: 3, get value() => 123.456 })  // 123.456   // Scalar.js: 8
rational  = { num: 123456, denom: 1000, get value() => 123.456 }      // Scalar.js: 9
integer = { value: undefined }                    // Scalar.js: 10
unitValue = { value: 123.456, unit: null }        // Scalar.js: 11
                                                  // Scalar.js: 12
*/                                                // Scalar.js: 13
                                                  // Scalar.js: 14
/* Test                                           // Scalar.js: 15
  ```
  From type to type                                // Other way around
  -----------------------------------------------------------------------------
  text not supported                           .   // toString() (all to text)
  complex to real, decimal or unitValue when re0   // all* to complex
          isRational? isInteger? Or undefined
  real to complex, decimal+ or unitValue           // all* to real
          isRational? isInteger? Or undefined      // except C { re:!0 } to real
  decimal to, (similar as real)
  rational to, (similar as above)
  integer to, (similar as above)
  unitValue to, same as real when {unit: null}
  -----------------------------------------------------------------------------
  *All except when the unit is not null; undefined. when { unit: null }
  +Valid in this implementation by the JavaScript number (IEEE floating point).
  ```                                             // Scalar.js: 31
                                                  // Scalar.js: 32
Psuedo code                                       // Scalar.js: 33
                                                  // Scalar.js: 34
Data cleansing                                    // Scalar.js: 35
Scalar.isUndefined() {                            // Scalar.js: 36
  assert:                                         // Scalar.js: 37
  Complex { re: NaN or ANY, im: ANY or NaN }      // Scalar.js: 38
  Real { value: NaN }                             // Scalar.js: 39
  Decimal { a: NaN, n: ANY }                      // Scalar.js: 40
  Rational { num: NaN, denom: ANY }               // Scalar.js: 41
  Integer { value NaN }                           // Scalar.js: 42
  UnitValue { value: NaN, unit: ANY }             // Scalar.js: 43
}                                                 // Scalar.js: 44
                                                  // Scalar.js: 45
                                                  // Scalar.js: 46
Scalar.add, sub, mul, div, neg()                  // Scalar.js: 47
*/                                                // Scalar.js: 48
                                                  // Scalar.js: 49
                                                  // Scalar.js: 50
const HIERARCHY = {                               // Scalar.js: 51
  integer: 1, rational: 2, decimal: 3, real: 4, complex: 5, 'unit-value': 6     // Scalar.js: 52
}  // or move to each class                       // Scalar.js: 53
   // 1 integer is also 2 rational 3 decimal 4 real 5 complex  // or 6 unit-value         // Scalar.js: 54
   // 2 rational is also 4 real 5 complex; sometimes 1 integer 3 decimal        // Scalar.js: 55
   // 3 decimal is also 2 rational 4 real or 5 complex      // Scalar.js: 56
   // 4 real is also 5 complex; sometimes 1 2 3   // Scalar.js: 57
   // 5 complex is sometimes 1 2 3 4              // Scalar.js: 58
   // 1 -> 2, 3, 4, 5                             // Scalar.js: 59
   // 2 -> 4, 5                                   // Scalar.js: 60
   // 3 -> 2 (valid by impl. spec.), 4, 5         // Scalar.js: 61
   // 4 -> 5                                      // Scalar.js: 62
                                                  // Scalar.js: 63
// The limitation here is by the IEEE floating point spec.            // Scalar.js: 64
// (This is not difficult to extend it (more complicated) for you.)   // Scalar.js: 65
// The values are not intended to be validated in this calc.          // Scalar.js: 66
// For example, it is possible to approximate 0.3333333 to r1/3 but this is not           // Scalar.js: 67
// interested here.                    _          // Scalar.js: 68
// But the repeating decimal, e.g., d0.3 -> r1/3 is possibly interested         // Scalar.js: 69
// because the bar means that it is a rational number for inf rep. of fraction.           // Scalar.js: 70
                                                  // Scalar.js: 71
                                                  // Scalar.js: 72
                                                  // Scalar.js: 73
// Scalar (abstract class of the scalar numbers)            // Scalar.js: 74
const Scalar = module.exports = class Scalar {    // Scalar.js: 75
  constructor() {                                 // Scalar.js: 76
    this.name = 'scalar'                          // Scalar.js: 77
  }                                               // Scalar.js: 78
                                                  // Scalar.js: 79
  get h() { return HIERARCHY[this.name] }         // Scalar.js: 80
  get hierarchy() { return this.h }               // Scalar.js: 81
                                                  // Scalar.js: 82
  is(typeName) { return typeName  === this.name }           // Scalar.js: 83
  to(typeName) { throw new Error('Undefined yet.')}         // Scalar.js: 84
                                                  // Scalar.js: 85
  // Interface                                    // Scalar.js: 86
  add(b) { throw new Error('Not implemented')}    // Scalar.js: 87
  sub(b) { throw new Error('Not implemented')}    // Scalar.js: 88
  mul(b) { throw new Error('Not implemented')}    // Scalar.js: 89
  div(b) { throw new Error('Not implemented')}    // Scalar.js: 90
  neg() { throw new Error('Not implemented')}     // Scalar.js: 91
                                                  // Scalar.js: 92
                                                  // Scalar.js: 93
  static tmpAdd(a, b) {                           // Scalar.js: 94
    if (a.h === b.h) return a.add(b)              // Scalar.js: 95
                                                  // Scalar.js: 96
    // Temp. (for integers only)                  // Scalar.js: 97
    // Coerce the integer to the type as aother.            // Scalar.js: 98
    // .'. a or b -> same type                    // Scalar.js: 99
    const highH = Math.max(a.h, b.h)              // Scalar.js: 100
    if (a.h < highH) {                            // Scalar.js: 101
      a = a.to(b.name)                            // Scalar.js: 102
    } else {                                      // Scalar.js: 103
      b = b.to(a.name)                            // Scalar.js: 104
    }                                             // Scalar.js: 105
                                                  // Scalar.js: 106
    return a.add(b)                               // Scalar.js: 107
  }                                               // Scalar.js: 108
                                                  // Scalar.js: 109
  static sub(a, b) {                              // Scalar.js: 110
                                                  // Scalar.js: 111
  }                                               // Scalar.js: 112
                                                  // Scalar.js: 113
  static mul(a, b) {                              // Scalar.js: 114
                                                  // Scalar.js: 115
  }                                               // Scalar.js: 116
                                                  // Scalar.js: 117
  static div(a, b) {                              // Scalar.js: 118
                                                  // Scalar.js: 119
  }                                               // Scalar.js: 120
                                                  // Scalar.js: 121
  static neg(a) {                                 // Scalar.js: 122
    return a.neg()                                // Scalar.js: 123
  }                                               // Scalar.js: 124
}                                                 // Scalar.js: 125
    },  ///</fid105>
////////////////////////////////////////////////
    fid107(module) {
/* Helpers */                                     // helpers.js: 1
                                                  // helpers.js: 2
// Convert operators to functions                 // helpers.js: 3
const add = (a, b) => a + b                       // helpers.js: 4
const sub = (a, b) => a - b                       // helpers.js: 5
const mul = (a, b) => a * b                       // helpers.js: 6
const div = (a, b) => a / b                       // helpers.js: 7
                                                  // helpers.js: 8
const lcm = module.exports.lcm = (a, b) => {}     // helpers.js: 9
const hcf = module.exports.hcf = (a, b) => {}     // helpers.js: 10
                                                  // helpers.js: 11
                                                  // helpers.js: 12
// Summation                                      // helpers.js: 13
const sum = module.exports.sum = function sum() {           // helpers.js: 14
  const nums = Array.from(arguments)              // helpers.js: 15
  return nums.reduce(add, 0)                      // helpers.js: 16
}                                                 // helpers.js: 17
                                                  // helpers.js: 18
const average = module.exports.average = function average() {         // helpers.js: 19
  const nums = Array.from(arguments)              // helpers.js: 20
  return nums.reduce(add, 0) / nums.length        // helpers.js: 21
}                                                 // helpers.js: 22
                                                  // helpers.js: 23
// Polyfill                                       // helpers.js: 24
if (![].sum) Array.prototype.sum = function () { return this.reduce(add, 0) }   // helpers.js: 25
                                                  // helpers.js: 26
// (Simplified memoize only for a primitive argrument       // helpers.js: 27
// Ref: https://cdn.statically.io/gh/jashkenas/underscore/1.5.2/docs/underscore.html      // helpers.js: 28
function memoize(func) {                          // helpers.js: 29
  const hash = {}                                 // helpers.js: 30
  return function (key) {                         // helpers.js: 31
    if (!hash.hasOwnProperty(key)) hash[key] = func(key)    // helpers.js: 32
    return hash[key]                              // helpers.js: 33
  }                                               // helpers.js: 34
}                                                 // helpers.js: 35
                                                  // helpers.js: 36
                                                  // helpers.js: 37
// Factorial: num! = 1 * 2 * 3 * ... * num; 0! = 1          // helpers.js: 38
const fact = module.exports.fact = memoize(function (num) {           // helpers.js: 39
  if (num <= 1) return 1  // base case            // helpers.js: 40
  return fact(num - 1) * num  // recursive case   // helpers.js: 41
})                                                // helpers.js: 42
                                                  // helpers.js: 43
// Iterative version of fact(num)                 // helpers.js: 44
const fact2 = module.exports.fact2 = num => {     // helpers.js: 45
  let value = 1                                   // helpers.js: 46
  for (let i = 1; i <= num; i++) value *= i       // helpers.js: 47
  return value                                    // helpers.js: 48
}                                                 // helpers.js: 49
                                                  // helpers.js: 50
// Fibonacci number                               // helpers.js: 51
const fib = module.exports.fib = memoize(function (num) {   // helpers.js: 52
  if (num <= 1) return num  // base case          // helpers.js: 53
  return fib(num - 1) + fib(num - 2)  // recursive case     // helpers.js: 54
})                                                // helpers.js: 55
                                                  // helpers.js: 56
// begin : step : end                             // helpers.js: 57
// begin : end                                    // helpers.js: 58
const range = module.exports.range = (begin, step, end) => {          // helpers.js: 59
  if (typeof end === 'undefined') { end = step; step = 1 }            // helpers.js: 60
  const result = []                               // helpers.js: 61
  if (begin <= end && step > 0) {                 // helpers.js: 62
    for (let num = begin; num <= end; num += step) result.push(num)   // helpers.js: 63
  } else if (begin > end && step < 0) {           // helpers.js: 64
    for (let num = begin; num >= end; num += step) result.push(num)   // helpers.js: 65
  }                                               // helpers.js: 66
  return result                                   // helpers.js: 67
}                                                 // helpers.js: 68
// test                                           // helpers.js: 69
// console.log('range', range(1, 10), range(1, 2, 6), range(5, 5))    // helpers.js: 70
// console.log(range(1, -1, 5))                   // helpers.js: 71
// console.log(range(5, 1), range(5, -1, 1))      // helpers.js: 72
                                                  // helpers.js: 73
// Complex not supported yet.                     // helpers.js: 74
const linspace = module.exports.linspace = (x1, x2, n = 100) => {     // helpers.js: 75
  const result = []                               // helpers.js: 76
  const step = (x2 - x1) / (n - 1)                // helpers.js: 77
  for (let i = 0; i < n; i++) result.push(x1 + i * step)    // helpers.js: 78
  return result                                   // helpers.js: 79
}                                                 // helpers.js: 80
// test                                           // helpers.js: 81
// console.log('linspace', linspace(-5, 5), linspace(-5, 5, 7), (-5, 5, 0))     // helpers.js: 82
                                                  // helpers.js: 83
                                                  // helpers.js: 84
                                                  // helpers.js: 85
/* Test */                                        // helpers.js: 86
                                                  // helpers.js: 87
/*                                                // helpers.js: 88
console.log('sum:', sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))     // helpers.js: 89
console.log('[].sum:', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sum())         // helpers.js: 90
console.log('fact:', fact(0), fact(1), fact(2), fact(3), fact(4), fact(5), fact(6))       // helpers.js: 91
console.log('fib:', fib(0), fib(1), fib(2), fib(3), fib(4), fib(5), fib(6), fib(7))       // helpers.js: 92
*/                                                // helpers.js: 93
                                                  // helpers.js: 94
/* Benchmark test */                              // helpers.js: 95
/*                                                // helpers.js: 96
function beachmark(func, arg) {                   // helpers.js: 97
  const tic = new Date().getTime()                // helpers.js: 98
  console.log('Result:', func(arg))               // helpers.js: 99
  const toc = new Date().getTime()                // helpers.js: 100
  console.log('Elapse time:', toc - tic, 'ms')    // helpers.js: 101
}                                                 // helpers.js: 102
                                                  // helpers.js: 103
// (mac nodejs)                                   // helpers.js: 104
beachmark(fact, 100)  // 5.3 ms   9.33262154439441e+157     // helpers.js: 105
                      //  5.3 ms (memoized)       // helpers.js: 106
beachmark(fact, 101)  //  < 0 ms (memoized)       // helpers.js: 107
beachmark(fact2, 100)  // < 0 ms                  // helpers.js: 108
                                                  // helpers.js: 109
beachmark(fib, 40)  // 1.24 s                     // helpers.js: 110
beachmark(fib, 40)  // ms (memoized)              // helpers.js: 111
beachmark(fib, 5000)  // < 2 ms (memoized)        // helpers.js: 112
*/                                                // helpers.js: 113
                                                  // helpers.js: 114
                                                  // helpers.js: 115
    },  ///</fid107>
////////////////////////////////////////////////
    fid106(module) {
const Lexer = require('fid102')                   // Rational.js: 1
const { lcm, hcf } = require('fid107')            // Rational.js: 2
const Scalar = require('fid105')                  // Rational.js: 3
                                                  // Rational.js: 4
// Rational := 'r' integer                        // Rational.js: 5
// E.g., r1/3 and r-3/2                           // Rational.js: 6
const Rational = module.exports = class Rational extends Scalar {     // Rational.js: 7
  constructor(src) {                              // Rational.js: 8
    super()                                       // Rational.js: 9
    this.name = 'rational'                        // Rational.js: 10
    if (src instanceof Lexer) {                   // Rational.js: 11
      this.parse(src)                             // Rational.js: 12
    } else if (typeof src === 'string') {         // Rational.js: 13
      this.parse(new Lexer(src))                  // Rational.js: 14
    } else {                                      // Rational.js: 15
      this.num = +src.num                         // Rational.js: 16
      this.denom = +src.denom                     // Rational.js: 17
    }                                             // Rational.js: 18
  }                                               // Rational.js: 19
                                                  // Rational.js: 20
  get value() { return this.num / this.denom }    // Rational.js: 21
  set value(val) { /* Todo */ }                   // Rational.js: 22
                                                  // Rational.js: 23
  parse(lexer) {                                  // Rational.js: 24
    lexer.token('r')                              // Rational.js: 25
    lexer.token('integer', lexeme => { this.num = +lexeme })          // Rational.js: 26
    lexer.token('/')                              // Rational.js: 27
    lexer.token('integer', lexeme => { this.denom = +lexeme })        // Rational.js: 28
  }                                               // Rational.js: 29
                                                  // Rational.js: 30
  add(b) { return Rational.add(this, b) }         // Rational.js: 31
  sub(b) { return Rational.sub(this, b) }         // Rational.js: 32
  mul(b) { return Rational.mul(this, b) }         // Rational.js: 33
  div(b) { return Rational.div(this, b) }         // Rational.js: 34
  neg() { return Rational.neg(this) }             // Rational.js: 35
                                                  // Rational.js: 36
  to(type) {                                      // Rational.js: 37
    const { num, denom, value } = this            // Rational.js: 38
    switch (type) {                               // Rational.js: 39
      case 'integer':                             // Rational.js: 40
        if (denom === 1) return new Integer(value)          // Rational.js: 41
        throw new Error(`Converting ${this} to integer is invalid.`)            // Rational.js: 42
      case 'rational':                            // Rational.js: 43
        return new Rational({ num, denom })       // Rational.js: 44
      case 'decimal':                             // Rational.js: 45
// // ?        if (denom % )                      // Rational.js: 46
//         return new Decimal({ a: value, n: 0 })           // Rational.js: 47
//         throw new Error(`Converting ${this} to decimal is invalid.`)         // Rational.js: 48
      case 'real':                                // Rational.js: 49
        return new Real({ value })                // Rational.js: 50
      case 'complex':                             // Rational.js: 51
        return new Complex({ re: value, im: 0 })            // Rational.js: 52
      // case 'unit-value': return new UnitValue({ value, unit: '' })           // Rational.js: 53
      case 'text':                                // Rational.js: 54
        return new Text('' + this)                // Rational.js: 55
      default: throw new TypeError(`Cannot covert rational, ${this}, to type: ${type}.`)            // Rational.js: 56
    }                                             // Rational.js: 57
  }                                               // Rational.js: 58
                                                  // Rational.js: 59
                                                  // Rational.js: 60
  toString() { return 'r' + this.num + '/' + this.denom }   // Rational.js: 61
                                                  // Rational.js: 62
  toJSON() {                                      // Rational.js: 63
    const { name, num, denom } = this             // Rational.js: 64
    return { name, num, denom }                   // Rational.js: 65
  }                                               // Rational.js: 66
                                                  // Rational.js: 67
  // num_a  +  num_b  =  num_a * den_b + num_b * den_a      // Rational.js: 68
  // den_a     den_b         den_a * den_b        // Rational.js: 69
  static add(a, b) {                              // Rational.js: 70
    const { num, denom } = a                      // Rational.js: 71
    const { num: num_b, denom: denom_b } = b      // Rational.js: 72
    return new Rational({                         // Rational.js: 73
      num: num * denom_b + num_b * denom,         // Rational.js: 74
      denom: denom * denom_b                      // Rational.js: 75
    })                                            // Rational.js: 76
  }                                               // Rational.js: 77
                                                  // Rational.js: 78
  static sub(a, b) {                              // Rational.js: 79
    const { num, denom } = a                      // Rational.js: 80
    const { num: num_b, denom: denom_b } = b      // Rational.js: 81
    return new Rational({                         // Rational.js: 82
      num: num * denom_b - num_b * denom,      // <- (-)    // Rational.js: 83
      denom: denom * denom_b                      // Rational.js: 84
    })                                            // Rational.js: 85
  }                                               // Rational.js: 86
                                                  // Rational.js: 87
  // num_a  *  num_b                              // Rational.js: 88
  // den_a     den_b                              // Rational.js: 89
  // (todo: lcm())                                // Rational.js: 90
  static mul(a, b) {                              // Rational.js: 91
    const { num, denom } = a                      // Rational.js: 92
    const { num: num_b, denom: denom_b } = b      // Rational.js: 93
    return new Rational({                         // Rational.js: 94
      num: num * num_b,                           // Rational.js: 95
      denom: denom * denom_b                      // Rational.js: 96
    })                                            // Rational.js: 97
  }                                               // Rational.js: 98
                                                  // Rational.js: 99
  static div(a, b) {                              // Rational.js: 100
    const { num, denom } = a                      // Rational.js: 101
    const { num: num_b, denom: denom_b } = b      // Rational.js: 102
    return new Rational({                         // Rational.js: 103
      num: num * denom_b,                         // Rational.js: 104
      denom: denom * num_b                        // Rational.js: 105
    })                                            // Rational.js: 106
  }                                               // Rational.js: 107
                                                  // Rational.js: 108
  static neg(a) {                                 // Rational.js: 109
    return new Real({ num: -a.num, denom: a.denom })        // Rational.js: 110
  }                                               // Rational.js: 111
}                                                 // Rational.js: 112
                                                  // Rational.js: 113
                                                  // Rational.js: 114
/* Test */                                        // Rational.js: 115
/*                                                // Rational.js: 116
const rat = new Rational('r2/3')                  // Rational.js: 117
console.log(rat, '' + rat)                        // Rational.js: 118
const rat2 = new Rational('r-5/6')                // Rational.js: 119
console.log(rat2, '' + rat2)                      // Rational.js: 120
*/                                                // Rational.js: 121
    },  ///</fid106>
////////////////////////////////////////////////
    fid108(module) {
const Lexer = require('fid102')                   // Decimal.js: 1
const Scalar = require('fid105')                  // Decimal.js: 2
                                                  // Decimal.js: 3
// Consideration                                  // Decimal.js: 4
// Add this.bar                                   // Decimal.js: 5
                                                  // Decimal.js: 6
// Decimal := 'd' integer ('.' digits)?           // Decimal.js: 7
// value = a / 10^n                               // Decimal.js: 8
const Decimal = module.exports = class Decimal extends Scalar {       // Decimal.js: 9
  constructor(src) {                              // Decimal.js: 10
    super()                                       // Decimal.js: 11
    this.name = 'decimal'                         // Decimal.js: 12
    if (src instanceof Lexer) {                   // Decimal.js: 13
      this.parse(src)                             // Decimal.js: 14
    } else if (typeof src === 'string') {         // Decimal.js: 15
      this.parse(new Lexer(src))                  // Decimal.js: 16
    } else {                                      // Decimal.js: 17
      this.a = +src.a                             // Decimal.js: 18
      this.n = +src.n                             // Decimal.js: 19
    }                                             // Decimal.js: 20
  }                                               // Decimal.js: 21
                                                  // Decimal.js: 22
  get num() { return this.a }                     // Decimal.js: 23
  get denom() { return Math.pow(10, this.n) }     // Decimal.js: 24
  get value() { return this.num / this.denom }    // Decimal.js: 25
                                                  // Decimal.js: 26
  parse(lexer) {                                  // Decimal.js: 27
    lexer.token('d')                              // Decimal.js: 28
    lexer.token('integer', lexeme => { this.a = +lexeme })            // Decimal.js: 29
    this.n = 0                                    // Decimal.js: 30
                                                  // Decimal.js: 31
    if (lexer.is('.')) {                          // Decimal.js: 32
      let fracStr                                 // Decimal.js: 33
      lexer.token('.')                            // Decimal.js: 34
      lexer.token('digits', lexeme => { fracStr = lexeme })           // Decimal.js: 35
      this.n = fracStr.length                     // Decimal.js: 36
      this.a = this.a * Math.pow(10, this.n) +    // Decimal.js: 37
               (this.a >= 0 ? +fracStr : -fracStr)          // Decimal.js: 38
    }                                             // Decimal.js: 39
  }                                               // Decimal.js: 40
                                                  // Decimal.js: 41
  add(b) { return Decimal.add(this, b) }          // Decimal.js: 42
  sub(b) { return Decimal.sub(this, b) }          // Decimal.js: 43
  mul(b) { return Decimal.mul(this, b) }          // Decimal.js: 44
  div(b) { return Decimal.div(this, b) }          // Decimal.js: 45
  neg() { return Decimal.neg(this) }              // Decimal.js: 46
                                                  // Decimal.js: 47
  toString() {                                    // Decimal.js: 48
    const str = '' + this.a                       // Decimal.js: 49
    const { length } = str                        // Decimal.js: 50
    const intStr = str.substring(0, length - this.n)        // Decimal.js: 51
    const fracStr = str.substring(length - this.n)          // Decimal.js: 52
    return this.n  === 0 ? 'd' + str : ['d', intStr, '.', fracStr].join('')     // Decimal.js: 53
  }                                               // Decimal.js: 54
                                                  // Decimal.js: 55
  toJSON() {                                      // Decimal.js: 56
    const { name, a, n } = this                   // Decimal.js: 57
    return { name, a, n }                         // Decimal.js: 58
  }                                               // Decimal.js: 59
                                                  // Decimal.js: 60
  static add(a, b) {                              // Decimal.js: 61
    // Todo                                       // Decimal.js: 62
    return Decimal()                              // Decimal.js: 63
  }                                               // Decimal.js: 64
                                                  // Decimal.js: 65
  static sub(a, b) {                              // Decimal.js: 66
    // Todo                                       // Decimal.js: 67
    return Decimal()                              // Decimal.js: 68
  }                                               // Decimal.js: 69
                                                  // Decimal.js: 70
  static mul(a, b) {                              // Decimal.js: 71
    // Todo                                       // Decimal.js: 72
    return Decimal()                              // Decimal.js: 73
  }                                               // Decimal.js: 74
                                                  // Decimal.js: 75
  static div(a, b) {                              // Decimal.js: 76
    // Todo                                       // Decimal.js: 77
    return Decimal()                              // Decimal.js: 78
  }                                               // Decimal.js: 79
                                                  // Decimal.js: 80
  static neg(a) {                                 // Decimal.js: 81
    return new Real({ a: -a.a, n: a.n })          // Decimal.js: 82
  }                                               // Decimal.js: 83
}                                                 // Decimal.js: 84
                                                  // Decimal.js: 85
                                                  // Decimal.js: 86
/* Test */                                        // Decimal.js: 87
/*                                                // Decimal.js: 88
const dec = new Decimal('d123.45678')             // Decimal.js: 89
console.log(dec, '' + dec)                        // Decimal.js: 90
const dec2 = new Decimal('d-123')                 // Decimal.js: 91
console.log(dec2, '' + dec2)                      // Decimal.js: 92
const dec3 = new Decimal('d-123.45678')           // Decimal.js: 93
console.log(dec3, '' + dec3)                      // Decimal.js: 94
const dec4 = new Decimal('d-12.00')               // Decimal.js: 95
console.log(dec4, '' + dec4)                      // Decimal.js: 96
*/                                                // Decimal.js: 97
    },  ///</fid108>
////////////////////////////////////////////////
    fid109(module) {
const Lexer = require('fid102')                   // Real.js: 1
const Scalar = require('fid105')                  // Real.js: 2
                                                  // Real.js: 3
// Real := real                                   // Real.js: 4
const Real = module.exports = class Real extends Scalar {   // Real.js: 5
  constructor(src) {                              // Real.js: 6
    super()                                       // Real.js: 7
    this.name  = 'real'                           // Real.js: 8
    if (src instanceof Lexer)  {                  // Real.js: 9
      this.parse(src)                             // Real.js: 10
    } else if (typeof src === 'string') {         // Real.js: 11
      this.parse(new Lexer(src))                  // Real.js: 12
    } else {                                      // Real.js: 13
      this.value = +src                           // Real.js: 14
    }                                             // Real.js: 15
  }                                               // Real.js: 16
                                                  // Real.js: 17
  parse(lexer) {                                  // Real.js: 18
    lexer.token('real', lexeme => { this.value = +lexeme })           // Real.js: 19
  }                                               // Real.js: 20
                                                  // Real.js: 21
  add(b) { return Real.add(this, b) }             // Real.js: 22
  sub(b) { return Real.sub(this, b) }             // Real.js: 23
  mul(b) { return Real.mul(this, b) }             // Real.js: 24
  div(b) { return Real.div(this, b) }             // Real.js: 25
  pow(b) { return Real.pow(this, b) }             // Real.js: 26
  neg() { return Real.neg(this) }                 // Real.js: 27
                                                  // Real.js: 28
                                                  // Real.js: 29
  toString() { return '' + this.value }           // Real.js: 30
                                                  // Real.js: 31
  toJSON() {                                      // Real.js: 32
    const { name, value } = this                  // Real.js: 33
    return { name, value }                        // Real.js: 34
  }                                               // Real.js: 35
                                                  // Real.js: 36
                                                  // Real.js: 37
  static add(a, b) { return new Real(a.value + b.value) }   // Real.js: 38
  static sub(a, b) { return new Real(a.value - b.value) }   // Real.js: 39
  static mul(a, b) { return new Real(a.value * b.value) }   // Real.js: 40
  static div(a, b) { return new Real(a.value / b.value) }   // Real.js: 41
  static pow(a, b) { return new Real(Math.pow(a.value, b.value)) }    // Real.js: 42
  static neg(a) { return new Real(-a.value) }     // Real.js: 43
}                                                 // Real.js: 44
                                                  // Real.js: 45
                                                  // Real.js: 46
/* Test */                                        // Real.js: 47
/*                                                // Real.js: 48
const re = new Real('-123.456e+2')                // Real.js: 49
console.log(re, '' + re)                          // Real.js: 50
*/                                                // Real.js: 51
    },  ///</fid109>
////////////////////////////////////////////////
    fid110(module) {
const Lexer = require('fid102')                   // Complex.js: 1
const Scalar = require('fid105')                  // Complex.js: 2
                                                  // Complex.js: 3
// Complex := 'c' real real 'i'                   // Complex.js: 4
const Complex = module.exports = class Complex extends Scalar {       // Complex.js: 5
  constructor(src) {                              // Complex.js: 6
    super()                                       // Complex.js: 7
    this.name = 'complex'                         // Complex.js: 8
    if (src instanceof Lexer) {                   // Complex.js: 9
      this.parse(src)                             // Complex.js: 10
    } else if (typeof src === 'string') {         // Complex.js: 11
      this.parse(new Lexer(src))                  // Complex.js: 12
    } else {                                      // Complex.js: 13
      this.re = +src.re                           // Complex.js: 14
      this.im = +src.im                           // Complex.js: 15
    }                                             // Complex.js: 16
  }                                               // Complex.js: 17
                                                  // Complex.js: 18
  parse(lexer) {                                  // Complex.js: 19
    lexer.token('c')                              // Complex.js: 20
    lexer.token('real', lexeme => { this.re = +lexeme })    // Complex.js: 21
    lexer.token('real', lexeme => { this.im = +lexeme })    // Complex.js: 22
    lexer.token('i')                              // Complex.js: 23
  }                                               // Complex.js: 24
                                                  // Complex.js: 25
  add(b) { return Complex.add(this, b) }          // Complex.js: 26
  sub(b) { return Complex.sub(this, b) }          // Complex.js: 27
  mul(b) { return Complex.mul(this, b) }          // Complex.js: 28
  div(b) { return Complex.div(this, b) }          // Complex.js: 29
  neg() { return Complex.neg(this) }              // Complex.js: 30
                                                  // Complex.js: 31
  toString() {                                    // Complex.js: 32
    return ['c', this.re, this.im >= 0 ? '+' : '', this.im, 'i'].join('')       // Complex.js: 33
  }                                               // Complex.js: 34
                                                  // Complex.js: 35
                                                  // Complex.js: 36
  toJSON() {                                      // Complex.js: 37
    const { name, re, im } = this                 // Complex.js: 38
    return { name, re, im }                       // Complex.js: 39
  }                                               // Complex.js: 40
                                                  // Complex.js: 41
  static add(a, b) {                              // Complex.js: 42
    return new Complex({ re: a.re + b.re, im: a.im + b.im })          // Complex.js: 43
  }                                               // Complex.js: 44
                                                  // Complex.js: 45
  static sub(a, b) {                              // Complex.js: 46
    return new Complex({ re: a.re - b.re, im: a.im - b.im })          // Complex.js: 47
  }                                               // Complex.js: 48
                                                  // Complex.js: 49
  static mul(a, b) {                              // Complex.js: 50
    return new Complex({                          // Complex.js: 51
      re: a.re * b.re - a.im * b.im,              // Complex.js: 52
      im: a.re * b.im + a.im * b.re               // Complex.js: 53
    })                                            // Complex.js: 54
  }                                               // Complex.js: 55
                                                  // Complex.js: 56
  static div(a, b) {                              // Complex.js: 57
    // Todo                                       // Complex.js: 58
    // 1 / (re + im i) = (re - im i) / (re^2 im^2)          // Complex.js: 59
    return new Complex()                          // Complex.js: 60
  }                                               // Complex.js: 61
                                                  // Complex.js: 62
  static neg(a) {                                 // Complex.js: 63
    return new Complex({ re: -a.re, im: -a.re })            // Complex.js: 64
  }                                               // Complex.js: 65
}                                                 // Complex.js: 66
                                                  // Complex.js: 67
                                                  // Complex.js: 68
/* Test */                                        // Complex.js: 69
/*                                                // Complex.js: 70
const com = new Complex('c1.2-3.4i')              // Complex.js: 71
console.log(com, '' + com)                        // Complex.js: 72
const com2 = new Complex('c-1.2+3.4i')            // Complex.js: 73
console.log(com2, '' + com2)                      // Complex.js: 74
*/                                                // Complex.js: 75
    },  ///</fid110>
////////////////////////////////////////////////
    fid111(module) {
const Lexer = require('fid102')                   // UnitValue.js: 1
const Scalar = require('fid105')                  // UnitValue.js: 2
                                                  // UnitValue.js: 3
class Converter {                                 // UnitValue.js: 4
  constructor(factors, base) {                    // UnitValue.js: 5
    this.factors = factors                        // UnitValue.js: 6
  }                                               // UnitValue.js: 7
                                                  // UnitValue.js: 8
  is(unit) {                                      // UnitValue.js: 9
    return typeof this.factors[unit] !== 'undefined'        // UnitValue.js: 10
  }                                               // UnitValue.js: 11
                                                  // UnitValue.js: 12
  value(val) {                                    // UnitValue.js: 13
    this.tmpValue = val                           // UnitValue.js: 14
    return this                                   // UnitValue.js: 15
  }                                               // UnitValue.js: 16
                                                  // UnitValue.js: 17
  from(unit) {                                    // UnitValue.js: 18
    this.tmpUnit = unit                           // UnitValue.js: 19
    return this                                   // UnitValue.js: 20
  }                                               // UnitValue.js: 21
                                                  // UnitValue.js: 22
  to(unit) {                                      // UnitValue.js: 23
    const { factors, tmpValue, tmpUnit } = this   // UnitValue.js: 24
    return tmpValue * factors[tmpUnit] /  factors[unit]     // UnitValue.js: 25
  }                                               // UnitValue.js: 26
}                                                 // UnitValue.js: 27
                                                  // UnitValue.js: 28
const converters = {}                             // UnitValue.js: 29
                                                  // UnitValue.js: 30
converters.length = new Converter({               // UnitValue.js: 31
  m: 1,                                           // UnitValue.js: 32
  dm: 1 / 10,                                     // UnitValue.js: 33
  cm: 1 / 100,                                    // UnitValue.js: 34
  mm: 1 / 1000,                                   // UnitValue.js: 35
  um: 1e-6,  // micro meter                       // UnitValue.js: 36
  nm: 1e-9,                                       // UnitValue.js: 37
  'A^o': 1e-10,  // angstrom                      // UnitValue.js: 38
  pm: 1e-12,                                      // UnitValue.js: 39
  am: 1e-15,                                      // UnitValue.js: 40
  inch: 2.54 / 100                                // UnitValue.js: 41
}, 'm')                                           // UnitValue.js: 42
                                                  // UnitValue.js: 43
converters.mass = new Converter({                 // UnitValue.js: 44
  kg: 1000,                                       // UnitValue.js: 45
  g: 1,                                           // UnitValue.js: 46
  mg: 1e-3,                                       // UnitValue.js: 47
  ug: 1e-6,  // micro gram                        // UnitValue.js: 48
  pound: 453.59237                                // UnitValue.js: 49
}, 'kg')                                          // UnitValue.js: 50
                                                  // UnitValue.js: 51
converters.time = new Converter({                 // UnitValue.js: 52
  year: 86400 * 365.2422, years: 86400 * 365.2422,          // UnitValue.js: 53
  day: 86400, days: 86400, d: 86400,              // UnitValue.js: 54
  hour: 3600, hours: 3600, hr: 3600, hrs: 3600,   // UnitValue.js: 55
  minute: 60, minutes: 60, min: 60,               // UnitValue.js: 56
  second: 1, seconds: 1, sec: 1, s: 1,            // UnitValue.js: 57
  ms: 1 / 1000,                                   // UnitValue.js: 58
  us: 1e-6,  // micro second                      // UnitValue.js: 59
  ns: 1e-9,                                       // UnitValue.js: 60
  ps: 1e-12,                                      // UnitValue.js: 61
  as: 1e-15                                       // UnitValue.js: 62
}, 's')                                           // UnitValue.js: 63
                                                  // UnitValue.js: 64
// Derrived units                                 // UnitValue.js: 65
// converters.area = {}                           // UnitValue.js: 66
// ...                                            // UnitValue.js: 67
// converters.speed = {}                          // UnitValue.js: 68
// converters.energy = {}                         // UnitValue.js: 69
// ...                                            // UnitValue.js: 70
                                                  // UnitValue.js: 71
                                                  // UnitValue.js: 72
// Questions: what is the unit of null, {} and ''?          // UnitValue.js: 73
                                                  // UnitValue.js: 74
// UnitValue := real SS unit                      // UnitValue.js: 75
const UnitValue = module.exports = class UnitValue extends Scalar {   // UnitValue.js: 76
  constructor(src) {                              // UnitValue.js: 77
    super()                                       // UnitValue.js: 78
    this.name = 'unit-value'                      // UnitValue.js: 79
    if (src instanceof Lexer) {                   // UnitValue.js: 80
      this.parse(src)                             // UnitValue.js: 81
    } else if (typeof src === 'string') {         // UnitValue.js: 82
      this.parse(new Lexer(src))                  // UnitValue.js: 83
    } else {                                      // UnitValue.js: 84
      this.value = src.value                      // UnitValue.js: 85
      this.unit = src.unit                        // UnitValue.js: 86
    }                                             // UnitValue.js: 87
                                                  // UnitValue.js: 88
    this.setMeasure()                             // UnitValue.js: 89
  }                                               // UnitValue.js: 90
                                                  // UnitValue.js: 91
  parse(lexer) {                                  // UnitValue.js: 92
    lexer.token('real', lexeme => { this.value = +lexeme })           // UnitValue.js: 93
    lexer.skipSS()                                // UnitValue.js: 94
    lexer.token('unit', lexeme => { this.unit = lexeme.trim() })      // UnitValue.js: 95
  }                                               // UnitValue.js: 96
                                                  // UnitValue.js: 97
  setMeasure() {                                  // UnitValue.js: 98
    const { unit } = this                         // UnitValue.js: 99
    if (converters.length.is(unit)) {             // UnitValue.js: 100
      this.measure = 'length'                     // UnitValue.js: 101
    } else if (converters.mass.is(unit)) {        // UnitValue.js: 102
      this.measure = 'mass'                       // UnitValue.js: 103
    } else if (converters.time.is(unit)) {        // UnitValue.js: 104
      this.measure = 'time'                       // UnitValue.js: 105
    } else {                                      // UnitValue.js: 106
      throw new Error('Undefined unit: ' + unit)            // UnitValue.js: 107
    }                                             // UnitValue.js: 108
  }                                               // UnitValue.js: 109
                                                  // UnitValue.js: 110
  add(b) { return UnitValue.add(this, b) }        // UnitValue.js: 111
  sub(b) { return UnitValue.sub(this, b) }        // UnitValue.js: 112
  mul(b) { return UnitValue.mul(this, b) }        // UnitValue.js: 113
  div(b) { return UnitValue.div(this, b) }        // UnitValue.js: 114
  neg(b) { return UnitValue.neg(this) }           // UnitValue.js: 115
                                                  // UnitValue.js: 116
  toString() { return this.value + ' ' + this.unit }        // UnitValue.js: 117
                                                  // UnitValue.js: 118
  toJSON() {                                      // UnitValue.js: 119
    const { name, value, unit, measure } = this   // UnitValue.js: 120
    return { name, value, unit, measure }         // UnitValue.js: 121
  }                                               // UnitValue.js: 122
                                                  // UnitValue.js: 123
  // Result in the unit of a.                     // UnitValue.js: 124
  static add(a, b) {                              // UnitValue.js: 125
    const { value, unit, measure } = a            // UnitValue.js: 126
    if (b.measure !== measure) {                  // UnitValue.js: 127
      throw new Error('Different measures of ' + measure + ' and ' + b.measure)           // UnitValue.js: 128
    }                                             // UnitValue.js: 129
                                                  // UnitValue.js: 130
    return new UnitValue({                        // UnitValue.js: 131
      value: value + converters[measure].value(b.value).from(b.unit).to(unit),            // UnitValue.js: 132
      unit                                        // UnitValue.js: 133
    })                                            // UnitValue.js: 134
  }                                               // UnitValue.js: 135
                                                  // UnitValue.js: 136
  static sub(a, b) {                              // UnitValue.js: 137
    return new UnitValue()                        // UnitValue.js: 138
  }                                               // UnitValue.js: 139
                                                  // UnitValue.js: 140
  static mul(a, b) {                              // UnitValue.js: 141
    return new UnitValue()                        // UnitValue.js: 142
  }                                               // UnitValue.js: 143
                                                  // UnitValue.js: 144
  static div(a, b) {                              // UnitValue.js: 145
    return new UnitValue()                        // UnitValue.js: 146
  }                                               // UnitValue.js: 147
                                                  // UnitValue.js: 148
  static neg(a) {                                 // UnitValue.js: 149
    return new UnitValue({                        // UnitValue.js: 150
      value: -a.value, unit: a.unit               // UnitValue.js: 151
    })                                            // UnitValue.js: 152
  }                                               // UnitValue.js: 153
}                                                 // UnitValue.js: 154
                                                  // UnitValue.js: 155
                                                  // UnitValue.js: 156
                                                  // UnitValue.js: 157
/* Test */                                        // UnitValue.js: 158
/*                                                // UnitValue.js: 159
const uv = new UnitValue('1.2 m')                 // UnitValue.js: 160
console.log(uv, '' + uv)                          // UnitValue.js: 161
*/                                                // UnitValue.js: 162
                                                  // UnitValue.js: 163
                                                  // UnitValue.js: 164
/*                                                // UnitValue.js: 165
  ## Test ideas (raw)                             // UnitValue.js: 166
  - I have a piece of apple (1 poa)               // UnitValue.js: 167
  - You have a bunch of bananas (1 bob)           // UnitValue.js: 168
                                                  // UnitValue.js: 169
  Exchange                                        // UnitValue.js: 170
  1 poa / 1 bob = 1/1 * poa/bob = 1 poa/bob per exchange    // UnitValue.js: 171
  2 poa / 1 bob = 2 poa/bob per exchange          // UnitValue.js: 172
  const exchange = (a, b, ratio) => near(a / b, ratio, 0.05)          // UnitValue.js: 173
                                                  // UnitValue.js: 174
                                                  // UnitValue.js: 175
  //////                                          // UnitValue.js: 176
                                                  // UnitValue.js: 177
  // A piece of apple equals to a piece of apple.           // UnitValue.js: 178
  1 poa = 1 poa  // exchangeable                  // UnitValue.js: 179
  => 1 poa / 1 poa                                // UnitValue.js: 180
  = 1/1 poa/poa  // ratio                         // UnitValue.js: 181
  = 1/1                                           // UnitValue.js: 182
  // Convert the rational number (1/1) to the integer domain.         // UnitValue.js: 183
  = 1                                             // UnitValue.js: 184
                                                  // UnitValue.js: 185
  (1 poa / 1 poa) + (1 bob / 1 bob)               // UnitValue.js: 186
  ---------------   ---------------   // divisions A and B            // UnitValue.js: 187
  = 1/1 + 1/1                                     // UnitValue.js: 188
  = 1 + 1                                         // UnitValue.js: 189
  = 2  // an integer number                       // UnitValue.js: 190
                                                  // UnitValue.js: 191
  = 1/1 + 1/1                                     // UnitValue.js: 192
  = (1 + 1) / 1  // numerator / denominator       // UnitValue.js: 193
  = 2/1                                           // UnitValue.js: 194
  = 2                                             // UnitValue.js: 195
                                                  // UnitValue.js: 196
  (1 poa / 1poa) + (2 bob / 1 bob)  // divisions A and B    // UnitValue.js: 197
  = 1/1 + 2/1                                     // UnitValue.js: 198
  = 1 + 2                                         // UnitValue.js: 199
  = 3                                             // UnitValue.js: 200
                                                  // UnitValue.js: 201
  = 1/1 + 2/1                                     // UnitValue.js: 202
  = (1 + 2) / 1                                   // UnitValue.js: 203
  = 3/1                                           // UnitValue.js: 204
  = 3                                             // UnitValue.js: 205
                                                  // UnitValue.js: 206
  // Repeating decimal as a rational number       // UnitValue.js: 207
      _                                           // UnitValue.js: 208
  x = 0.3 = 0.333333...                           // UnitValue.js: 209
           _                                      // UnitValue.js: 210
  10 x = 3.3                                      // UnitValue.js: 211
             _     _                              // UnitValue.js: 212
  => 9 x = 3.3 - 0.3 = 3                          // UnitValue.js: 213
  => x = 3/9 = 1/3                                // UnitValue.js: 214
                                                  // UnitValue.js: 215
  //////                                          // UnitValue.js: 216
                                                  // UnitValue.js: 217
  const MarketRatios = {  // MR                   // UnitValue.js: 218
    // itemName: ratio                            // UnitValue.js: 219
    rice: 0.5,                                    // UnitValue.js: 220
    flour: 1                                      // UnitValue.js: 221
  }                                               // UnitValue.js: 222
                                                  // UnitValue.js: 223
  // Helpers                                      // UnitValue.js: 224
  const near = (a, b, epsilon = 0.01) => Math.abs(a - b) <= epsilon   // UnitValue.js: 225
                                                  // UnitValue.js: 226
  // Deal with goods                              // UnitValue.js: 227
  // 2 kg of rice per MR[rice] ~= 1 kg of flour per MR[flour]         // UnitValue.js: 228
  // The tolerance is for the weight ballance, quality of the good or others    // UnitValue.js: 229
  // return true/false                            // UnitValue.js: 230
  const dealByBallance = (a, b, tolerance) => {   // UnitValue.js: 231
    return near(a * MarketRatios[a.itemName] /    // UnitValue.js: 232
               (b * MarketRatios[b.itemName]), 1, tolerance) ? 1 : 0            // UnitValue.js: 233
  }                                               // UnitValue.js: 234
                                                  // UnitValue.js: 235
  cosnt deal_1 = dealByBallance(2 kg of rice, 1 kg of flour, 0.001)   // UnitValue.js: 236
  console.log(deal_1)  // true                    // UnitValue.js: 237
                                                  // UnitValue.js: 238
  //////                                          // UnitValue.js: 239
                                                  // UnitValue.js: 240
  // Deal things with fixed price.                // UnitValue.js: 241
                                                  // UnitValue.js: 242
  const accountingDetails = {                     // UnitValue.js: 243
    'a package of cigerettes': {                  // UnitValue.js: 244
      priceTag: '$4.95',  // market price         // UnitValue.js: 245
                          // v discount/gratis/...          // UnitValue.js: 246
                          // ^ inflation/...      // UnitValue.js: 247
      couponValue: {                              // UnitValue.js: 248
        price: '$4.95',                           // UnitValue.js: 249
        expireDate: '2023-4-26'                   // UnitValue.js: 250
      },                                          // UnitValue.js: 251
      weight: '100 +/- 2 g',  // tolerance        // UnitValue.js: 252
      expiredDate: '2023-10-26'  // best before   // UnitValue.js: 253
      ...                                         // UnitValue.js: 254
    }                                             // UnitValue.js: 255
  }                                               // UnitValue.js: 256
                                                  // UnitValue.js: 257
  // The deal is assumed always successful because of the accounting and more   // UnitValue.js: 258
  // details are often clear between the saler and the buyers.        // UnitValue.js: 259
  const dealWithMoney = (a, money) => {           // UnitValue.js: 260
    const changes = money - accountingDetails[a]            // UnitValue.js: 261
    const invoice  // defined by the regulation   // UnitValue.js: 262
    const service  // provided                    // UnitValue.js: 263
    return { changes, invoice, service }          // UnitValue.js: 264
  }                                               // UnitValue.js: 265
                                                  // UnitValue.js: 266
  const deal_2 = dealWithMoney('a package of cigerettes', '$5.00')    // UnitValue.js: 267
  console.log(deal_2)  // $0.05 (five cents)      // UnitValue.js: 268
                                                  // UnitValue.js: 269
  REM \pi = 3.141592654(1)                        // UnitValue.js: 270
  REM Ref. pyramid, ..., fulerene                 // UnitValue.js: 271
  REM e = 2.71828(1)                              // UnitValue.js: 272
  REM Ref. ln(e) = 1                              // UnitValue.js: 273
  REM y = 1 / x (Indifference curve for the individual economics)     // UnitValue.js: 274
  REM   \ y: quality                              // UnitValue.js: 275
  REM   -.                                        // UnitValue.js: 276
  REM    | \ x: quantity                          // UnitValue.js: 277
  REM    *                                        // UnitValue.js: 278
  REM y = (1, 2, 3, ..., n) / n, for n = 1--30    // UnitValue.js: 279
  REM Find the hyperbolic curves for the asymptotic approximation.    // UnitValue.js: 280
  REM Test y = a / x + b                          // UnitValue.js: 281
  REM \./; ).(; ,|/; \/,; )|(; /|\                // UnitValue.js: 282
  REM                           .                 // UnitValue.js: 283
  REM Select five key qualities for the role.     // UnitValue.js: 284
  REM name_a (***)   =========================    // UnitValue.js: 285
  REM name_b (***)   ===========================            // UnitValue.js: 286
  REM name_c (***)   ============================           // UnitValue.js: 287
  REM name_d (***)   ==========================   // UnitValue.js: 288
  REM name_e (***)   ========================     // UnitValue.js: 289
  REM        stars   strength                     // UnitValue.js: 290
  REM or in polygon shape (ballance/lengths/area/...).      // UnitValue.js: 291
  REM It is for the fighting; not here. For a quest.        // UnitValue.js: 292
  REM (The fighting is not here; there.)          // UnitValue.js: 293
*/                                                // UnitValue.js: 294
    },  ///</fid111>
////////////////////////////////////////////////
    fid112(module) {
const Lexer = require('fid102')                   // Text.js: 1
                                                  // Text.js: 2
// Helpers                                        // Text.js: 3
const escape = (str, qMark) => str.replace(new RegExp(qMark, 'g'), '\\$&')      // Text.js: 4
const unescape = str => str.replace(/\\/g, '')    // Text.js: 5
                                                  // Text.js: 6
                                                  // Text.js: 7
// Text := '\'' without-'\'' '\'' |               // Text.js: 8
//         '"' without-'"' '"'                    // Text.js: 9
const Text = module.exports = class Text {        // Text.js: 10
  constructor(src) {                              // Text.js: 11
    this.name = 'text'                            // Text.js: 12
    if (src instanceof Lexer) {                   // Text.js: 13
      this.parse(src)                             // Text.js: 14
    } else if (typeof src === 'string' ) {        // Text.js: 15
      this.parse(new Lexer(src))                  // Text.js: 16
    } else {                                      // Text.js: 17
      this.value = src.value                      // Text.js: 18
      this.qMark = src.qMark || '\''  // default            // Text.js: 19
    }                                             // Text.js: 20
  }                                               // Text.js: 21
                                                  // Text.js: 22
  parse(lexer) {                                  // Text.js: 23
    if (lexer.is('\'')) {                         // Text.js: 24
      this.qMark = '\''                           // Text.js: 25
      lexer.token('\'')                           // Text.js: 26
      // if (lexer.is('$') this.value = new Latex(lexer)    // Text.js: 27
      lexer.escwithout('\'', 'esc-sq', lexeme => {          // Text.js: 28
        this.value = unescape(lexeme)             // Text.js: 29
      })                                          // Text.js: 30
      lexer.token('\'')                           // Text.js: 31
    } else if (lexer.is('"')) {                   // Text.js: 32
      this.qMark = '"'                            // Text.js: 33
      lexer.token('"')                            // Text.js: 34
      lexer.escwithout('"', 'esc-dq', lexeme => {           // Text.js: 35
        this.value = unescape(lexeme)             // Text.js: 36
      })                                          // Text.js: 37
      lexer.token('"')                            // Text.js: 38
    } else {                                      // Text.js: 39
      lexer.error('Invalid text')                 // Text.js: 40
    }                                             // Text.js: 41
  }                                               // Text.js: 42
                                                  // Text.js: 43
  add(b) { return Text.add(this, b) }             // Text.js: 44
  sub() { throw new Error('Unsupport \'-\' for text.') }    // Text.js: 45
  mul() { throw new Error('Unsupport \'*\' for text.') }    // Text.js: 46
  div() { throw new Error('Unsupport \'/\' for text.') }    // Text.js: 47
  neg() { throw new Error('Unsupport \'-\' for text.') }    // Text.js: 48
                                                  // Text.js: 49
  toString() {                                    // Text.js: 50
    const { qMark, value } = this                 // Text.js: 51
    return [qMark, escape(value, qMark), qMark].join('')    // Text.js: 52
  }                                               // Text.js: 53
                                                  // Text.js: 54
  toJSON() {                                      // Text.js: 55
    const { name, value, qMark } = this           // Text.js: 56
    return { name, value, qMark }                 // Text.js: 57
  }                                               // Text.js: 58
                                                  // Text.js: 59
  static add(a, b) {                              // Text.js: 60
    return new Text({                             // Text.js: 61
      value: a.value + b.value,                   // Text.js: 62
      qMark: a.qMark                              // Text.js: 63
    })                                            // Text.js: 64
  }                                               // Text.js: 65
}                                                 // Text.js: 66
                                                  // Text.js: 67
                                                  // Text.js: 68
/* Test */                                        // Text.js: 69
/*                                                // Text.js: 70
const txt = new Text('\'"hi", \\\'there\\\'\'')   // Text.js: 71
console.log(txt, '' + txt)                        // Text.js: 72
const txt2 = new Text('"\\"hi\\" \'there\'"')     // Text.js: 73
console.log(txt2, '' + txt2)                      // Text.js: 74
*/                                                // Text.js: 75
    },  ///</fid112>
////////////////////////////////////////////////
    fid104(module) {
const Lexer = require('fid102')                   // integer.js: 1
const Scalar = require('fid105')                  // integer.js: 2
const Rational = require('fid106')                // integer.js: 3
const Decimal = require('fid108')                 // integer.js: 4
const Real = require('fid109')                    // integer.js: 5
const Complex = require('fid110')                 // integer.js: 6
const UnitValue = require('fid111')               // integer.js: 7
const Text = require('fid112')                    // integer.js: 8
                                                  // integer.js: 9
                                                  // integer.js: 10
// Integer := 'i' integer                         // integer.js: 11
const Integer = module.exports = class Integer extends Scalar {       // integer.js: 12
  constructor(src) {                              // integer.js: 13
    super()                                       // integer.js: 14
    this.name = 'integer'                         // integer.js: 15
    if (src instanceof Lexer) {                   // integer.js: 16
      this.parse(src)                             // integer.js: 17
    } else if (typeof src === 'string') {         // integer.js: 18
      this.parse(new Lexer(src))                  // integer.js: 19
    } else {                                      // integer.js: 20
      this.value = +src                           // integer.js: 21
    }                                             // integer.js: 22
  }                                               // integer.js: 23
                                                  // integer.js: 24
  parse(lexer) {                                  // integer.js: 25
    lexer.token('i')                              // integer.js: 26
    lexer.token('integer', lexeme => { this.value = +lexeme })        // integer.js: 27
  }                                               // integer.js: 28
                                                  // integer.js: 29
  add(b) { return Integer.add(this, b) }          // integer.js: 30
  sub(b) { return Integer.sub(this, b) }          // integer.js: 31
  mul(b) { return Integer.mul(this, b) }          // integer.js: 32
  div(b) { return Integer.div(this, b) }          // integer.js: 33
  pow(b) { return Integer.pow(this, b) }          // integer.js: 34
  neg() { return Integer.neg(this) }              // integer.js: 35
                                                  // integer.js: 36
  to(type) {                                      // integer.js: 37
    const { value } = this                        // integer.js: 38
    switch (type) {                               // integer.js: 39
      case 'integer': return new Integer(value)   // integer.js: 40
      case 'rational': return new Rational({ num: value, denom: 1 })            // integer.js: 41
      case 'decimal': return new Decimal({ a: value, n: 0 })          // integer.js: 42
      case 'real': return new Real({ value })     // integer.js: 43
      case 'complex': return new Complex({ re: value, im: 0 })        // integer.js: 44
      // case 'unit-value': return new UnitValue({ value, unit: '' })           // integer.js: 45
      case 'text': return new Text({ value })     // integer.js: 46
      default: throw new TypeError(`Cannot covert integer, ${this}, to type: ${type}.`)   // integer.js: 47
    }                                             // integer.js: 48
  }                                               // integer.js: 49
                                                  // integer.js: 50
                                                  // integer.js: 51
  toString() { return 'i' + this.value }          // integer.js: 52
                                                  // integer.js: 53
  toJSON() {                                      // integer.js: 54
    const { name, value } = this                  // integer.js: 55
    return { name, value }                        // integer.js: 56
  }                                               // integer.js: 57
                                                  // integer.js: 58
                                                  // integer.js: 59
  static add(a, b) { return new Integer(a.value + b.value) }          // integer.js: 60
  static sub(a, b) { return new Integer(a.value - b.value) }          // integer.js: 61
  static mul(a, b) { return new Integer(a.value * b.value) }          // integer.js: 62
  static div(a, b) { return new Integer(a.value / b.value) }          // integer.js: 63
  static pow(a, b) { return new Integer(Math.pow(a.value, b.value)) }           // integer.js: 64
  static neg(a) { return new Integer(-a.value) }            // integer.js: 65
}                                                 // integer.js: 66
                                                  // integer.js: 67
                                                  // integer.js: 68
/* Test */                                        // integer.js: 69
// const int = new Integer('i123')                // integer.js: 70
// console.log(int, '' + int)                     // integer.js: 71
// const int2 = new Integer('i123456789')         // integer.js: 72
// console.log(int2.to('integer'), int2.to('rational'), int2.to('decimal'), int2.to('real'), int2.to('complex'), int2.to('text'))  // integer.js: 73
// int2.to('unknown')                             // integer.js: 74
                                                  // integer.js: 75
                                                  // integer.js: 76
    },  ///</fid104>
////////////////////////////////////////////////
    fid113(module) {
const Lexer = require('fid102')                   // Latex.js: 1
                                                  // Latex.js: 2
// Helpers                                        // Latex.js: 3
const escape = str => str.replace(/\\$/g, '\\$&')           // Latex.js: 4
const unescape = str => str.replace(/\\/g, '')    // Latex.js: 5
                                                  // Latex.js: 6
                                                  // Latex.js: 7
// Latex := '$' without-'$' '$'                   // Latex.js: 8
const Latex = module.exports = class Latex {      // Latex.js: 9
  constructor(src) {                              // Latex.js: 10
    this.name = 'latex'                           // Latex.js: 11
    if (src instanceof Lexer) {                   // Latex.js: 12
      this.parse(src)                             // Latex.js: 13
    } else if (typeof src === 'string') {         // Latex.js: 14
      this.parse(new Lexer(src))                  // Latex.js: 15
    } else {                                      // Latex.js: 16
      this.value = '' + src                       // Latex.js: 17
    }                                             // Latex.js: 18
  }                                               // Latex.js: 19
                                                  // Latex.js: 20
  parse(lexer) {                                  // Latex.js: 21
    lexer.token('$')                              // Latex.js: 22
    lexer.escwithout('$', 'esc-latex', lexeme => {          // Latex.js: 23
      this.value = unescape(lexeme)               // Latex.js: 24
    })                                            // Latex.js: 25
    lexer.token('$')                              // Latex.js: 26
  }                                               // Latex.js: 27
                                                  // Latex.js: 28
  toString() {                                    // Latex.js: 29
    return ['$', escape(this.value), '$'].join('')          // Latex.js: 30
  }                                               // Latex.js: 31
                                                  // Latex.js: 32
  toJSON() {                                      // Latex.js: 33
    const { name, value } = this                  // Latex.js: 34
    return { name, value }                        // Latex.js: 35
  }                                               // Latex.js: 36
}                                                 // Latex.js: 37
                                                  // Latex.js: 38
/* Test */                                        // Latex.js: 39
                                                  // Latex.js: 40
/*                                                // Latex.js: 41
console.log(new Latex('$123 + 456$'))             // Latex.js: 42
*/                                                // Latex.js: 43
    },  ///</fid113>
////////////////////////////////////////////////
    fid114(module) {
const Lexer = require('fid102')                   // Blockquote.js: 1
                                                  // Blockquote.js: 2
// Fanced blockquote                              // Blockquote.js: 3
// '```' lang? SS NL mlwithout-'```' ````         // Blockquote.js: 4
const Blockquote = module.exports = class Blockquote {      // Blockquote.js: 5
  constructor(src) {                              // Blockquote.js: 6
    this.name = 'blockquote'                      // Blockquote.js: 7
    if (src instanceof Lexer) {                   // Blockquote.js: 8
      this.parse(src)                             // Blockquote.js: 9
    } else if (typeof src === 'string') {         // Blockquote.js: 10
      this.parse(new Lexer(src))                  // Blockquote.js: 11
    } else {                                      // Blockquote.js: 12
      this.lang = ''                              // Blockquote.js: 13
      this.value = '' + src                       // Blockquote.js: 14
    }                                             // Blockquote.js: 15
  }                                               // Blockquote.js: 16
                                                  // Blockquote.js: 17
  parse(lexer) {                                  // Blockquote.js: 18
    lexer.token('```')
    lexer.optional('lang', lexeme => { this.lang = lexeme })
    lexer.skipSS()
    lexer.nextLine()
    lexer.mlwithout('```', lexeme => { this.value = lexeme })         // Blockquote.js: 23
    lexer.token('```')
  }

  toString() {
    return ['```', this.lang, '\n', this.value, '```'].join('')
  }

  toJSON() {
    const { name, lang, value } = this
    return { name, lang, value }
  }
}


/* Test */

// console.log('')
    },  ///</fid114>
////////////////////////////////////////////////
    fid115(module) {
const Lexer = require('fid102')                   // Vector.js: 1
                                                  // Vector.js: 2
// Vector := '[' WS ']' |                         // Vector.js: 3
//           '[' WS scaler WS (','? WS scaler WS)* ']'      // Vector.js: 4
// (Matlab style)                                 // Vector.js: 5
const Vector = module.exports = class Vector {    // Vector.js: 6
  constructor(src) {                              // Vector.js: 7
    this.name = 'vector'                          // Vector.js: 8
    if (src instanceof Lexer) {                   // Vector.js: 9
      this.parse(src)                             // Vector.js: 10
    } else if (typeof src === 'string') {         // Vector.js: 11
      this.parse(new Lexer(src))                  // Vector.js: 12
    } else {                                      // Vector.js: 13
      this.value = src.value                      // Vector.js: 14
    }                                             // Vector.js: 15
  }                                               // Vector.js: 16
                                                  // Vector.js: 17
  parse(lexer) {                                  // Vector.js: 18
    this.value = []                               // Vector.js: 19
    lexer.token('[')                              // Vector.js: 20
    lexer.skipWhite()                             // Vector.js: 21
    if (lexer.is(']')) { lexer.token(']'); return }         // Vector.js: 22
                                                  // Vector.js: 23
    lexer.token('scaler', lexeme => { this.value.push(+lexeme) })     // Vector.js: 24
    lexer.skipWhite()                             // Vector.js: 25
                                                  // Vector.js: 26
    while (!lexer.is(']')) {                      // Vector.js: 27
      lexer.optional(',')                         // Vector.js: 28
      lexer.skipWhite()                           // Vector.js: 29
      lexer.token('scaler', lexeme => { this.value.push(+lexeme) })   // Vector.js: 30
    }                                             // Vector.js: 31
                                                  // Vector.js: 32
    lexer.token(']')                              // Vector.js: 33
  }                                               // Vector.js: 34
                                                  // Vector.js: 35
  toString() {                                    // Vector.js: 36
    const sep = ' '                               // Vector.js: 37
    const strs = ['[']                            // Vector.js: 38
    strs.push(this.value.join(sep))               // Vector.js: 39
    strs.push(']')                                // Vector.js: 40
    return strs.join('')                          // Vector.js: 41
  }                                               // Vector.js: 42
                                                  // Vector.js: 43
  toJSON() {                                      // Vector.js: 44
    const { name, value } = this                  // Vector.js: 45
    return { name, value }                        // Vector.js: 46
  }                                               // Vector.js: 47
}                                                 // Vector.js: 48
                                                  // Vector.js: 49
                                                  // Vector.js: 50
/* Test */                                        // Vector.js: 51
/*                                                // Vector.js: 52
const vec = new Vector('[1, 2, 3 4 5 6]')         // Vector.js: 53
console.log(vec, '' + vec)                        // Vector.js: 54
*/                                                // Vector.js: 55
    },  ///</fid115>
////////////////////////////////////////////////
    fid116(module) {
const Lexer = require('fid102')                   // Matrix.js: 1
                                                  // Matrix.js: 2
// Matrix := '[' ']'                              // Matrix.js: 3
// E.g., [1 2 3; 4 5 6]  // Matlab style          // Matrix.js: 4
const Matrix = module.exports = class Matrix {    // Matrix.js: 5
  constructor(src) {                              // Matrix.js: 6
    this.name = 'matrix'                          // Matrix.js: 7
    if (src instanceof Lexer) {                   // Matrix.js: 8
      this.parse(src)                             // Matrix.js: 9
    } else if (typeof src === 'string') {         // Matrix.js: 10
      this.parse(new Lexer(src))                  // Matrix.js: 11
    } else {                                      // Matrix.js: 12
       this.value = src.value                     // Matrix.js: 13
    }                                             // Matrix.js: 14
  }                                               // Matrix.js: 15
                                                  // Matrix.js: 16
  parse(lexer) {                                  // Matrix.js: 17
    Lexer.token('[')                              // Matrix.js: 18
                                                  // Matrix.js: 19
    Lexer.token(']')                              // Matrix.js: 20
  }                                               // Matrix.js: 21
                                                  // Matrix.js: 22
  toString() {}                                   // Matrix.js: 23
                                                  // Matrix.js: 24
  toJSON() {                                      // Matrix.js: 25
    const { name, value } = this                  // Matrix.js: 26
    return { name, value }                        // Matrix.js: 27
  }                                               // Matrix.js: 28
}                                                 // Matrix.js: 29
    },  ///</fid116>
////////////////////////////////////////////////
    fid101(module) {
const Lexer = require('fid102')                   // Calculator.js: 1
                                                  // Calculator.js: 2
const Scalar = require('fid104')                  // Calculator.js: 3
const Integer = require('fid104')                 // Calculator.js: 4
const Rational = require('fid106')                // Calculator.js: 5
const Decimal = require('fid108')                 // Calculator.js: 6
const Real = require('fid109')                    // Calculator.js: 7
const Complex = require('fid110')                 // Calculator.js: 8
const UnitValue = require('fid111')               // Calculator.js: 9
const Text = require('fid112')                    // Calculator.js: 10
const Latex = require('fid113')                   // Calculator.js: 11
const Blockquote = require('fid114')              // Calculator.js: 12
                                                  // Calculator.js: 13
const Vector = require('fid115')                  // Calculator.js: 14
const Matrix = require('fid116')                  // Calculator.js: 15
                                                  // Calculator.js: 16
const { sum, average, range, linspace } = require('fid107')           // Calculator.js: 17
                                                  // Calculator.js: 18
                                                  // Calculator.js: 19
const { E, LN2, LN10, LOG2E, LOG10E, PI, SQRT1_2, SQRT2 } = Math      // Calculator.js: 20
const constants = {                               // Calculator.js: 21
  E, LN2, LN10, LOG2E, LOG10E,                    // Calculator.js: 22
  PI: new Real(PI),                               // Calculator.js: 23
  SQRT1_2, SQRT2                                  // Calculator.js: 24
}                                                 // Calculator.js: 25
                                                  // Calculator.js: 26
const {                                           // Calculator.js: 27
  abs, acos, acosh, asin, asinh, atan, atanh, atan2,        // Calculator.js: 28
  cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot,  imul,        // Calculator.js: 29
  log, log1p, log10, log2, max, min, pow, random, round,    // Calculator.js: 30
  sign, sin, sinh, sqrt, tan, tanh, trunc         // Calculator.js: 31
} = Math                                          // Calculator.js: 32
const functions = {                               // Calculator.js: 33
  abs, acos, acosh, asin, asinh, atan, atanh, atan2,        // Calculator.js: 34
  cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot,  imul,        // Calculator.js: 35
  log, log1p, log10, log2, max, min, pow, random, round,    // Calculator.js: 36
  sign, sin, sinh, sqrt, tan, tanh, trunc,        // Calculator.js: 37
  sum, average, linspace                          // Calculator.js: 38
}                                                 // Calculator.js: 39
                                                  // Calculator.js: 40
                                                  // Calculator.js: 41
// Calculator := WS (Assignment | Expression)*    // Calculator.js: 42
const Calculator = module.exports = class Calculator {      // Calculator.js: 43
  constructor(src)  {                             // Calculator.js: 44
    this.name = 'calulator'                       // Calculator.js: 45
    this.src = src                                // Calculator.js: 46
    this.env = {}                                 // Calculator.js: 47
    this.parse(new Lexer(src))                    // Calculator.js: 48
  }                                               // Calculator.js: 49
                                                  // Calculator.js: 50
  parse(lexer) {                                  // Calculator.js: 51
    lexer.skipWhite()                             // Calculator.js: 52
    while (!lexer.eof) {                          // Calculator.js: 53
      if (lexer.is('assignment')) {               // Calculator.js: 54
        this.parseAssignment(lexer)               // Calculator.js: 55
      } else {                                    // Calculator.js: 56
        this.env.ans = this.parseExpression(lexer)          // Calculator.js: 57
      }                                           // Calculator.js: 58
    }                                             // Calculator.js: 59
  }                                               // Calculator.js: 60
                                                  // Calculator.js: 61
  // Assignment := ident SS '=' WS Expression     // Calculator.js: 62
  parseAssignment(lexer) {                        // Calculator.js: 63
    let name                                      // Calculator.js: 64
    lexer.token('ident', lexeme => { name = lexeme })       // Calculator.js: 65
    lexer.skipSS()                                // Calculator.js: 66
    lexer.token('=')                              // Calculator.js: 67
    lexer.skipWhite()                             // Calculator.js: 68
    this.env[name] = this.parseExpression(lexer)            // Calculator.js: 69
    this.env.ans = this.env[name]                 // Calculator.js: 70
  }                                               // Calculator.js: 71
                                                  // Calculator.js: 72
  // Experession := create-vector                 // Calculator.js: 73
  parseExpression(lexer) {                        // Calculator.js: 74
    return this.parseCreateVector(lexer)          // Calculator.js: 75
  }                                               // Calculator.js: 76
                                                  // Calculator.js: 77
  // create-vector := expr (':' WS expr (':' WS expr)?)?    // Calculator.js: 78
  //                  begin        step         end         // Calculator.js: 79
  parseCreateVector(lexer) {                      // Calculator.js: 80
    let begin, step, end                          // Calculator.js: 81
    begin = this.parseExpr(lexer)                 // Calculator.js: 82
    if (!lexer.is(':')) return begin              // Calculator.js: 83
                                                  // Calculator.js: 84
    lexer.token(':')                              // Calculator.js: 85
    lexer.skipWhite()                             // Calculator.js: 86
    step = this.parseExpr(lexer).value            // Calculator.js: 87
    if (lexer.is(':')) {                          // Calculator.js: 88
      lexer.token(':')                            // Calculator.js: 89
      lexer.skipWhite()                           // Calculator.js: 90
      end = this.parseExpr(lexer).value           // Calculator.js: 91
    }                                             // Calculator.js: 92
    if (typeof end === 'undefined') { end = step; step = 1 }          // Calculator.js: 93
    return range(begin.value, step, end)          // Calculator.js: 94
  }                                               // Calculator.js: 95
                                                  // Calculator.js: 96
  // Expr := Term (addop WS Term)*                // Calculator.js: 97
  parseExpr(lexer) {                              // Calculator.js: 98
    let value = this.parseTerm(lexer)             // Calculator.js: 99
                                                  // Calculator.js: 100
    while (lexer.is('addop')) {                   // Calculator.js: 101
      lexer.token('addop', lexeme => {            // Calculator.js: 102
        lexer.skipWhite()                         // Calculator.js: 103
        if (lexeme === '+') {                     // Calculator.js: 104
          value = Calculator.add(value, this.parseTerm(lexer))        // Calculator.js: 105
        } else {                                  // Calculator.js: 106
          value = Calculator.sub(value, this.parseTerm(lexer))        // Calculator.js: 107
        }                                         // Calculator.js: 108
      })                                          // Calculator.js: 109
    }                                             // Calculator.js: 110
                                                  // Calculator.js: 111
    return value                                  // Calculator.js: 112
  }                                               // Calculator.js: 113
                                                  // Calculator.js: 114
  // Term := Factor (mulop WS Factor)*            // Calculator.js: 115
  parseTerm(lexer) {                              // Calculator.js: 116
    let value = this.parseFactor(lexer)           // Calculator.js: 117
                                                  // Calculator.js: 118
    while (lexer.is('mulop')) {                   // Calculator.js: 119
      lexer.token('mulop', lexeme => {            // Calculator.js: 120
        lexer.skipWhite()                         // Calculator.js: 121
        if (lexeme === '*') {                     // Calculator.js: 122
          value = Calculator.mul(value, this.parseFactor(lexer))      // Calculator.js: 123
        } else {                                  // Calculator.js: 124
          value = Calculator.div(value, this.parseFactor(lexer))      // Calculator.js: 125
        }                                         // Calculator.js: 126
      })                                          // Calculator.js: 127
    }                                             // Calculator.js: 128
                                                  // Calculator.js: 129
    return value                                  // Calculator.js: 130
  }                                               // Calculator.js: 131
                                                  // Calculator.js: 132
  // Factor := Value WS (powop WS Value WS)*      // Calculator.js: 133
  parseFactor(lexer) {                            // Calculator.js: 134
    let value = this.parseValue(lexer)            // Calculator.js: 135
    lexer.skipWhite()                             // Calculator.js: 136
    while (lexer.is('powop')) {                   // Calculator.js: 137
      lexer.token('powop')                        // Calculator.js: 138
      lexer.skipWhite()                           // Calculator.js: 139
      value = Calculator.pow(value, this.parseValue(lexer))           // Calculator.js: 140
      lexer.skipWhite()                           // Calculator.js: 141
    }                                             // Calculator.js: 142
    return value                                  // Calculator.js: 143
  }                                               // Calculator.js: 144
                                                  // Calculator.js: 145
  // Value := sign? (Function | paren | types | ident       // Calculator.js: 146
  //          ) '!'?                              // Calculator.js: 147
  // paren := '(' WS Expression ')'               // Calculator.js: 148
  parseValue(lexer) {                             // Calculator.js: 149
    let value                                     // Calculator.js: 150
    let sign                                      // Calculator.js: 151
                                                  // Calculator.js: 152
    lexer.optional('sign', lexeme => { sign = lexeme })     // Calculator.js: 153
                                                  // Calculator.js: 154
    if (lexer.is('function')) {                   // Calculator.js: 155
      value = this.parseFunction(lexer)           // Calculator.js: 156
    } else if (lexer.is('paren')) {               // Calculator.js: 157
      lexer.token('(')                            // Calculator.js: 158
      lexer.skipWhite()                           // Calculator.js: 159
      value = this.parseExpression(lexer)         // Calculator.js: 160
      lexer.token(')')                            // Calculator.js: 161
    } else if (lexer.is('types')) {               // Calculator.js: 162
      value = this.parseTypes(lexer)              // Calculator.js: 163
    } else if (lexer.is('ident')) {               // Calculator.js: 164
      value = this.parseIdent(lexer)              // Calculator.js: 165
    } else {                                      // Calculator.js: 166
      lexer.error('Invalid value')                // Calculator.js: 167
    }                                             // Calculator.js: 168
                                                  // Calculator.js: 169
    if (sign === '-') value = Calculator.neg(value)         // Calculator.js: 170
                                                  // Calculator.js: 171
    return value                                  // Calculator.js: 172
  }                                               // Calculator.js: 173
                                                  // Calculator.js: 174
  // Function := ident SS '(' WS arg-list ')'     // Calculator.js: 175
  // arg-list := '' | Expression (',' WS Expression)*       // Calculator.js: 176
  parseFunction(lexer) {                          // Calculator.js: 177
    let name                                      // Calculator.js: 178
    let argList = []                              // Calculator.js: 179
    lexer.token('ident', lexeme => { name = lexeme })       // Calculator.js: 180
    lexer.skipSS()                                // Calculator.js: 181
    lexer.token('(')                              // Calculator.js: 182
    lexer.skipWhite()                             // Calculator.js: 183
                                                  // Calculator.js: 184
    if (!lexer.is(')')) {                         // Calculator.js: 185
      argList.push(this.parseExpression(lexer))   // Calculator.js: 186
      while (lexer.is(',')) {                     // Calculator.js: 187
        lexer.token(',')                          // Calculator.js: 188
        lexer.skipWhite()                         // Calculator.js: 189
        argList.push(this.parseExpression(lexer))           // Calculator.js: 190
      }                                           // Calculator.js: 191
    }                                             // Calculator.js: 192
                                                  // Calculator.js: 193
    lexer.token(')')                              // Calculator.js: 194
                                                  // Calculator.js: 195
    // Convert types to JS number for the argList           // Calculator.js: 196
    // Supported types: Integer, Rational, Decimal, Real    // Calculator.js: 197
    // Some functions such as sin() can have Complex (not implemented yet).     // Calculator.js: 198
    // The result is coerced to be Real.          // Calculator.js: 199
    argList = argList.map(tval => tval.value)     // Calculator.js: 200
    let num =  Calculator.functions[name].apply(null, argList)        // Calculator.js: 201
    return new Real(num)                          // Calculator.js: 202
  }                                               // Calculator.js: 203
                                                  // Calculator.js: 204
  parseTypes(lexer) {                             // Calculator.js: 205
    if (lexer.is('i')) return new Integer(lexer)            // Calculator.js: 206
    if (lexer.is('d')) return new Decimal(lexer)            // Calculator.js: 207
    if (lexer.is('r')) return new Rational(lexer)           // Calculator.js: 208
    if (lexer.is('c')) return new Complex(lexer)            // Calculator.js: 209
    if (lexer.is('unit-value')) return new UnitValue(lexer)           // Calculator.js: 210
    if (lexer.is('real')) return new Real(lexer)            // Calculator.js: 211
    if (lexer.is('text')) return new Text(lexer)            // Calculator.js: 212
    if (lexer.is('latex')) return new Latex(lexer)          // Calculator.js: 213
    if (lexer.is('blockquote')) return new Blockquote(lexer)          // Calculator.js: 214
    if (lexer.is('vector')) return new Vector(lexer)        // Calculator.js: 215
    if (lexer.is('matrix')) return new Matrix(lexer)        // Calculator.js: 216
    lexer.error('Type error')                     // Calculator.js: 217
  }                                               // Calculator.js: 218
                                                  // Calculator.js: 219
  parseIdent(lexer) {                             // Calculator.js: 220
    let name                                      // Calculator.js: 221
    lexer.token('ident', lexeme => { name = lexeme })       // Calculator.js: 222
    let value = this.env[name]                    // Calculator.js: 223
    if (typeof value === 'undefined') value = Calculator.constants[name]        // Calculator.js: 224
    if (typeof value === 'undefined') {           // Calculator.js: 225
      lexer.error('Undefined variable: ' + name)            // Calculator.js: 226
    }                                             // Calculator.js: 227
    return value                                  // Calculator.js: 228
  }                                               // Calculator.js: 229
                                                  // Calculator.js: 230
  toString() {}                                   // Calculator.js: 231
                                                  // Calculator.js: 232
  toJSON() {                                      // Calculator.js: 233
    const { name, src, env } = this               // Calculator.js: 234
    return { name, src, env }                     // Calculator.js: 235
  }                                               // Calculator.js: 236
                                                  // Calculator.js: 237
                                                  // Calculator.js: 238
  static constants = constants                    // Calculator.js: 239
  static functions = functions                    // Calculator.js: 240
                                                  // Calculator.js: 241
                                                  // Calculator.js: 242
  // In this version, for the same type of a and b only     // Calculator.js: 243
  // (2022-10-31 short test for mixed types)      // Calculator.js: 244
                                                  // Calculator.js: 245
  static add(a, b) {                              // Calculator.js: 246
    if (a.name === 'text') return a.add(b)        // Calculator.js: 247
    return Scalar.tmpAdd(a, b)                    // Calculator.js: 248
    // return a.add(b)                            // Calculator.js: 249
  }                                               // Calculator.js: 250
                                                  // Calculator.js: 251
  static sub(a, b) {                              // Calculator.js: 252
    return a.sub(b)                               // Calculator.js: 253
  }                                               // Calculator.js: 254
                                                  // Calculator.js: 255
  static mul(a, b) {                              // Calculator.js: 256
    return a.mul(b)                               // Calculator.js: 257
  }                                               // Calculator.js: 258
                                                  // Calculator.js: 259
  static div(a, b) {                              // Calculator.js: 260
    return a.div(b)                               // Calculator.js: 261
  }                                               // Calculator.js: 262
                                                  // Calculator.js: 263
  static pow(a, b) {                              // Calculator.js: 264
    return a.pow(b)                               // Calculator.js: 265
  }                                               // Calculator.js: 266
                                                  // Calculator.js: 267
  static neg(a) {                                 // Calculator.js: 268
    return a.neg()                                // Calculator.js: 269
  }                                               // Calculator.js: 270
}                                                 // Calculator.js: 271
                                                  // Calculator.js: 272
                                                  // Calculator.js: 273
                                                  // Calculator.js: 274
                                                  // Calculator.js: 275
                                                  // Calculator.js: 276
    },  ///</fid101>
////////////////////////////////////////////////
    fid100(module) {
const Calculator = require('fid101')              // app.js: 1
                                                  // app.js: 2
                                                  // app.js: 3
const src = '1.2 + 2 * 3'  // 7.2                 // app.js: 4
console.log(new Calculator(src).env)              // app.js: 5
                                                  // app.js: 6
console.log(new Calculator('2^3').env)  // 8      // app.js: 7
console.log(new Calculator('(1 + 2) * 3').env)  // 9        // app.js: 8
console.log(new Calculator(' 2 ^ 2 ^ (2 + 3)').env)  // 1024          // app.js: 9
                                                  // app.js: 10
console.log(new Calculator(`
  // Assignment test
  a = 1
  b = a + 2  // 3
  c = -b  // -3
  d = +b  // 3
  e = -(a + 1)  // -2
  f = a + b * 3  // 10
  2 * ans  // 20
`).env)                                           // app.js: 20
                                                  // app.js: 21
console.log(new Calculator(`
  a = i1 + i-2  // i-1
  b = r2/3 + r-3/4  // 8/12 - 9/12 = -1/12
  c = r2/3 * r-3/4  // r-1/2
  d = c1+2i + c2+5i
  e = c1+2i * c1-2i  // c5+0i
`).env)                                           // app.js: 28
                                                  // app.js: 29
console.log(new Calculator(`
  aa = sin(PI / i2) * 3
  bb = -random()
  cc = pow(r2/1, d3.0)
  avg  = average(1, 2, 3, 4, 5, 6)  // 21/6 = 7/2 = 3.5
  sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
`).env)                                           // app.js: 36
                                                  // app.js: 37
console.log('2022-10-20', new Calculator(`
  id = 'A123'
  id = id + '-456' + "-789"
  a = 1 cm + 2 m
  b = 1 m + 2 cm
  t1 = 5 sec + 1 min
  tex = $test \\$ latex$
`).env)                                           // app.js: 45
                                                  // app.js: 46
console.log('test blockquote', new Calculator('```test-1\n\something\n```').env)          // app.js: 47
                                                  // app.js: 48
console.log('vector creation', new Calculator(`
  // The content of the vector type is not defined yet.
  v1 = 1 : 10
  v2 = 1 + 2 : 3 : 7 * 9
  v3 = 0 : -2 : -10
  v4 = linspace(-5, 5)
  v5 = linspace(-5, 5, 7)
`).env)                                           // app.js: 56
                                                  // app.js: 57
console.log('test mixed type', new Calculator(`
  a = r1/3 + i2  // r7/3
  b = i2 + r1/3
  c = i2 + c1+2i
`).env)                                           // app.js: 62
    },  ///</fid100>
///</content>

///<back-matter>
  }
  require('fid100')   // entry
}())
///</back-matter>
