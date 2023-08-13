import { GPTPromptElementType } from './GPTTextType'
import { hyperTextToData } from './utils/hyperTextToData'

export class GPTPromptController {
  private originText = ''
  inputs: GPTPromptElementType[] = []
  data = []
  set text (text: string) {
    this.originText = text
    this.inputs = hyperTextToData(text)
  }

  get text () {
    return this.originText
  }

  constructor (hyperText: string) {
    this.text = hyperText
  }

  toString () {

  }
}
