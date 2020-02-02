import React from 'react'
import {bool, array, node, oneOfType} from 'prop-types'
import {useStaticQuery, graphql} from 'gatsby'
import SEO from '../SEO'
import CssReset from './css-reset'
import SkipNavLink from './skip-nav-link'
import Header from './header'
import Footer from './footer'

/* eslint-disable import/no-unassigned-import */
import '@reach/skip-nav/styles.css'
import 'typeface-lora'
import 'typeface-roboto'
import 'typeface-source-sans-pro'
/* eslint-enable import/no-unassigned-import */

Layout.propTypes = {
  children: oneOfType([array, node]).isRequired,
  customSEO: bool,
}

Layout.defaultProps = {
  customSEO: false,
}

export default function Layout({children, customSEO}) {
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

  const links = data.links.map(link => ({
    ...link,
    id: `${link.text}-${link.route?.type}`,
    route: {
      church: '/church',
      beliefs: '/beliefs',
      connect_children: '/connect/children',
      connect_youth: '/connect/youth',
      connect_adult: '/connect/adult',
      about_us: '/about-us',
      events: '/events',
      sermons: '/sermons',
      null: null,
    }[link.route?.type],
  }))

  return (
    <>
      <CssReset />
      <SkipNavLink />
      {/* TODO: cleanup customSEO prop (this needs a better name) */}
      {!customSEO && <SEO /> /* eslint-disable-line react/jsx-pascal-case */}
      <Header {...data} links={links} />
      <main>{children}</main>
      <Footer {...data} links={links} />
    </>
  )
}

// const globalStyle = css`
//   h1,
//   h2,
//   h3,
//   h4,
//   h5,
//   h6 {
//     color: ${theme.colors.black};
//   }

//   html {
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//   }

//   body {
//     color: ${theme.colors.greyDarker};
//     background-color: ${theme.colors.bg};
//   }

//   ::selection {
//     color: ${theme.colors.bg};
//     background-color: ${theme.colors.primary};
//   }

//   a {
//     color: ${theme.colors.primary};
//     transition: all 0.4s ease-in-out;
//     text-decoration: none;
//     font-weight: 700;
//     font-style: italic;
//     &:hover,
//     &:focus {
//       text-decoration: underline;
//     }
//   }

//   @media (max-width: ${theme.breakpoints.m}) {
//     html {
//       font-size: 16px !important;
//     }
//   }

//   @media (max-width: ${theme.breakpoints.s}) {
//     h1 {
//       font-size: 2.369rem !important;
//     }
//     h2 {
//       font-size: 1.777rem !important;
//     }
//     h3 {
//       font-size: 1.333rem !important;
//     }
//     h4 {
//       font-size: 1rem !important;
//     }
//     h5 {
//       font-size: 0.75rem !important;
//     }
//     h6 {
//       font-size: 0.563rem !important;
//     }
//   }
// `
