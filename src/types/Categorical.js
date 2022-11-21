import Lexer from '../Lexer'

export default class Categorical {
  constructor(src) {
    this.name = 'categorical'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.value = src.value
    }
  }

  toString() {}

  toJSON() {
    const { name, value } = this
    return { name, value }
  }
}
