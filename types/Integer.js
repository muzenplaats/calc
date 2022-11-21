import Lexer from '../Lexer'
import Scalar from './Scalar'
import Rational from './Rational'
import Decimal from './Decimal'
import Real from './Real'
import Complex from './Complex'
import UnitValue from './UnitValue'
import Text from './Text'


// Integer := 'i' integer
export default class Integer extends Scalar {
  constructor(src) {
    super()
    this.name = 'integer'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.value = +src
    }
  }

  parse(lexer) {
    lexer.token('i')
    lexer.token('integer', lexeme => { this.value = +lexeme })
  }

  add(b) { return Integer.add(this, b) }
  sub(b) { return Integer.sub(this, b) }
  mul(b) { return Integer.mul(this, b) }
  div(b) { return Integer.div(this, b) }
  pow(b) { return Integer.pow(this, b) }
  neg() { return Integer.neg(this) }

  to(type) {
    const { value } = this
    switch (type) {
      case 'integer': return new Integer(value)
      case 'rational': return new Rational({ num: value, denom: 1 })
      case 'decimal': return new Decimal({ a: value, n: 0 })
      case 'real': return new Real({ value })
      case 'complex': return new Complex({ re: value, im: 0 })
      // case 'unit-value': return new UnitValue({ value, unit: '' })
      case 'text': return new Text({ value })
      default: throw new TypeError(`Cannot covert integer, ${this}, to type: ${type}.`)
    }
  }


  toString() { return 'i' + this.value }

  toJSON() {
    const { name, value } = this
    return { name, value }
  }


  static add(a, b) { return new Integer(a.value + b.value) }
  static sub(a, b) { return new Integer(a.value - b.value) }
  static mul(a, b) { return new Integer(a.value * b.value) }
  static div(a, b) { return new Integer(a.value / b.value) }
  static pow(a, b) { return new Integer(Math.pow(a.value, b.value)) }
  static neg(a) { return new Integer(-a.value) }
}


/* Test */
// const int = new Integer('i123')
// console.log(int, '' + int)
// const int2 = new Integer('i123456789')
// console.log(int2.to('integer'), int2.to('rational'), int2.to('decimal'), int2.to('real'), int2.to('complex'), int2.to('text'))
// int2.to('unknown')


