import Lexer from './Lexer'

import Scalar from './types/integer'
import Integer from './types/integer'
import Rational from './types/Rational'
import Decimal from './types/Decimal'
import Real from './types/Real'
import Complex from './types/Complex'
import UnitValue from './types/UnitValue'
import Text from './types/Text'
import Latex from './types/Latex'
import Blockquote from './types/Blockquote'

import Vector from './types/Vector'
import Matrix from './types/Matrix'

import { sum, average, range, linspace } from './helpers'


const { E, LN2, LN10, LOG2E, LOG10E, PI, SQRT1_2, SQRT2 } = Math
const constants = {
  E, LN2, LN10, LOG2E, LOG10E,
  PI: new Real(PI),
  SQRT1_2, SQRT2
}

const {
  abs, acos, acosh, asin, asinh, atan, atanh, atan2,
  cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot,  imul,
  log, log1p, log10, log2, max, min, pow, random, round,
  sign, sin, sinh, sqrt, tan, tanh, trunc
} = Math
const functions = {
  abs, acos, acosh, asin, asinh, atan, atanh, atan2,
  cbrt, ceil, clz32, cos, cosh, exp, expm1, floor, fround, hypot,  imul,
  log, log1p, log10, log2, max, min, pow, random, round,
  sign, sin, sinh, sqrt, tan, tanh, trunc,
  sum, average, linspace
}


// Calculator := WS (Assignment | Expression)*
export default class Calculator {
  constructor(src)  {
    this.name = 'calulator'
    this.src = src
    this.env = {}
    this.parse(new Lexer(src))
  }

  parse(lexer) {
    lexer.skipWhite()
    while (!lexer.eof) {
      if (lexer.is('assignment')) {
        this.parseAssignment(lexer)
      } else {
        this.env.ans = this.parseExpression(lexer)
      }
    }
  }

  // Assignment := ident SS '=' WS Expression
  parseAssignment(lexer) {
    let name
    lexer.token('ident', lexeme => { name = lexeme })
    lexer.skipSS()
    lexer.token('=')
    lexer.skipWhite()
    this.env[name] = this.parseExpression(lexer)
    this.env.ans = this.env[name]
  }

  // Experession := create-vector
  parseExpression(lexer) {
    return this.parseCreateVector(lexer)
  }

  // create-vector := expr (':' WS expr (':' WS expr)?)?
  //                  begin        step         end
  parseCreateVector(lexer) {
    let begin, step, end
    begin = this.parseExpr(lexer)
    if (!lexer.is(':')) return begin

    lexer.token(':')
    lexer.skipWhite()
    step = this.parseExpr(lexer).value
    if (lexer.is(':')) {
      lexer.token(':')
      lexer.skipWhite()
      end = this.parseExpr(lexer).value
    }
    if (typeof end === 'undefined') { end = step; step = 1 }
    return range(begin.value, step, end)
  }

  // Expr := Term (addop WS Term)*
  parseExpr(lexer) {
    let value = this.parseTerm(lexer)

    while (lexer.is('addop')) {
      lexer.token('addop', lexeme => {
        lexer.skipWhite()
        if (lexeme === '+') {
          value = Calculator.add(value, this.parseTerm(lexer))
        } else {
          value = Calculator.sub(value, this.parseTerm(lexer))
        }
      })
    }

    return value
  }

  // Term := Factor (mulop WS Factor)*
  parseTerm(lexer) {
    let value = this.parseFactor(lexer)

    while (lexer.is('mulop')) {
      lexer.token('mulop', lexeme => {
        lexer.skipWhite()
        if (lexeme === '*') {
          value = Calculator.mul(value, this.parseFactor(lexer))
        } else {
          value = Calculator.div(value, this.parseFactor(lexer))
        }
      })
    }

    return value
  }

  // Factor := Value WS (powop WS Value WS)*
  parseFactor(lexer) {
    let value = this.parseValue(lexer)
    lexer.skipWhite()
    while (lexer.is('powop')) {
      lexer.token('powop')
      lexer.skipWhite()
      value = Calculator.pow(value, this.parseValue(lexer))
      lexer.skipWhite()
    }
    return value
  }

  // Value := sign? (Function | paren | types | ident
  //          ) '!'?
  // paren := '(' WS Expression ')'
  parseValue(lexer) {
    let value
    let sign

    lexer.optional('sign', lexeme => { sign = lexeme })

    if (lexer.is('function')) {
      value = this.parseFunction(lexer)
    } else if (lexer.is('paren')) {
      lexer.token('(')
      lexer.skipWhite()
      value = this.parseExpression(lexer)
      lexer.token(')')
    } else if (lexer.is('types')) {
      value = this.parseTypes(lexer)
    } else if (lexer.is('ident')) {
      value = this.parseIdent(lexer)
    } else {
      lexer.error('Invalid value')
    }

    if (sign === '-') value = Calculator.neg(value)

    return value
  }

  // Function := ident SS '(' WS arg-list ')'
  // arg-list := '' | Expression (',' WS Expression)*
  parseFunction(lexer) {
    let name
    let argList = []
    lexer.token('ident', lexeme => { name = lexeme })
    lexer.skipSS()
    lexer.token('(')
    lexer.skipWhite()

    if (!lexer.is(')')) {
      argList.push(this.parseExpression(lexer))
      while (lexer.is(',')) {
        lexer.token(',')
        lexer.skipWhite()
        argList.push(this.parseExpression(lexer))
      }
    }

    lexer.token(')')

    // Convert types to JS number for the argList
    // Supported types: Integer, Rational, Decimal, Real
    // Some functions such as sin() can have Complex (not implemented yet).
    // The result is coerced to be Real.
    argList = argList.map(tval => tval.value)
    let num =  Calculator.functions[name].apply(null, argList)
    return new Real(num)
  }

  parseTypes(lexer) {
    if (lexer.is('i')) return new Integer(lexer)
    if (lexer.is('d')) return new Decimal(lexer)
    if (lexer.is('r')) return new Rational(lexer)
    if (lexer.is('c')) return new Complex(lexer)
    if (lexer.is('unit-value')) return new UnitValue(lexer)
    if (lexer.is('real')) return new Real(lexer)
    if (lexer.is('text')) return new Text(lexer)
    if (lexer.is('latex')) return new Latex(lexer)
    if (lexer.is('blockquote')) return new Blockquote(lexer)
    if (lexer.is('vector')) return new Vector(lexer)
    if (lexer.is('matrix')) return new Matrix(lexer)
    lexer.error('Type error')
  }

  parseIdent(lexer) {
    let name
    lexer.token('ident', lexeme => { name = lexeme })
    let value = this.env[name]
    if (typeof value === 'undefined') value = Calculator.constants[name]
    if (typeof value === 'undefined') {
      lexer.error('Undefined variable: ' + name)
    }
    return value
  }

  toString() {}

  toJSON() {
    const { name, src, env } = this
    return { name, src, env }
  }


  static constants = constants
  static functions = functions


  // In this version, for the same type of a and b only
  // (2022-10-31 short test for mixed types)

  static add(a, b) {
    if (a.name === 'text') return a.add(b)
    return Scalar.tmpAdd(a, b)
    // return a.add(b)
  }

  static sub(a, b) {
    return a.sub(b)
  }

  static mul(a, b) {
    return a.mul(b)
  }

  static div(a, b) {
    return a.div(b)
  }

  static pow(a, b) {
    return a.pow(b)
  }

  static neg(a) {
    return a.neg()
  }
}





