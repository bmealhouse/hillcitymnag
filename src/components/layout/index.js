import React from 'react'
import {array, node, oneOfType} from 'prop-types'
import {useStaticQuery, graphql} from 'gatsby'
import styled from 'styled-components'
import website from 'config/website'
import {Container} from 'src/components'
import routeMap from 'src/route-map'
import {rem} from 'src/utils'
import GlobalStyles from './global-styles'
// import SkipNavLink from './skip-nav-link'
import SiteHeader from './site-header'
import ContactUs from './contact-us'
import SiteFooter from './site-footer'
import '@reach/skip-nav/styles.css' // eslint-disable-line import/no-unassigned-import
import 'typeface-roboto' // eslint-disable-line import/no-unassigned-import

Layout.propTypes = {
  children: oneOfType([array, node]).isRequired,
}

function Layout({children}) {
  const {
    layout: {data},
  } = useStaticQuery(graphql`
    query LayoutQuery {
      layout: prismicLayout {
        data {
          name {
            text
          }
          links {
            text: link_text
            route: link_route {
              id
              type
            }
            displayInHeader: display_in_header
            displayInFooter: display_in_footer
          }
          location {
            latitude
            longitude
          }
          address {
            html
          }
          phone {
            text
          }
          email {
            text
          }
        }
      }
    }
  `)

  const links = data.links.map((link) => ({
    ...link,
    id: link.route?.type || 'donate',
    text: link.text,
    route: routeMap[link.route?.type || 'donate'],
  }))

  return (
    <>
      <GlobalStyles />
      {/* <SkipNavLink /> */}
      <Container>
        <SiteHeader {...data} links={links} />
        <Main id={website.skipNavId}>{children}</Main>
      </Container>
      <ContactUs />
      <SiteFooter {...data} links={links} />
    </>
  )
}

export default React.memo(Layout)

const Main = styled.main`
  margin-top: ${rem(16)};
  margin-right: ${rem(6)};
  margin-bottom: ${rem(16)};
  margin-left: ${rem(6)};
`
