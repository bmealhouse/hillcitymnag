import styled from 'styled-components'
import {rem} from 'src/utils'

export default styled.div`
  margin-top: ${rem(3)};
  font-family: 'Lora', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
    'Helvetica', 'Arial', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  font-size: ${rem('base')};

  p {
    margin-bottom: ${rem(3)};
  }
`
