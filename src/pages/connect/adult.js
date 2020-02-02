import React from 'react'
import {shape} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout} from 'src/components'
import {htmlShape, textShape} from 'src/utils/custom-prop-types'

Adult.propTyes = {
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

export default function Adult({data}) {
  const {
    page: {
      data: {heading, subheading, content},
    },
  } = data

  return (
    <Layout>
      <h1>{heading.text}</h1>
      <h2>{subheading.text}</h2>
      <section
        dangerouslySetInnerHTML={{
          __html: content.html,
        }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ConnectAdultQuery {
    page: prismicConnectAdult {
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
