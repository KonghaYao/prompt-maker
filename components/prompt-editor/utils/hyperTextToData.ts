import { GPTPromptElementType } from '../GPTTextType'
import { parseTagAttributes } from './parseTagAttributes'

export const hyperTextToData = (hyperText: string): GPTPromptElementType[] => {
  const regex = /<gpt-prompt[^>]*?>.*?<\/gpt-prompt>/g
  const collection: GPTPromptElementType[] = []
  let last = null
  do {
    last = regex.exec(hyperText)
    if (last) {
      const end = last.index + last[0].length
      const attributes = parseTagAttributes(last[0], 'gpt-prompt')
      collection.push({
        id: attributes.id,
        type: 'gpt-prompt',
        position: { start: last.index, end },
        attributes,
        content: last[0]
      })
    }
  } while (last)
  return collection
}
