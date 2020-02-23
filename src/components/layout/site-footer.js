import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {Small} from 'src/components'
import {htmlShape, linksShape, textShape, rem} from 'src/utils'

SiteFooter.propTypes = {
  name: textShape.isRequired,
  links: linksShape.isRequired,
  address: htmlShape.isRequired,
  phone: textShape.isRequired,
  email: textShape.isRequired,
}

const linkGroups = {
  church: ['Only in a Church', 'Beliefs', 'About Us'],
  connect: ['Connect - Children', 'Connect - Youth', 'Connect - Adult'],
  resources: ['Events', 'Sermons', 'Donate'],
}

export default function SiteFooter({name, links, address, phone, email}) {
  return (
    <Footer>
      {Object.entries(linkGroups).map(([group, groupLinks]) => (
        <Section key={group}>
          <SectionTitle>{group}</SectionTitle>
          <ul>
            {links
              .filter(
                link => link.displayInFooter && groupLinks.includes(link.text),
              )
              .map(({id, text, route}) => (
                <ListItem key={id} as="li">
                  <Link to={route}>{text.replace('Connect - ', '')}</Link>
                </ListItem>
              ))}
          </ul>
        </Section>
      ))}
      <Section>
        <SectionTitle>{name.text}</SectionTitle>
        <Address>
          <span
            dangerouslySetInnerHTML={{
              __html: address.html,
            }}
          />
          <a href={`mailto:${email.text}`}>{email.text}</a>
          <a href={`tel:+1${phone.text.replace(/[^\d]/g, '')}`}>{phone.text}</a>
        </Address>
      </Section>
      <Section>
        <Small>© {name.text}</Small>
      </Section>
    </Footer>
  )
}

const Footer = styled.footer`
  padding: ${rem(2)} ${rem(4)};
  color: #fff;
  background-color: #292929;
`

const Section = styled.section`
  margin-top: ${rem(8)};
  margin-bottom: ${rem(8)};
`

const SectionTitle = styled.h2`
  margin-bottom: ${rem(3)};
  color: #868e96;
  font-size: ${rem('sm')};
  font-weight: 700;
  text-transform: uppercase;
`

const ListItem = styled.li`
  margin-bottom: ${rem(2)};
  font-size: ${rem('sm')};
`

const Address = styled.address`
  font-size: ${rem('sm')};
  font-style: normal;

  > * {
    display: block;
  }

  > span {
    margin-bottom: ${rem(2)};
  }
`
