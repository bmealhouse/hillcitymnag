import boxSizing from './box-sizing'
import display from './display'
import flex from './flex'
import flexItem from './flex-item'
// import layout from './layout'
import sizing from './sizing'
// import spacing from './spacing'

const tailwindcss = {
  ...boxSizing,
  ...display,
  ...flexItem,
  ...sizing, // TODO
  // ...spacing, // TODO
}

export default props => {
  return Object.keys(props).reduce((styles, prop) => {
    if (typeof props[prop] !== 'boolean') {
      return styles
    }

    let css = tailwindcss[prop] || ''
    if (!css && props.flex) {
      css = flex[prop] || ''
    }

    return styles + css
  }, '')
}
