import React from 'react'
import styled from 'styled-components'
import {htmlShape, linksShape, textShape, rem} from 'src/utils'

SiteFooter.propTypes = {
  name: textShape.isRequired,
  links: linksShape.isRequired,
  address: htmlShape.isRequired,
  phone: textShape.isRequired,
  email: textShape.isRequired,
}

export default function SiteFooter({name, links, address, phone, email}) {
  return (
    <Footer>
      <section>
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
        <p>
          <strong>{name.text}</strong>
        </p>
        <p
          dangerouslySetInnerHTML={{
            __html: address.html,
          }}
        />
        <p>{phone.text}</p>
        <p>{email.text}</p>
      </section>
      <section>© {name.text}</section>
    </Footer>
  )
}

const Footer = styled.footer`
  padding: ${rem(10)} ${rem(4)};
  color: #fff;
  background-color: #292929;
`
