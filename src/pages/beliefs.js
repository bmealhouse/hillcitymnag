import React from 'react'
import {shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout} from 'src/components'
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
      <h1>{heading.text}</h1>
      {beliefs.map(belief => (
        <section key={belief.heading.text}>
          <h2>{belief.heading.text}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: belief.content.html,
            }}
          />
        </section>
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
