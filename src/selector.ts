import {
  ISelector
} from './types'


export function make(selectorString: string): ISelector {
  let type = 'tag'

  const result: ISelector = {}

  for (let c of selectorString) {

    if (c == '#') {
      type = 'id'
      continue
    }

    if (c == '.') {
      type = 'class'
      continue
    }

    if (!result[type]) {
      result[type] = ''
    }

    result[type] += c
  }

  return result
}


export function isMatch(selector: ISelector, name: string, attr: any): boolean {
  if (selector.id && attr && selector.id != attr.id) {
    return false
  }

  if (selector.class && attr && (!attr.class || !attr.class.includes(selector.class))) {
    return false
  }

  if (selector.tag && selector.tag != name) {
    return false
  }

  return true
}