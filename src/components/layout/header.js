import React from 'react'
import {linksShape} from 'src/utils/custom-prop-types'

Header.propTypes = {
  links: linksShape.isRequired,
}

export default function Header({links}) {
  return (
    <header>
      <div>
        <a href="/">logo</a>
      </div>
      <ul>
        {links
          .filter(link => link.displayInHeader)
          .map(({id, text, route}) => (
            <li key={id}>
              <a href={route}>{text}</a>
            </li>
          ))}
      </ul>
    </header>
  )
}
