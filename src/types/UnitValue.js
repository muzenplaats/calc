import Lexer from '../Lexer'
import Scalar from './Scalar'

class Converter {
  constructor(factors, base) {
    this.factors = factors
  }

  is(unit) {
    return typeof this.factors[unit] !== 'undefined'
  }

  value(val) {
    this.tmpValue = val
    return this
  }

  from(unit) {
    this.tmpUnit = unit
    return this
  }

  to(unit) {
    const { factors, tmpValue, tmpUnit } = this
    return tmpValue * factors[tmpUnit] /  factors[unit]
  }
}

const converters = {}

converters.length = new Converter({
  m: 1,
  dm: 1 / 10,
  cm: 1 / 100,
  mm: 1 / 1000,
  um: 1e-6,  // micro meter
  nm: 1e-9,
  'A^o': 1e-10,  // angstrom
  pm: 1e-12,
  am: 1e-15,
  inch: 2.54 / 100
}, 'm')

converters.mass = new Converter({
  kg: 1000,
  g: 1,
  mg: 1e-3,
  ug: 1e-6,  // micro gram
  pound: 453.59237
}, 'kg')

converters.time = new Converter({
  year: 86400 * 365.2422, years: 86400 * 365.2422,
  day: 86400, days: 86400, d: 86400,
  hour: 3600, hours: 3600, hr: 3600, hrs: 3600,
  minute: 60, minutes: 60, min: 60,
  second: 1, seconds: 1, sec: 1, s: 1,
  ms: 1 / 1000,
  us: 1e-6,  // micro second
  ns: 1e-9,
  ps: 1e-12,
  as: 1e-15
}, 's')

// Derrived units
// converters.area = {}
// ...
// converters.speed = {}
// converters.energy = {}
// ...


// Questions: what is the unit of null, {} and ''?

// UnitValue := real SS unit
export default class UnitValue extends Scalar {
  constructor(src) {
    super()
    this.name = 'unit-value'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.value = src.value
      this.unit = src.unit
    }

    this.setMeasure()
  }

  parse(lexer) {
    lexer.token('real', lexeme => { this.value = +lexeme })
    lexer.skipSS()
    lexer.token('unit', lexeme => { this.unit = lexeme.trim() })
  }

  setMeasure() {
    const { unit } = this
    if (converters.length.is(unit)) {
      this.measure = 'length'
    } else if (converters.mass.is(unit)) {
      this.measure = 'mass'
    } else if (converters.time.is(unit)) {
      this.measure = 'time'
    } else {
      throw new Error('Undefined unit: ' + unit)
    }
  }

  add(b) { return UnitValue.add(this, b) }
  sub(b) { return UnitValue.sub(this, b) }
  mul(b) { return UnitValue.mul(this, b) }
  div(b) { return UnitValue.div(this, b) }
  neg(b) { return UnitValue.neg(this) }

  toString() { return this.value + ' ' + this.unit }

  toJSON() {
    const { name, value, unit, measure } = this
    return { name, value, unit, measure }
  }

  // Result in the unit of a.
  static add(a, b) {
    const { value, unit, measure } = a
    if (b.measure !== measure) {
      throw new Error('Different measures of ' + measure + ' and ' + b.measure)
    }

    return new UnitValue({
      value: value + converters[measure].value(b.value).from(b.unit).to(unit),
      unit
    })
  }

  static sub(a, b) {
    return new UnitValue()
  }

  static mul(a, b) {
    return new UnitValue()
  }

  static div(a, b) {
    return new UnitValue()
  }

  static neg(a) {
    return new UnitValue({
      value: -a.value, unit: a.unit
    })
  }
}



/* Test */
/*
const uv = new UnitValue('1.2 m')
console.log(uv, '' + uv)
*/


