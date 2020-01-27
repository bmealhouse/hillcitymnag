import React from 'react'
import {node} from 'prop-types'
import styled from '@emotion/styled'

Footer.propTypes = {
  children: node.isRequired,
}

export default function Footer({children}) {
  return <StyledFooter>{children}</StyledFooter>
}

const StyledFooter = styled.footer`
  max-width: ${props => props.theme.maxWidth};
  margin: 6rem auto 0 auto;
  padding: 2rem;
  color: ${props => props.theme.colors.grey};
`
