
/* sketch

// All scalar number types are implement in the JavaScript standard number (IEEE).
// The overflow or other errors is not covered in brief.
complex = { re: 123.456, im: 0 }
real  = { value: 123.456e7 }
decimal  = { a: 123456, b: 3, get value() => 123.456 })  // 123.456
rational  = { num: 123456, denom: 1000, get value() => 123.456 }
integer = { value: undefined }
unitValue = { value: 123.456, unit: null }

*/

/* Test
  ```
  From type to type                                // Other way around
  -----------------------------------------------------------------------------
  text not supported                           .   // toString() (all to text)
  complex to real, decimal or unitValue when re0   // all* to complex
          isRational? isInteger? Or undefined
  real to complex, decimal+ or unitValue           // all* to real
          isRational? isInteger? Or undefined      // except C { re:!0 } to real
  decimal to, (similar as real)
  rational to, (similar as above)
  integer to, (similar as above)
  unitValue to, same as real when {unit: null}
  -----------------------------------------------------------------------------
  *All except when the unit is not null; undefined. when { unit: null }
  +Valid in this implementation by the JavaScript number (IEEE floating point).
  ```

Psuedo code

Data cleansing
Scalar.isUndefined() {
  assert:
  Complex { re: NaN or ANY, im: ANY or NaN }
  Real { value: NaN }
  Decimal { a: NaN, n: ANY }
  Rational { num: NaN, denom: ANY }
  Integer { value NaN }
  UnitValue { value: NaN, unit: ANY }
}


Scalar.add, sub, mul, div, neg()
*/


const HIERARCHY = {
  integer: 1, rational: 2, decimal: 3, real: 4, complex: 5, 'unit-value': 6
}  // or move to each class
   // 1 integer is also 2 rational 3 decimal 4 real 5 complex  // or 6 unit-value
   // 2 rational is also 4 real 5 complex; sometimes 1 integer 3 decimal
   // 3 decimal is also 2 rational 4 real or 5 complex
   // 4 real is also 5 complex; sometimes 1 2 3
   // 5 complex is sometimes 1 2 3 4
   // 1 -> 2, 3, 4, 5
   // 2 -> 4, 5
   // 3 -> 2 (valid by impl. spec.), 4, 5
   // 4 -> 5

// The limitation here is by the IEEE floating point spec.
// (This is not difficult to extend it (more complicated) for you.)
// The values are not intended to be validated in this calc.
// For example, it is possible to approximate 0.3333333 to r1/3 but this is not
// interested here.                    _
// But the repeating decimal, e.g., d0.3 -> r1/3 is possibly interested
// because the bar means that it is a rational number for inf rep. of fraction.



// Scalar (abstract class of the scalar numbers)
export default class Scalar {
  constructor() {
    this.name = 'scalar'
  }

  get h() { return HIERARCHY[this.name] }
  get hierarchy() { return this.h }

  is(typeName) { return typeName  === this.name }
  to(typeName) { throw new Error('Undefined yet.')}

  // Interface
  add(b) { throw new Error('Not implemented')}
  sub(b) { throw new Error('Not implemented')}
  mul(b) { throw new Error('Not implemented')}
  div(b) { throw new Error('Not implemented')}
  neg() { throw new Error('Not implemented')}


  static tmpAdd(a, b) {
    if (a.h === b.h) return a.add(b)

    // Temp. (for integers only)
    // Coerce the integer to the type as aother.
    // .'. a or b -> same type
    const highH = Math.max(a.h, b.h)
    if (a.h < highH) {
      a = a.to(b.name)
    } else {
      b = b.to(a.name)
    }

    return a.add(b)
  }

  static sub(a, b) {

  }

  static mul(a, b) {

  }

  static div(a, b) {

  }

  static neg(a) {
    return a.neg()
  }
}
