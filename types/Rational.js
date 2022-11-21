import Lexer from '../Lexer'
import { lcm, hcf } from '../helpers'
import Scalar from './Scalar'

// Rational := 'r' integer
// E.g., r1/3 and r-3/2
export default class Rational extends Scalar {
  constructor(src) {
    super()
    this.name = 'rational'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.num = +src.num
      this.denom = +src.denom
    }
  }

  get value() { return this.num / this.denom }
  set value(val) { /* Todo */ }

  parse(lexer) {
    lexer.token('r')
    lexer.token('integer', lexeme => { this.num = +lexeme })
    lexer.token('/')
    lexer.token('integer', lexeme => { this.denom = +lexeme })
  }

  add(b) { return Rational.add(this, b) }
  sub(b) { return Rational.sub(this, b) }
  mul(b) { return Rational.mul(this, b) }
  div(b) { return Rational.div(this, b) }
  neg() { return Rational.neg(this) }

  to(type) {
    const { num, denom, value } = this
    switch (type) {
      case 'integer':
        if (denom === 1) return new Integer(value)
        throw new Error(`Converting ${this} to integer is invalid.`)
      case 'rational':
        return new Rational({ num, denom })
      case 'decimal':
// // ?        if (denom % )
//         return new Decimal({ a: value, n: 0 })
//         throw new Error(`Converting ${this} to decimal is invalid.`)
      case 'real':
        return new Real({ value })
      case 'complex':
        return new Complex({ re: value, im: 0 })
      // case 'unit-value': return new UnitValue({ value, unit: '' })
      case 'text':
        return new Text('' + this)
      default: throw new TypeError(`Cannot covert rational, ${this}, to type: ${type}.`)
    }
  }


  toString() { return 'r' + this.num + '/' + this.denom }

  toJSON() {
    const { name, num, denom } = this
    return { name, num, denom }
  }

  // num_a  +  num_b  =  num_a * den_b + num_b * den_a
  // den_a     den_b         den_a * den_b
  static add(a, b) {
    const { num, denom } = a
    const { num: num_b, denom: denom_b } = b
    return new Rational({
      num: num * denom_b + num_b * denom,
      denom: denom * denom_b
    })
  }

  static sub(a, b) {
    const { num, denom } = a
    const { num: num_b, denom: denom_b } = b
    return new Rational({
      num: num * denom_b - num_b * denom,      // <- (-)
      denom: denom * denom_b
    })
  }

  // num_a  *  num_b
  // den_a     den_b
  // (todo: lcm())
  static mul(a, b) {
    const { num, denom } = a
    const { num: num_b, denom: denom_b } = b
    return new Rational({
      num: num * num_b,
      denom: denom * denom_b
    })
  }

  static div(a, b) {
    const { num, denom } = a
    const { num: num_b, denom: denom_b } = b
    return new Rational({
      num: num * denom_b,
      denom: denom * num_b
    })
  }

  static neg(a) {
    return new Real({ num: -a.num, denom: a.denom })
  }
}


/* Test */
/*
const rat = new Rational('r2/3')
console.log(rat, '' + rat)
const rat2 = new Rational('r-5/6')
console.log(rat2, '' + rat2)
*/
