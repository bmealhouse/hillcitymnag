import {css} from 'styled-components'
import responsive from './utils/responsive'

export default responsive({
  block: css`
    display: block;
  `,
  'inline-block': css`
    display: inline-block;
  `,
  inline: css`
    display: inline;
  `,
  flex: css`
    display: flex;
  `,
  'inline-flex': css`
    display: inline-flex;
  `,
  grid: css`
    display: grid;
  `,
  table: css`
    display: table;
  `,
  'table-caption': css`
    display: table-caption;
  `,
  'table-cell': css`
    display: table-cell;
  `,
  'table-column': css`
    display: table-column;
  `,
  'table-column-group': css`
    display: table-column-group;
  `,
  'table-footer-group': css`
    display: table-footer-group;
  `,
  'table-header-group': css`
    display: table-header-group;
  `,
  'table-row-group': css`
    display: table-row-group;
  `,
  'table-row': css`
    display: table-row;
  `,
  hidden: css`
    display: none;
  `,
})
