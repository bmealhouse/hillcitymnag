import {css} from 'styled-components'
import responsive from './utils/responsive'

export default responsive({
  'float-right': css`
    float: right;
  `,
  'float-left': css`
    float: left;
  `,
  'float-none': css`
    float: none;
  `,
  clearfix: css`
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  `,
})
