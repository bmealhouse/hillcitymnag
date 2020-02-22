import styled, {css} from 'styled-components'
import {screens} from './theme'

export default styled.div`
  width: 100%;

  ${props =>
    props['mx-auto'] &&
    css`
      margin-left: auto;
      margin-right: auto;
    `};

  @media (min-width: ${screens.sm}) {
    max-width: ${screens.sm};
  }

  @media (min-width: ${screens.md}) {
    max-width: ${screens.md};
  }

  @media (min-width: ${screens.lg}) {
    max-width: ${screens.lg};
  }

  @media (min-width: ${screens.xl}) {
    max-width: ${screens.xl};
  }
`
