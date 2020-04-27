const replaceWithLocation = require('./replace-with-location.js')

module.exports = ({path, types: t, styledIdentifier, state}) => {
  const cloneNode = t.cloneNode || t.cloneDeep

  if (
    path.node.tag.type !== 'Identifier' &&
    path.node.tag.type !== 'MemberExpression' &&
    path.node.tag.type !== 'CallExpression'
  )
    return null

  const str = path.get('quasi').get('quasis')[0].node.value.cooked
  const strLoc = path.get('quasi').node.loc

  if (path.node.tag.type === 'CallExpression') {
    replaceWithLocation(
      path.get('tag').get('callee'),
      cloneNode(styledIdentifier),
    )
    state.shouldImportStyled = true
  } else if (path.node.tag.type === 'MemberExpression') {
    replaceWithLocation(
      path.get('tag').get('object'),
      cloneNode(styledIdentifier),
    )

    state.shouldImportStyled = true
  }

  if (
    path.node.tag.type === 'CallExpression' ||
    path.node.tag.type === 'MemberExpression'
  ) {
    replaceWithLocation(
      path,
      t.callExpression(cloneNode(path.node.tag), [
        t.identifier('__twPlaceholder'),
      ]),
    )

    path = path.get('arguments')[0]
  }

  path.node.loc = strLoc

  return {str, path}
}
