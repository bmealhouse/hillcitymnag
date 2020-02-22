import boxSizingCssDeclarations from './box-sizing-css-declarations'
import displayCssDeclarations from './display-css-declarations'
import flexCssDeclarations from './flex-css-declarations'
import flexItemCssDeclarations from './flex-item-css-declarations'
import sizingCssDeclarations from './sizing-css-declarations'
import spacingCssDeclarations from './spacing-css-declarations'

export default cssDeclarations => {
  const commonCssDeclarations = {
    ...cssDeclarations,
    ...boxSizingCssDeclarations,
    ...displayCssDeclarations,
    ...flexItemCssDeclarations,
    ...sizingCssDeclarations,
    ...spacingCssDeclarations,
  }

  return props =>
    Object.keys(props).reduce((styles, prop) => {
      if (typeof props[prop] !== 'boolean') {
        return styles
      }

      let cssDeclaration = commonCssDeclarations[prop] || ''
      if (!cssDeclaration && props.flex) {
        cssDeclaration = flexCssDeclarations[prop] || ''
      }

      return styles + cssDeclaration
    }, '')
}
