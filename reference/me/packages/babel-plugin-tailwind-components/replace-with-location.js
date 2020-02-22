module.exports = (path, replacement) => {
  const {loc} = path.node
  const newPaths = path.replaceWith(replacement)

  if (Array.isArray(newPaths)) {
    newPaths.forEach(p => {
      p.node.loc = loc
    })
  }

  return newPaths
}
