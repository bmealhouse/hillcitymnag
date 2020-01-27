import React from 'react'
import {node} from 'prop-types'
import website from '../../../config/website'

SkipNavLink.propTypes = {
  children: node,
}

SkipNavLink.defaultProps = {
  children: 'Skip to content',
}

export default function SkipNavLink({children, ...props}) {
  return (
    <a {...props} data-reach-skip-link href={`#${website.skipNavId}`}>
      {children}
    </a>
  )
}
