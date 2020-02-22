module.exports = function assignify(objAst, t) {
  if (objAst.type !== 'ObjectExpression') return objAst

  const cloneNode = t.cloneNode || t.cloneDeep
  const currentChunk = []
  const chunks = []

  objAst.properties.forEach(property => {
    if (property.type === 'SpreadElement') {
      if (currentChunk.length > 0) {
        chunks.push(cloneNode(t.objectExpression(currentChunk)))
        currentChunk.length = 0
      }

      chunks.push(cloneNode(property.argument))
    } else {
      property.value = assignify(property.value, t)
      currentChunk.push(property)
    }
  })

  if (chunks.length === 0) return objAst

  if (currentChunk.length > 0) {
    chunks.push(cloneNode(t.objectExpression(currentChunk)))
  }

  return t.callExpression(
    t.memberExpression(t.identifier('Object'), t.identifier('assign')),
    chunks,
  )
}
