import React, {useState} from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import website from 'config/website'
import {Small} from 'src/components'
import {linksShape, rem, screens} from 'src/utils'
import logo from './light-logo.svg'

const linkGroups = {
  church: ['Only in a Church', 'Beliefs', 'About Us'],
  connect: ['Connect - Children', 'Connect - Youth', 'Connect - Adult'],
  resources: ['Events', 'Sermons', 'Donate'],
}

SiteHeader.propTypes = {
  links: linksShape.isRequired,
}

function SiteHeader({links}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Header>
      <HeaderContent>
        <Link to="/" css="flex-shrink:0;">
          <Logo src={logo} alt={website.title} />
        </Link>
        <MenuWrapper>
          <MenuToggle
            onClick={() => {
              setIsOpen((currentValue) => !currentValue)
            }}
          >
            <FontAwesomeIcon icon={faBars} size="2x" />
            <Small>MENU</Small>
          </MenuToggle>
        </MenuWrapper>
      </HeaderContent>
      <HeaderMenu isOpen={isOpen}>
        <ul>
          {Object.entries(linkGroups).map(([group, groupLinks]) => (
            <li key={group}>
              <MenuGroup>{group}</MenuGroup>
              <HeaderSubmenu>
                <ul>
                  {links
                    .filter(
                      (link) =>
                        link.displayInHeader && groupLinks.includes(link.text),
                    )
                    .map(({id, text, route}) => {
                      return (
                        <li key={id}>
                          <Link
                            to={route || '#'}
                            onClick={() => {
                              setIsOpen(false)
                            }}
                          >
                            {text.replace('Connect - ', '')}
                          </Link>
                        </li>
                      )
                    })}
                </ul>
              </HeaderSubmenu>
            </li>
          ))}
        </ul>
      </HeaderMenu>
    </Header>
  )
}

export default React.memo(SiteHeader)

const Header = styled.header`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

const HeaderContent = styled.div`
  position: relative;
  display: flex;
  padding: ${rem(3)} ${rem(5)};
  background-color: #fff;
  z-index: 20;
`

const HeaderMenu = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  transition: transform 250ms ease-in-out;
  transform: translateY(${(props) => (props.isOpen ? 0 : '-100%')});
  z-index: 10;

  > ul {
    padding: ${rem(6)};
  }
`

const MenuGroup = styled.div`
  margin-bottom: ${rem(3)};
  color: rgba(0, 0, 0, 0.8);
  font-size: ${rem('sm')};
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 2px solid hsla(47, 21%, 80%, 0.5);
`

const Logo = styled.img`
  width: ${rem(16)};
  margin-bottom: 0;
`

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;

  /* @media (min-width: ${screens.md}) {
    display: none;
  } */
`

const MenuToggle = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
`

const HeaderSubmenu = styled.div`
  > ul {
    margin-bottom: ${rem(6)};

    > li {
      margin-bottom: ${rem(2)};
      font-size: ${rem('sm')};
    }
  }
`
