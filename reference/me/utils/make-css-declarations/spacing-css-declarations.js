import {spacing} from '../../theme'
import makeResponsiveCssDeclarations from './make-responsive-css-declarations'

export default makeResponsiveCssDeclarations(
  Object.entries(spacing).reduce((cssDeclarations, [scale, value]) => {
    cssDeclarations[`p-${scale}`] = `padding: ${value};`
    cssDeclarations[
      `py-${scale}`
    ] = `padding-top: ${value}; padding-bottom: ${value};`
    cssDeclarations[
      `px-${scale}`
    ] = `padding-right: ${value}; padding-left: ${value};`
    cssDeclarations[`pt-${scale}`] = `padding-top: ${value};`
    cssDeclarations[`pr-${scale}`] = `padding-right: ${value};`
    cssDeclarations[`pb-${scale}`] = `padding-bottom: ${value};`
    cssDeclarations[`pl-${scale}`] = `padding-left: ${value};`
    cssDeclarations[`m-${scale}`] = `margin: ${value};`
    cssDeclarations[
      `my-${scale}`
    ] = `margin-top: ${value}; margin-bottom: ${value};`
    cssDeclarations[
      `mx-${scale}`
    ] = `margin-right: ${value}; margin-left: ${value};`
    cssDeclarations[`mt-${scale}`] = `margin-top: ${value};`
    cssDeclarations[`mr-${scale}`] = `margin-right: ${value};`
    cssDeclarations[`mb-${scale}`] = `margin-bottom: ${value};`
    cssDeclarations[`ml-${scale}`] = `margin-left: ${value};`
    return cssDeclarations
  }, {}),
)
