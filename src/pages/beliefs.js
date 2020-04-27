import React from 'react'
import {shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout, Article, HtmlContent} from 'src/components'
import {htmlShape, textShape} from 'src/utils'

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

function Beliefs({data}) {
  const {
    page: {
      data: {heading, beliefs},
    },
  } = data

  return (
    <Layout>
      <hgroup>
        <h1>{heading.text}</h1>
      </hgroup>
      <div>
        {beliefs.map((belief) => (
          <Article key={belief.heading.text} highlight="odd">
            <h2>{belief.heading.text}</h2>
            <HtmlContent
              dangerouslySetInnerHTML={{
                __html: belief.content.html,
              }}
            />
          </Article>
        ))}
      </div>
    </Layout>
  )
}

export default React.memo(Beliefs)

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
