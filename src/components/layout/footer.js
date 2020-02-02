import React from 'react'
import {number, shape} from 'prop-types'
import {htmlShape, linksShape, textShape} from 'src/utils/custom-prop-types'

Footer.propTypes = {
  name: textShape.isRequired,
  links: linksShape.isRequired,
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
  }).isRequired,
  address: htmlShape.isRequired,
  phone: textShape.isRequired,
  email: textShape.isRequired,
}

export default function Footer({name, links, location, address, phone, email}) {
  return (
    <footer>
      <section>
        <p>
          <strong>{name.text}</strong>
        </p>
        <ul>
          {links
            .filter(link => link.displayInFooter)
            .map(({id, text, route}) => (
              <li key={id}>
                <a href={route}>{text}</a>
              </li>
            ))}
        </ul>
      </section>
      <section>
        <pre>{JSON.stringify(location, null, 2)}</pre>
        <p
          dangerouslySetInnerHTML={{
            __html: address.html,
          }}
        />
        <p>{phone.text}</p>
        <p>{email.text}</p>
      </section>
    </footer>
  )
}
