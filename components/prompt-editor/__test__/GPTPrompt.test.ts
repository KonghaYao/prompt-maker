import { describe, beforeEach, it, expect } from 'vitest'
import { GPTPromptController } from '../GPTPromptController'
import { GPTPromptElementType } from '../GPTTextType'

describe('GPTPromptController', () => {
  let gptPrompt: GPTPromptController
  const baseText = '<gpt-prompt id="123">Some text</gpt-prompt>'
  beforeEach(() => {
    gptPrompt = new GPTPromptController(baseText)
  })

  it('should set the text and convert it to inputs data', () => {
    expect(gptPrompt.text).toBe(baseText)
    const expectedData: GPTPromptElementType[] = [
      {
        id: '123',
        type: 'gpt-prompt',
        content: baseText,
        position: { start: 0, end: 43 },
        attributes: {
          id: '123'
        }
      }
    ]
    expect(gptPrompt.inputs).toEqual(expectedData)
  })

  it('should update the text and inputs data when setting a new text', () => {
    const newText = '<gpt-prompt id="322">New text</gpt-prompt>'
    gptPrompt.text = newText
    const expectedData: GPTPromptElementType[] = [
      {
        id: '322',
        type: 'gpt-prompt',
        content: newText,
        position: { start: 0, end: 42 },
        attributes: {
          id: '322'
        }
      }
    ]
    expect(gptPrompt.inputs).toEqual(expectedData)
  })

  it('should parse tag correct in complex context', () => {
    gptPrompt.text = "some text<gpt-prompt id='3'>New text</gpt-prompt>some text"
    const expectedData: GPTPromptElementType[] = [
      {
        id: '3',
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
