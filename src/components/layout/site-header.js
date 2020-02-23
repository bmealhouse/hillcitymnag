import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import website from 'config/website'
import {Small} from 'src/components'
import {linksShape, rem} from 'src/utils'
import logo from './light-logo.svg'

SiteHeader.propTypes = {
  links: linksShape.isRequired,
}

export default function SiteHeader({links}) {
  return (
    <Header>
      <Link to="/" css="flex-shrink:0;">
        <Logo src={logo} alt={website.title} />
      </Link>
      <MenuWrapper>
        <MenuToggle>
          <FontAwesomeIcon icon={faBars} size="2x" />
          <Small>MENU</Small>
        </MenuToggle>
      </MenuWrapper>
      {/* <UnorderedList flex items-center justify-end flex-grow>
        {links
          .filter(link => link.displayInHeader)
          .map(({id, text, route}) => (
            <li key={id}>
              <a href={route}>{text}</a>
            </li>
          ))}
      </UnorderedList> */}
    </Header>
  )
}

const Header = styled.header`
  display: flex;
  margin: ${rem(2)} ${rem(4)};
`

const Logo = styled.img`
  width: ${rem(20)};
`

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`

const MenuToggle = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
`
