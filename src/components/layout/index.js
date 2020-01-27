import React from 'react'
import {bool, object, array, node, oneOfType} from 'prop-types'
import {StaticQuery, graphql} from 'gatsby'
import {Global, css} from '@emotion/core'
import {ThemeProvider} from 'emotion-theming'
import Footer from '../Footer'
import SEO from '../SEO'
import reset from './reset'
import SkipNavLink from './skip-nav-link'
import theme from './theme'

/* eslint-disable import/no-unassigned-import */
import '@reach/skip-nav/styles.css'
import 'typeface-lora'
import 'typeface-roboto'
import 'typeface-source-sans-pro'
/* eslint-enable import/no-unassigned-import */

Layout.propTypes = {
  children: oneOfType([array, node]).isRequired,
}

export default function Layout({children, ...props}) {
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          prismicHomepage {
            data {
              footer {
                html
              }
            }
          }
        }
      `}
      render={data => (
        <PureLayout {...props} data={data}>
          {children}
        </PureLayout>
      )}
    />
  )
}

PureLayout.propTypes = {
  children: oneOfType([array, node]).isRequired,
  data: object.isRequired,
  customSEO: bool,
}

PureLayout.defaultProps = {
  customSEO: false,
}

function PureLayout({children, data, customSEO}) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <SkipNavLink />
      {/* TODO: cleanup customeSEO prop (this needs a better name) */}
      {!customSEO && <SEO /> /* eslint-disable-line react/jsx-pascal-case */}
      {children}
      <Footer>
        <div
          dangerouslySetInnerHTML={{
            __html: data.prismicHomepage.data.footer.html,
          }}
        />
      </Footer>
    </ThemeProvider>
  )
}

const globalStyle = css`
  ${reset};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.colors.black};
  }
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    color: ${theme.colors.greyDarker};
    background-color: ${theme.colors.bg};
  }
  ::selection {
    color: ${theme.colors.bg};
    background-color: ${theme.colors.primary};
  }
  a {
    color: ${theme.colors.primary};
    transition: all 0.4s ease-in-out;
    text-decoration: none;
    font-weight: 700;
    font-style: italic;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  @media (max-width: ${theme.breakpoints.m}) {
    html {
      font-size: 16px !important;
    }
  }
  @media (max-width: ${theme.breakpoints.s}) {
    h1 {
      font-size: 2.369rem !important;
    }
    h2 {
      font-size: 1.777rem !important;
    }
    h3 {
      font-size: 1.333rem !important;
    }
    h4 {
      font-size: 1rem !important;
    }
    h5 {
      font-size: 0.75rem !important;
    }
    h6 {
      font-size: 0.563rem !important;
    }
  }
`
