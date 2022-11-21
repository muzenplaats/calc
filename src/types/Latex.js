import Lexer from '../Lexer'

// Helpers
const escape = str => str.replace(/\\$/g, '\\$&')
const unescape = str => str.replace(/\\/g, '')


// Latex := '$' without-'$' '$'
export default class Latex {
  constructor(src) {
    this.name = 'latex'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.value = '' + src
    }
  }

  parse(lexer) {
    lexer.token('$')
    lexer.escwithout('$', 'esc-latex', lexeme => {
      this.value = unescape(lexeme)
    })
    lexer.token('$')
  }

  toString() {
    return ['$', escape(this.value), '$'].join('')
  }

  toJSON() {
    const { name, value } = this
    return { name, value }
  }
}

/* Test */

/*
console.log(new Latex('$123 + 456$'))
*/
