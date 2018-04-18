import * as htmlparser from 'htmlparser2'
import * as Selector from './selector'
import * as Tag from './tag'


const PARSER_OPTIONS = {
  decodeEntities: true
}


export function purify(html: string, selectorStrings: string[]): string {

  const selectors = selectorStrings.map(Selector.make)
  const nonIdSelectors = selectors.filter(s => !s.id)


  let level = 0
  let body = ''
  let isSkipped = false

  const parser = new htmlparser.Parser({

    onopentag(name: string, attr: any) {
      if (name == 'style') {
        console.log('style!!', name)
        isSkipped = true
        return
      }

      if (level > 0) {
        console.log('level gt 0', name)
        level += 1
        body += Tag.toString(name, attr)
        console.log('level gt 0 body is now!', body)
        return
      }

        const selectorsToCheck = !attr.id ? nonIdSelectors: selectors
        // let tagUsed = false

        for (let i = 0; i < selectorsToCheck.length; i++) {
          if (!Selector.isMatch(selectorsToCheck[i], name, attr)) continue
            level = 1
            console.log('selector match!', selectorsToCheck[i])
            console.log('match', name)
            body += Tag.toString(name, attr)
            console.log('body is now!', body)
        }

    },

    ontext(text: string) {
      if (!isSkipped && level > 0) {
        body += text
      }
    },

    onclosetag(name: string) {
      if (isSkipped && name == 'style') {
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