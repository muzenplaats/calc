import Lexer from '../Lexer'

// Helpers
const escape = (str, qMark) => str.replace(new RegExp(qMark, 'g'), '\\$&')
const unescape = str => str.replace(/\\/g, '')


// Text := '\'' without-'\'' '\'' |
//         '"' without-'"' '"'
export default class Text {
  constructor(src) {
    this.name = 'text'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string' ) {
      this.parse(new Lexer(src))
    } else {
      this.value = src.value
      this.qMark = src.qMark || '\''  // default
    }
  }

  parse(lexer) {
    if (lexer.is('\'')) {
      this.qMark = '\''
      lexer.token('\'')
      // if (lexer.is('$') this.value = new Latex(lexer)
      lexer.escwithout('\'', 'esc-sq', lexeme => {
        this.value = unescape(lexeme)
      })
      lexer.token('\'')
    } else if (lexer.is('"')) {
      this.qMark = '"'
      lexer.token('"')
      lexer.escwithout('"', 'esc-dq', lexeme => {
        this.value = unescape(lexeme)
      })
      lexer.token('"')
    } else {
      lexer.error('Invalid text')
    }
  }

  add(b) { return Text.add(this, b) }
  sub() { throw new Error('Unsupport \'-\' for text.') }
  mul() { throw new Error('Unsupport \'*\' for text.') }
  div() { throw new Error('Unsupport \'/\' for text.') }
  neg() { throw new Error('Unsupport \'-\' for text.') }

  toString() {
    const { qMark, value } = this
    return [qMark, escape(value, qMark), qMark].join('')
  }

  toJSON() {
    const { name, value, qMark } = this
    return { name, value, qMark }
  }

  static add(a, b) {
    return new Text({
      value: a.value + b.value,
      qMark: a.qMark
    })
  }
}


/* Test */
/*
const txt = new Text('\'"hi", \\\'there\\\'\'')
console.log(txt, '' + txt)
const txt2 = new Text('"\\"hi\\" \'there\'"')
console.log(txt2, '' + txt2)
*/
