import Lexer from '../Lexer'
import Scalar from './Scalar'

// Real := real
export default class Real extends Scalar {
  constructor(src) {
    super()
    this.name  = 'real'
    if (src instanceof Lexer)  {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.value = +src
    }
  }

  parse(lexer) {
    lexer.token('real', lexeme => { this.value = +lexeme })
  }

  add(b) { return Real.add(this, b) }
  sub(b) { return Real.sub(this, b) }
  mul(b) { return Real.mul(this, b) }
  div(b) { return Real.div(this, b) }
  pow(b) { return Real.pow(this, b) }
  neg() { return Real.neg(this) }


  toString() { return '' + this.value }

  toJSON() {
    const { name, value } = this
    return { name, value }
  }


  static add(a, b) { return new Real(a.value + b.value) }
  static sub(a, b) { return new Real(a.value - b.value) }
  static mul(a, b) { return new Real(a.value * b.value) }
  static div(a, b) { return new Real(a.value / b.value) }
  static pow(a, b) { return new Real(Math.pow(a.value, b.value)) }
  static neg(a) { return new Real(-a.value) }
}


/* Test */
/*
const re = new Real('-123.456e+2')
console.log(re, '' + re)
*/
