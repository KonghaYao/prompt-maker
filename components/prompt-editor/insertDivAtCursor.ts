export function insertDivAtCursor (id: string) {
  // 获取当前选中的文字范围
  const selection = window.getSelection()
  if (!selection) { return }
  const range = selection.getRangeAt(0)
  const node = range.startContainer
  const offset = range.startOffset

  // 创建一个新的div元素
  const span = document.createElement('span')
  span.id = id
  span.setAttribute('contenteditable', 'false')
  span.textContent = 'xxx'

  // 在当前位置插入新的div元素
  if (node.nodeType === Node.TEXT_NODE) {
    // 如果当前位置是文本节点，则将div元素插入到文本节点的父节点中
    node.parentNode!.insertBefore(span, node.nextSibling)
  } else {
    // 如果当前位置是元素节点，则将div元素插入到指定偏移量处
    node.insertBefore(span, node.childNodes[offset])
  }
  return span
}
