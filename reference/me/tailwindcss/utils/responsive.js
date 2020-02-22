import {css} from 'styled-components'
import {screens} from '../config'

export default propCssMap => {
  return Object.keys(propCssMap).reduce((responsiveCss, prop) => {
    for (const [breakpoint, screenSize] of Object.entries(screens)) {
      responsiveCss[`${breakpoint}-${prop}`] = css`
        @media (min-width: ${screenSize}) {
          ${propCssMap[prop]};
        }
      `
    }

    return responsiveCss
  }, propCssMap)
}
