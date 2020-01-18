import React from 'react'
import {node} from 'prop-types'

Updates.propTypes = {
  children: node.isRequired,
}

export default function Updates({children}) {
  return (
    <section css={main}>
      <div className="container">
        <div className="row">{children}</div>
      </div>
    </section>
  )
}

const main = {
  margin: '100px 0',
  textAlign: 'center',
}
