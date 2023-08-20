import type { GPTInputDOM, IInputType } from './GPTTextType'
import { hyperTextToData } from './utils/hyperTextToData'

export class GPTPromptTransform {
/** 最终将数据转化为可使用文本 */
  static toText (realData: (string | IInputType)[]) {
    return realData.map((i) => {
      if (typeof i === 'string') { return i }
      return i.value
    }).join('')
  }

  /** 最终将数据转化为存储文本 */
  static toStorageString (realData: (string | GPTInputDOM)[]) {
    return realData.map((i) => {
      if (typeof i === 'string') { return i }
      return this.promptCellToString(i)
    }).join('')
  }

  /** 存储文本转化为数据类型 */
  static storageStringInput (text: string) {
    const data = hyperTextToData(text)
    const collection: (string | GPTInputDOM)[] = []
    let lastEndPoint = 0

    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      if (lastEndPoint !== element.position.start) {
        collection.push(text.slice(lastEndPoint, element.position.start))
      }
      lastEndPoint = element.position.end
      collection.push(element.attributes as GPTInputDOM)
    }
    const tail = text.slice(lastEndPoint)
    return tail ? [...collection, tail] : collection
  }

  static promptCellToString (input: GPTInputDOM) {
    const item = document.createElement('gpt-prompt')
    const exceptAttr: (keyof GPTInputDOM)[] = ['el']
    Object.entries(input).forEach(([key, val]) => {
      if (exceptAttr.includes(key as (keyof GPTInputDOM))) { return }
      item.setAttribute(key, val)
    })
    return item.outerHTML
  }
}