/*
  ## Test ideas (raw)
  - I have a piece of apple (1 poa)
  - You have a bunch of bananas (1 bob)

  Exchange
  1 poa / 1 bob = 1/1 * poa/bob = 1 poa/bob per exchange
  2 poa / 1 bob = 2 poa/bob per exchange
  const exchange = (a, b, ratio) => near(a / b, ratio, 0.05)


  //////

  // A piece of apple equals to a piece of apple.
  1 poa = 1 poa  // exchangeable
  => 1 poa / 1 poa
  = 1/1 poa/poa  // ratio
  = 1/1
  // Convert the rational number (1/1) to the integer domain.
  = 1

  (1 poa / 1 poa) + (1 bob / 1 bob)
  ---------------   ---------------   // divisions A and B
  = 1/1 + 1/1
  = 1 + 1
  = 2  // an integer number

  = 1/1 + 1/1
  = (1 + 1) / 1  // numerator / denominator
  = 2/1
  = 2

  (1 poa / 1poa) + (2 bob / 1 bob)  // divisions A and B
  = 1/1 + 2/1
  = 1 + 2
  = 3

  = 1/1 + 2/1
  = (1 + 2) / 1
  = 3/1
  = 3

  // Repeating decimal as a rational number
      _
  x = 0.3 = 0.333333...
           _
  10 x = 3.3
             _     _
  => 9 x = 3.3 - 0.3 = 3
  => x = 3/9 = 1/3

  //////

  const MarketRatios = {  // MR
    // itemName: ratio
    rice: 0.5,
    flour: 1
  }

  // Helpers
  const near = (a, b, epsilon = 0.01) => Math.abs(a - b) <= epsilon

  // Deal with goods
  // 2 kg of rice per MR[rice] ~= 1 kg of flour per MR[flour]
  // The tolerance is for the weight ballance, quality of the good or others
  // return true/false
  const dealByBallance = (a, b, tolerance) => {
    return near(a * MarketRatios[a.itemName] /
               (b * MarketRatios[b.itemName]), 1, tolerance) ? 1 : 0
  }

  cosnt deal_1 = dealByBallance(2 kg of rice, 1 kg of flour, 0.001)
  console.log(deal_1)  // true

  //////

  // Deal things with fixed price.

  const accountingDetails = {
    'a package of cigerettes': {
      priceTag: '$4.95',  // market price
                          // v discount/gratis/...
                          // ^ inflation/...
      couponValue: {
        price: '$4.95',
        expireDate: '2023-4-26'
      },
      weight: '100 +/- 2 g',  // tolerance
      expiredDate: '2023-10-26'  // best before
      ...
    }
  }

  // The deal is assumed always successful because of the accounting and more
  // details are often clear between the saler and the buyers.
  const dealWithMoney = (a, money) => {
    const changes = money - accountingDetails[a]
    const invoice  // defined by the regulation
    const service  // provided
    return { changes, invoice, service }
  }

  const deal_2 = dealWithMoney('a package of cigerettes', '$5.00')
  console.log(deal_2)  // $0.05 (five cents)

  REM \pi = 3.141592654(1)
  REM Ref. pyramid, ..., fulerene
  REM e = 2.71828(1)
  REM Ref. ln(e) = 1
  REM y = 1 / x (Indifference curve for the individual economics)
  REM   \ y: quality
  REM   -.
  REM    | \ x: quantity
  REM    *
  REM y = (1, 2, 3, ..., n) / n, for n = 1--30
  REM Find the hyperbolic curves for the asymptotic approximation.
  REM Test y = a / x + b
  REM \./; ).(; ,|/; \/,; )|(; /|\
  REM                           .
  REM Select five key qualities for the role.
  REM name_a (***)   =========================
  REM name_b (***)   ===========================
  REM name_c (***)   ============================
  REM name_d (***)   ==========================
  REM name_e (***)   ========================
  REM        stars   strength
  REM or in polygon shape (ballance/lengths/area/...).
  REM It is for the fighting; not here. For a quest.
  REM (The fighting is not here; there.)
*/
