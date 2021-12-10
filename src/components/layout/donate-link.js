import React from 'react'
import styled from 'styled-components'

export default function DonateLink() {
  return (
    <ExternalLink href="https://tithe.ly/give?c=4633778" target="_blank">
      Donate
    </ExternalLink>
  )
}

const ExternalLink = styled.a`
  color: hsla(0, 0%, 0%, 0.8);
  text-decoration: none;
`
