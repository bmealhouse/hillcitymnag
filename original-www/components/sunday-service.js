import React from 'react'
import {mediaQuery} from '../shared/constants'

export default function SundayService() {
  return (
    <section css={main}>
      <div className="container-fluid">
        <div className="row">
          <h1 css={message}>
            Sunday
            <br />
            <span css={service}>Service</span>
            <br />
            10:00AM
          </h1>
        </div>
      </div>
    </section>
  )
}

const main = {
  margin: '100px 0',
  textAlign: 'center',
  [mediaQuery.md]: {margin: '150px 0'},
}

const message = {
  margin: 0,
  color: 'rgba(0, 0, 0, 0.1)',
  fontFamily: 'proxima-nova-condensed, sans-serif',
  fontSize: 70,
  fontWeight: 900,
  lineHeight: 0.55,
  textTransform: 'uppercase',
  [mediaQuery.sm]: {fontSize: 100},
  [mediaQuery.md]: {fontSize: 130},
}

const service = {
  color: 'rgba(0, 0, 0, 0.2)',
}

// const icon = {
//   marginRight: 7,
// }
