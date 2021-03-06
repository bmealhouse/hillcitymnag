import React, {useState, useEffect} from 'react'
import {Link as GatsbyLink} from 'gatsby'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import website from 'config/website'
import {Small} from 'src/components'
import {Calendar} from 'src/pages/events'
import {linksShape, rem, screens} from 'src/utils'
import DonateLink from './donate-link'
import logo from './light-logo.svg'

SiteHeader.propTypes = {
  links: linksShape.isRequired,
}

function SiteHeader({links}) {
  const [isOpen, setIsOpen] = useState(false)
  const [navState, setNavState] = useState({
    openGroup: null,
    action: null,
  })

  let leaveTimeoutId
  useEffect(() => {
    return () => {
      clearTimeout(leaveTimeoutId)
    }
  })

  return (
    <Header>
      <HeaderContent>
        <Link to="/" css="flex-shrink:0;">
          <Logo src={logo} alt={website.title} />
        </Link>
        <MenuWrapper>
          <Menu>
            {Object.entries(linkGroups).map(([group, groupLinks]) => (
              <MenuGroupWrapper key={group}>
                <MenuGroup
                  onMouseEnter={() => {
                    clearTimeout(leaveTimeoutId)
                    setNavState((previousState) => {
                      if (previousState.openGroup !== group) {
                        return {openGroup: group, trigger: 'hover'}
                      }

                      return {openGroup: null, trigger: null}
                    })
                  }}
                  onMouseLeave={() => {
                    leaveTimeoutId = setTimeout(() => {
                      setNavState({openGroup: null, tigger: null})
                    }, 150)
                  }}
                  onClick={() => {
                    setNavState((previousState) => {
                      if (previousState.openGroup !== group) {
                        return {openGroup: group, trigger: 'click'}
                      }

                      return {openGroup: null, trigger: null}
                    })
                  }}
                >
                  {group}
                </MenuGroup>
                <Submenu
                  isOpen={navState.openGroup === group}
                  onMouseEnter={() => {
                    clearTimeout(leaveTimeoutId)
                  }}
                  onMouseLeave={() => {
                    leaveTimeoutId = setTimeout(() => {
                      setNavState({openGroup: null, trigger: null})
                    }, 150)
                  }}
                >
                  <ul>
                    {links
                      .filter(
                        ({id, displayInHeader}) =>
                          displayInHeader && groupLinks.includes(id),
                      )
                      .map(({id, text, route}) => (
                        <li key={id}>
                          {id === 'donate' ? (
                            <DonateLink />
                          ) : (
                            <Link
                              to={route}
                              onMouseEnter={() => {
                                if (id === 'Events-events') {
                                  Calendar.preload()
                                }
                              }}
                              onClick={() => {
                                setIsOpen(false)
                                setNavState({openGroup: null, trigger: null})
                              }}
                            >
                              {text.replace('Connect - ', '')}
                            </Link>
                          )}
                        </li>
                      ))}
                  </ul>
                </Submenu>
              </MenuGroupWrapper>
            ))}
          </Menu>
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
      <MobileMenu isOpen={isOpen}>
        <ul>
          {Object.entries(linkGroups).map(([group, groupLinks]) => (
            <li key={group}>
              <MenuGroup>{group}</MenuGroup>
              <Submenu>
                <ul>
                  {links
                    .filter(
                      ({id, displayInHeader}) =>
                        displayInHeader && groupLinks.includes(id),
                    )
                    .map(({id, text, route}) => (
                      <li key={id}>
                        {id === 'donate' ? (
                          <DonateLink />
                        ) : (
                          <Link
                            to={route}
                            onMouseEnter={() => {
                              if (id === 'Events-events') {
                                Calendar.preload()
                              }
                            }}
                            onClick={() => {
                              setIsOpen(false)
                            }}
                          >
                            {text.replace('Connect - ', '')}
                          </Link>
                        )}
                      </li>
                    ))}
                </ul>
              </Submenu>
            </li>
          ))}
        </ul>
      </MobileMenu>
    </Header>
  )
}

export default React.memo(SiteHeader)

export const linkGroups = {
  church: ['church', 'beliefs', 'about_us'],
  connect: ['connect_children', 'connect_youth', 'connect_adult'],
  resources: ['events', 'messages', 'donate'],
}

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

const MobileMenu = styled.div`
  position: absolute;
  width: 100%;
  background-color: #fff;
  transition: transform 250ms ease-in-out;
  transform: translateY(${(props) => (props.isOpen ? 0 : '-100%')});
  z-index: 10;

  > ul {
    padding: ${rem(6)};
  }

  @media (min-width: ${screens.sm}) {
    display: none;
  }
`

const MenuGroupWrapper = styled.li`
  position: relative;
  margin-bottom: 0;
  padding: 0 ${rem(4)};
`

const MenuGroup = styled.div`
  margin-bottom: ${rem(3)};
  color: rgba(0, 0, 0, 0.8);
  font-size: ${rem('sm')};
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 2px solid hsla(47, 21%, 80%, 0.5);

  @media (min-width: ${screens.sm}) {
    margin-bottom: 0;
    border-bottom: 0;

    &:hover {
      cursor: pointer;
    }
  }
`

const Logo = styled.img`
  width: ${rem(16)};
  margin-bottom: 0;

  @media (min-width: ${screens.sm}) {
    width: ${rem(20)};
  }
`

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`

const Menu = styled.ul`
  display: none;

  @media (min-width: ${screens.sm}) {
    display: flex;
  }
`

const MenuToggle = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;

  @media (min-width: ${screens.sm}) {
    display: none;
  }
`

const Submenu = styled.div`
  > ul {
    margin-bottom: ${rem(6)};

    > li {
      margin-bottom: ${rem(2)};
      font-size: ${rem('sm')};
      letter-spacing: -0.025em;
    }
  }

  @media (min-width: ${screens.sm}) {
    position: fixed;
    display: ${({isOpen}) => (isOpen ? 'block' : 'none')};
    width: ${rem(32)};
    margin-top: ${rem(1)};
    padding: ${rem(3)};
    transform: translateX(calc(${rem(-3)} - 2px));
    border: 2px solid hsla(47, 21%, 80%, 0.5);
    background-color: #fff;

    > ul {
      margin-bottom: 0;

      > li:last-of-type {
        margin: 0;
      }
    }
  }
`

const Link = styled(GatsbyLink)`
  color: hsla(0, 0%, 0%, 0.8);
  text-decoration: none;
`
