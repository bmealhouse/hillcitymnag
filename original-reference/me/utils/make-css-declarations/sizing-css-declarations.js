import {spacing} from '../../theme'

const result = Object.entries(spacing).reduce(
  (cssDeclarations, [scale, value]) => {
    cssDeclarations[`w-${scale}`] = `width: ${value};`
    cssDeclarations[`h-${scale}`] = `height: ${value};`
    return cssDeclarations
  },
  {},
)

export default result
