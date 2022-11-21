import Lexer from '../Lexer'
import Scalar from './Scalar'

// Consideration
// Add this.bar

// Decimal := 'd' integer ('.' digits)?
// value = a / 10^n
export default class Decimal extends Scalar {
  constructor(src) {
    super()
    this.name = 'decimal'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.a = +src.a
      this.n = +src.n
    }
  }

  get num() { return this.a }
  get denom() { return Math.pow(10, this.n) }
  get value() { return this.num / this.denom }

  parse(lexer) {
    lexer.token('d')
    lexer.token('integer', lexeme => { this.a = +lexeme })
    this.n = 0

    if (lexer.is('.')) {
      let fracStr
      lexer.token('.')
      lexer.token('digits', lexeme => { fracStr = lexeme })
      this.n = fracStr.length
      this.a = this.a * Math.pow(10, this.n) +
               (this.a >= 0 ? +fracStr : -fracStr)
    }
  }

  add(b) { return Decimal.add(this, b) }
  sub(b) { return Decimal.sub(this, b) }
  mul(b) { return Decimal.mul(this, b) }
  div(b) { return Decimal.div(this, b) }
  neg() { return Decimal.neg(this) }

  toString() {
    const str = '' + this.a
    const { length } = str
    const intStr = str.substring(0, length - this.n)
    const fracStr = str.substring(length - this.n)
    return this.n  === 0 ? 'd' + str : ['d', intStr, '.', fracStr].join('')
  }

  toJSON() {
    const { name, a, n } = this
    return { name, a, n }
  }

  static add(a, b) {
    // Todo
    return Decimal()
  }

  static sub(a, b) {
    // Todo
    return Decimal()
  }

  static mul(a, b) {
    // Todo
    return Decimal()
  }

  static div(a, b) {
    // Todo
    return Decimal()
  }

  static neg(a) {
    return new Real({ a: -a.a, n: a.n })
  }
}


/* Test */
/*
const dec = new Decimal('d123.45678')
console.log(dec, '' + dec)
const dec2 = new Decimal('d-123')
console.log(dec2, '' + dec2)
const dec3 = new Decimal('d-123.45678')
console.log(dec3, '' + dec3)
const dec4 = new Decimal('d-12.00')
console.log(dec4, '' + dec4)
*/
