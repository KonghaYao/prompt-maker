export function parseTagAttributes (
  html: string,
  tagName: string
): { [key: string]: string } {
  const tagPattern = new RegExp(`<${tagName}([^>]*)>`, 'i')
  const attributePattern = /\b([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g

  const match = html.match(tagPattern)
  if (!match) {
    throw new Error(`Invalid HTML: <${tagName}> tag not found`)
  }

  const attributeString = match[1]
  const result: { [key: string]: string } = {}
  let attributeMatch
  while ((attributeMatch = attributePattern.exec(attributeString))) {
    const attributeName = attributeMatch[1]
    const attributeValue = attributeMatch[2] || attributeMatch[3]
    result[attributeName] = attributeValue
  }

  return result
}
