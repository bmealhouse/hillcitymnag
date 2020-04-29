import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import {Container, Small, UnorderedList} from 'src/components'
import {Calendar} from 'src/pages/events'
import {htmlShape, linksShape, textShape, rem, screens} from 'src/utils'
import {linkGroups} from './site-header'
import locationMap from './location-map.png'

SiteFooter.propTypes = {
  name: textShape.isRequired,
  links: linksShape.isRequired,
  address: htmlShape.isRequired,
  phone: textShape.isRequired,
  email: textShape.isRequired,
}

function SiteFooter({name, links, address, phone, email}) {
  return (
    <>
      <Footer>
        <Container>
          <SiteLinks>
            {Object.entries(linkGroups).map(([group, groupLinks]) => (
              <Section key={group}>
                <SectionTitle>{group}</SectionTitle>
                <UnorderedList>
                  {links
                    .filter(
                      ({id, displayInFooter}) =>
                        displayInFooter && groupLinks.includes(id),
                    )
                    .map(
                      ({id, text, route}) =>
                        console.log(id) || (
                          <ListItem key={id}>
                            <Link
                              to={route || '#'}
                              onMouseEnter={() => {
                                if (id === 'Events-events') {
                                  Calendar.preload()
                                }
                              }}
                            >
                              {text.replace('Connect - ', '')}
                            </Link>
                          </ListItem>
                        ),
                    )}
                </UnorderedList>
              </Section>
            ))}
          </SiteLinks>
          <ContactInfo>
            <LocationMap
              href="https://goo.gl/maps/5GgQHKP4mGWzPgmAA"
              target="_blank"
            />
            <Section>
              <SectionTitle>{name.text}</SectionTitle>
              <Address
                dangerouslySetInnerHTML={{
                  __html: address.html,
                }}
              />
              <ContactMethod href={`mailto:${email.text}`}>
                {email.text}
              </ContactMethod>
              <ContactMethod href={`tel:+1${phone.text.replace(/\D/g, '')}`}>
                {phone.text}
              </ContactMethod>
            </Section>
          </ContactInfo>
        </Container>
      </Footer>
      <Footer css="background-color: #1b1b1b">
        <Container>
          <Section css="margin: 0;">
            <Small>© {name.text}</Small>
          </Section>
        </Container>
      </Footer>
    </>
  )
}

export default React.memo(SiteFooter)

const Footer = styled.footer`
  padding: ${rem(6)};
  color: #fff;
  background-color: #292929;

  @media (min-width: ${screens.lg}) {
    padding: ${rem(10)};
  }
`

const SiteLinks = styled.div`
  padding-bottom: ${rem(6)};

  @media (min-width: ${screens.sm}) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 0;

    > section {
      width: 33.333333%;
      margin: 0;
      padding: ${rem(8)};
    }
  }
`

const Section = styled.section`
  margin-top: ${rem(8)};
  margin-bottom: ${rem(8)};

  @media (min-width: ${screens.sm}) {
    padding-left: ${rem(8)};
    padding-right: ${rem(8)};
  }
`

const SectionTitle = styled.h2`
  margin-bottom: ${rem(3)};
  color: hsla(47, 21%, 90%, 0.5);
  font-size: ${rem('sm')};
  font-weight: 700;
  text-transform: uppercase;
`

const ListItem = styled.li`
  margin-bottom: ${rem(2)};
  font-size: ${rem('sm')};
  letter-spacing: -0.025em;
`

const ContactInfo = styled.div`
  @media (min-width: ${screens.md}) {
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    padding-bottom: ${rem(8)};

    > section {
      width: 33.333333%;
      margin: 0;
      padding: ${rem(5)} ${rem(8)};
      padding-right: 0;
    }
  }
`

const LocationMap = styled.a`
  display: block;
  height: 250px;
  margin-right: ${rem(-6)};
  margin-left: ${rem(-6)};
  background-image: url('${locationMap}');
  background-position: center;
  background-size: 150%;

  @media (min-width: ${screens.sm}) {
    margin-right: ${rem(6)};
    margin-left: ${rem(6)};
    border: ${rem(2)} solid #393939;
  }

  @media (min-width: ${screens.md}) {
    width: 66.666666%;
    margin-right: 0;
  }

  @media (min-width: ${screens.lg}) {
    width: calc(66.666666% - ${rem(6)})
  }
`

const Address = styled.address`
  font-size: ${rem('sm')};
  font-style: normal;

  > p {
    margin-bottom: ${rem(4)};
  }
`

const ContactMethod = styled.a`
  display: block;
  margin-bottom: ${rem(1)};
  font-size: ${rem('sm')};
  overflow-wrap: normal;
`
