import {css} from 'styled-components'
import responsive from './utils/responsive'

export default responsive({
  'box-border': css`
    box-sizing: border-box;
  `,
  'box-content': css`
    box-sizing: content-box;
  `,
})
