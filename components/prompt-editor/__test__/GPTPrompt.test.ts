import { describe, beforeEach, it, expect } from 'vitest'
import { GPTPromptController } from '../GPTPromptController'
import { GPTPromptElementType } from '../GPTTextType'

describe('GPTPromptController', () => {
  let gptPrompt: GPTPromptController

  beforeEach(() => {
    gptPrompt = new GPTPromptController('<gpt-prompt>Some text</gpt-prompt>')
  })

  it('should set the text and convert it to inputs data', () => {
    expect(gptPrompt.text).toBe('<gpt-prompt>Some text</gpt-prompt>')
    const expectedData: GPTPromptElementType[] = [
      {
        type: 'gpt-prompt',
        content: '<gpt-prompt>Some text</gpt-prompt>',
        position: { start: 0, end: 34 },
        attributes: {}
      }
    ]
    expect(gptPrompt.inputs).toEqual(expectedData)
  })

  it('should update the text and inputs data when setting a new text', () => {
    gptPrompt.text = '<gpt-prompt>New text</gpt-prompt>'
    const expectedData: GPTPromptElementType[] = [
      {
        type: 'gpt-prompt',
        content: '<gpt-prompt>New text</gpt-prompt>',
        position: { start: 0, end: 33 },
        attributes: {}
      }
    ]
    expect(gptPrompt.inputs).toEqual(expectedData)
  })

  it('should parse tag correct in complex context', () => {
    gptPrompt.text = "some text<gpt-prompt id='3'>New text</gpt-prompt>some text"
    const expectedData: GPTPromptElementType[] = [
      {
        type: 'gpt-prompt',
        content: "<gpt-prompt id='3'>New text</gpt-prompt>",
        position: { start: 9, end: 49 },
        attributes: {
          id: '3'
        }
      }
    ]
    expect(gptPrompt.inputs).toEqual(expectedData)
  })

  it('should parsed tag attributes', () => {
    gptPrompt.text = "<gpt-prompt id='2003' default=\"2012\">New text</gpt-prompt>"
    const attrs = {
      id: '2003',
      default: '2012'
    }
    expect(gptPrompt.inputs[0].attributes).eql(attrs)
  })
})
