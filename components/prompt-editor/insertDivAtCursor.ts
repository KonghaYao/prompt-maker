export function insertDivAtCursor (id: string) {
  // 获取当前选中的文字范围
  const selection = window.getSelection()
  if (!selection) { return }
  const range = selection.getRangeAt(0)
  const node = range.startContainer
  const start = range.startOffset
  const end = range.endOffset
  const text = start < end ? node.textContent?.slice(start, end) : ''

  // 创建一个新的div元素
  const span = document.createElement('span')
  span.id = id
  span.setAttribute('contenteditable', 'false')

  // 在当前位置插入新的div元素
  if (node.nodeType === Node.TEXT_NODE) {
    const p = node.parentNode!
    const content = node.textContent!
    let side = node.nextSibling
    if (start < content.length) {
      node.textContent = content!.slice(0, start)
      const rightText = new Text(content!.slice(end))
      p.insertBefore(rightText, node.nextSibling)
      side = rightText
    }
    p.insertBefore(span, side)
    selection.collapse(node, node.textContent!.length)
  } else {
    // 如果当前位置是元素节点，则将div元素插入到指定偏移量处
    node.insertBefore(span, node.childNodes[start])
  }

  return { span, text }
}
