import {screens} from '../../theme'

export default cssDeclarations =>
  Object.keys(cssDeclarations).reduce((responsiveCssDeclarations, prop) => {
    for (const [breakpoint, screenSize] of Object.entries(screens)) {
      responsiveCssDeclarations[
        `${breakpoint}-${prop}`
      ] = `@media(min-width: ${screenSize}) { ${cssDeclarations[prop]} }`
    }

    return responsiveCssDeclarations
  }, cssDeclarations)

// export const screens = {
//   sm: '640px',
//   md: '768px',
//   lg: '1024px',
//   xl: '1280px',
// }
