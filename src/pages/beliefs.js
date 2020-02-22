import React from 'react'
import {shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout, HeaderGroup, H1, H2, Article, HtmlContent} from 'src/components'
import {htmlShape, textShape} from 'src/utils/custom-prop-types'

Beliefs.propTypes = {
  data: shape({
    page: shape({
      data: shape({
        heading: textShape.isRequired,
        beliefs: arrayOf(
          shape({
            heading: textShape.isRequired,
            content: htmlShape.isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequried,
    }).isRequired,
  }).isRequired,
}

export default function Beliefs({data}) {
  const {
    page: {
      data: {heading, beliefs},
    },
  } = data

  return (
    <Layout>
      <HeaderGroup>
        <H1>{heading.text}</H1>
      </HeaderGroup>
      {beliefs.map(belief => (
        <Article key={belief.heading.text} highlight="even">
          <H2>{belief.heading.text}</H2>
          <HtmlContent
            dangerouslySetInnerHTML={{
              __html: belief.content.html,
            }}
          />
        </Article>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query BeliefsQuery {
    page: prismicBeliefs {
      data {
        heading {
          text
        }
        beliefs {
          heading: belief_heading {
            text
          }
          content: belief_content {
            html
            text
          }
        }
      }
    }
  }
`
