import * as htmlparser from 'htmlparser2'
import * as Selector from './selector'
import * as Tag from './tag'


const PARSER_OPTIONS = {
  decodeEntities: true
}


export function select(html: string, selectorStrings: string[]): string {

  const selectors = selectorStrings.map(Selector.make)
  const nonIdSelectors = selectors.filter(s => !s.id)


  let level = 0
  let body = ''
  let isSkipped = false

  const parser = new htmlparser.Parser({

    onopentag(name: string, attr: any) {
      if (name == 'script' || name == 'style') {
        isSkipped = true
        return
      }

      if (level > 0) {
        level += 1
        body += Tag.toString(name, attr)

      } else {

        const selectorsToCheck = !attr.id ? nonIdSelectors: selectors

        for (let i = 0; i < selectorsToCheck.length; i++) {
          if (Selector.isMatch(selectorsToCheck[i], name, attr)) {
            level = 1
            body += Tag.toString(name, attr)
            continue
          }
        }

      }
    },

    ontext(text: string) {
      if (!isSkipped && level > 0) {
        body += text
      }
    },

    onclosetag(name: string) {
      if (isSkipped && (name == 'script' || name == 'style')) {
        isSkipped = false
        return
      }

      if (level > 0) {
        body += Tag.toString(name, {}, true)
        level -= 1
      }
    }

  }, PARSER_OPTIONS)

  parser.write(html)
  parser.end()

  return body
}