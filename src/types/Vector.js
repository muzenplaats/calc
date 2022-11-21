import Lexer from '../Lexer'

// Vector := '[' WS ']' |
//           '[' WS scaler WS (','? WS scaler WS)* ']'
// (Matlab style)
export default class Vector {
  constructor(src) {
    this.name = 'vector'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.value = src.value
    }
  }

  parse(lexer) {
    this.value = []
    lexer.token('[')
    lexer.skipWhite()
    if (lexer.is(']')) { lexer.token(']'); return }

    lexer.token('scaler', lexeme => { this.value.push(+lexeme) })
    lexer.skipWhite()

    while (!lexer.is(']')) {
      lexer.optional(',')
      lexer.skipWhite()
      lexer.token('scaler', lexeme => { this.value.push(+lexeme) })
    }

    lexer.token(']')
  }

  toString() {
    const sep = ' '
    const strs = ['[']
    strs.push(this.value.join(sep))
    strs.push(']')
    return strs.join('')
  }

  toJSON() {
    const { name, value } = this
    return { name, value }
  }
}


/* Test */
/*
const vec = new Vector('[1, 2, 3 4 5 6]')
console.log(vec, '' + vec)
*/
