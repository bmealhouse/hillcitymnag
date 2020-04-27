import {css} from 'styled-components'

export default {
  // flex-direction
  'flex-row': css`
    flex-direction: row;
  `,
  'flex-row-reverse': css`
    flex-direction: row-reverse;
  `,
  'flex-col': css`
    flex-direction: column;
  `,
  'flex-col-reverse': css`
    flex-direction: column-reverse;
  `,
  // flex-wrap
  'flex-no-wrap': css`
    flex-wrap: nowrap;
  `,
  'flex-wrap': css`
    flex-wrap: wrap;
  `,
  'flex-rap-reverse': css`
    flex-wrap: wrap-reverse;
  `,
  // align-items
  'items-stretch': css`
    align-items: stretch;
  `,
  'items-start': css`
    align-items: flex-start;
  `,
  'items-center': css`
    align-items: center;
  `,
  'items-end': css`
    align-items: flex-end;
  `,
  'items-baseline': css`
    align-items: baseline;
  `,
  // align-content
  'content-start': css`
    align-content: flex-start;
  `,
  'content-center': css`
    align-content: center;
  `,
  'content-end': css`
    align-content: flex-end;
  `,
  'content-between': css`
    align-content: space-between;
  `,
  'content-around': css`
    align-content: space-around;
  `,
  // justify-content
  'justify-start': css`
    justify-content: flex-start;
  `,
  'justify-center': css`
    justify-content: center;
  `,
  'justify-end': css`
    justify-content: flex-end;
  `,
  'justify-between': css`
    justify-content: space-between;
  `,
  'justify-around': css`
    justify-content: space-around;
  `,
}
