import Lexer from '../Lexer'

// Fanced blockquote
// '```' lang? SS NL mlwithout-'```' ````
export default class Blockquote {
  constructor(src) {
    this.name = 'blockquote'
    if (src instanceof Lexer) {
      this.parse(src)
    } else if (typeof src === 'string') {
      this.parse(new Lexer(src))
    } else {
      this.lang = ''
      this.value = '' + src
    }
  }

  parse(lexer) {
    lexer.token('```')
    lexer.optional('lang', lexeme => { this.lang = lexeme })
    lexer.skipSS()
    lexer.nextLine()
    lexer.mlwithout('```', lexeme => { this.value = lexeme })
    lexer.token('```')
  }

  toString() {
    return ['```', this.lang, '\n', this.value, '```'].join('')
  }

  toJSON() {
    const { name, lang, value } = this
    return { name, lang, value }
  }
}


/* Test */

// console.log('')
