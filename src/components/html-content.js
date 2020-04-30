import styled from 'styled-components'
import {rem} from 'src/utils'

export default styled.div`
  margin-top: ${rem(3)};

  p {
    margin-bottom: ${rem(3)};
    text-align: justify;
  }

  h3,
  h4,
  h5,
  h6 {
    margin-top: ${rem(8)};
  }
`
