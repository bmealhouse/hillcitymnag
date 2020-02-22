const babylon = require('@babel/parser')

module.exports = astify

function astify(literal, t) {
  if (literal === null) {
    return t.nullLiteral()
  }

  let ast
  switch (typeof literal) {
    case 'function':
      ast = babylon.parse(literal.toString(), {
        allowReturnOutsideFunction: true,
        allowSuperOutsideMethod: true,
      })

      return traverse.removeProperties(ast)
    case 'number':
      return t.numericLiteral(literal)
    case 'string':
      if (literal.startsWith('__computed__')) {
        return babylon.parseExpression(literal.slice(12))
      }

      return t.stringLiteral(literal)
    case 'boolean':
      return t.booleanLiteral(literal)
    case 'undefined':
      return t.unaryExpression('void', t.numericLiteral(0), true)
    default:
      if (Array.isArray(literal)) {
        return t.arrayExpression(literal.map(x => astify(x, t)))
      }

      try {
        return t.objectExpression(
          objectExpressionElements(literal, t, 'spreadElement'),
        )
      } catch (error) {
        return t.objectExpression(
          objectExpressionElements(literal, t, 'spreadProperty'),
        )
      }
  }
}

function objectExpressionElements(literal, t, spreadType) {
  return Object.keys(literal)
    .filter(k => {
      return typeof literal[k] !== 'undefined'
    })
    .map(k => {
      if (k.startsWith('__spread__')) {
        return t[spreadType](babylon.parseExpression(literal[k]))
      }

      const computed = k.startsWith('__computed__')
      const key = computed
        ? babylon.parseExpression(k.slice(12))
        : t.stringLiteral(k)
      return t.objectProperty(key, astify(literal[k], t), computed)
    })
}
