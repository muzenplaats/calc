import Lexer from '../Lexer'
import Scalar from './Scalar'

// Complex := 'c' real real 'i'
export default class Complex extends Scalar {
  constructor(src) {
    super()
    this.name = 'complex'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.re = +src.re
      this.im = +src.im
    }
  }

  parse(lexer) {
    lexer.token('c')
    lexer.token('real', lexeme => { this.re = +lexeme })
    lexer.token('real', lexeme => { this.im = +lexeme })
    lexer.token('i')
  }

  add(b) { return Complex.add(this, b) }
  sub(b) { return Complex.sub(this, b) }
  mul(b) { return Complex.mul(this, b) }
  div(b) { return Complex.div(this, b) }
  neg() { return Complex.neg(this) }

  toString() {
    return ['c', this.re, this.im >= 0 ? '+' : '', this.im, 'i'].join('')
  }


  toJSON() {
    const { name, re, im } = this
    return { name, re, im }
  }

  static add(a, b) {
    return new Complex({ re: a.re + b.re, im: a.im + b.im })
  }

  static sub(a, b) {
    return new Complex({ re: a.re - b.re, im: a.im - b.im })
  }

  static mul(a, b) {
    return new Complex({
      re: a.re * b.re - a.im * b.im,
      im: a.re * b.im + a.im * b.re
    })
  }

  static div(a, b) {
    // Todo
    // 1 / (re + im i) = (re - im i) / (re^2 im^2)
    return new Complex()
  }

  static neg(a) {
    return new Complex({ re: -a.re, im: -a.re })
  }
}


/* Test */
/*
const com = new Complex('c1.2-3.4i')
console.log(com, '' + com)
const com2 = new Complex('c-1.2+3.4i')
console.log(com2, '' + com2)
*/
