import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'

export default function FourOFour() {
  return (
    <Wrapper>
      <div>
        <h1 css="margin-bottom: 0;">404 page not found</h1>
        <Link to="/">
          Go to homepage
          <FontAwesomeIcon css="margin-left: 5px;" icon={faAngleRight} />
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 75vh;
`
