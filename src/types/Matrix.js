import Lexer from '../Lexer'

// Matrix := '[' ']'
// E.g., [1 2 3; 4 5 6]  // Matlab style
export default class Matrix {
  constructor(src) {
    this.name = 'matrix'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
       this.value = src.value
    }
  }

  parse(lexer) {
    Lexer.token('[')

    Lexer.token(']')
  }

  toString() {}

  toJSON() {
    const { name, value } = this
    return { name, value }
  }
}
