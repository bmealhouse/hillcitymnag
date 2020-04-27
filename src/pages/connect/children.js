import React from 'react'
import {shape} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout, H2Kicker, Article, HtmlContent} from 'src/components'
import {htmlShape, textShape} from 'src/utils/custom-prop-types'

Children.propTypes = {
  data: shape({
    page: shape({
      data: shape({
        heading: textShape.isRequired,
        subheading: textShape.isRequired,
        content: htmlShape.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

function Children({data}) {
  const {
    page: {
      data: {heading, subheading, content},
    },
  } = data

  return (
    <Layout>
      <hgroup>
        <h1>{heading.text}</h1>
        <H2Kicker>{subheading.text}</H2Kicker>
      </hgroup>
      <Article>
        {/* TODO: fix inner html styling */}
        <HtmlContent
          dangerouslySetInnerHTML={{
            __html: content.html,
          }}
        />
      </Article>
    </Layout>
  )
}

export default React.memo(Children)

export const pageQuery = graphql`
  query ConnectChildrenQuery {
    page: prismicConnectChildren {
      data {
        heading {
          text
        }
        subheading {
          text
        }
        content {
          html
        }
      }
    }
  }
`
