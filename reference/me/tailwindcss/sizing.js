import {css} from 'styled-components'
import {spacing} from './config'
import responsive from './utils/responsive'

export default responsive({
  ...Object.entries({
    auto: 'auto',
    ...spacing,
    // '1/2': '50%',
    // '1/3': '33.333333%',
    // '2/3': '66.666667%',
    // '1/4': '25%',
    // '2/4': '50%',
    // '3/4': '75%',
    // '1/5': '20%',
    // '2/5': '40%',
    // '3/5': '60%',
    // '4/5': '80%',
    // '1/6': '16.666667%',
    // '2/6': '33.333333%',
    // '3/6': '50%',
    // '4/6': '66.666667%',
    // '5/6': '83.333333%',
    // '1/12': '8.333333%',
    // '2/12': '16.666667%',
    // '3/12': '25%',
    // '4/12': '33.333333%',
    // '5/12': '41.666667%',
    // '6/12': '50%',
    // '7/12': '58.333333%',
    // '8/12': '66.666667%',
    // '9/12': '75%',
    // '10/12': '83.333333%',
    // '11/12': '91.666667%',
    full: '100%',
    screen: '100vw',
  }).reduce((cssMap, [modifier, value]) => {
    cssMap[`w-${modifier}`] = css`
      width: ${value};
    `
    return cssMap
  }, {}),
  'h-screen': css`
    height: 100vh;
  `,
  'min-w-0': css`
    min-width: 0;
  `,
  'min-w-full': css`
    min-width: 100%;
  `,
  none: 'none',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  full: '100%',
  'min-h-0': css`
    min-height: 0;
  `,
  'min-h-full': css`
    min-height: 100%;
  `,
  'min-h-screen': css`
    min-height: 100vh;
  `,
  'max-h-full': css`
    max-height: 100%;
  `,
  'max-h-screen': css`
    max-height: 100vh;
  `,
})
