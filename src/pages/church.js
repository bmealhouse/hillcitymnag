import React from 'react'
import {shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout} from 'src/components'
import {htmlShape, textShape} from 'src/utils/custom-prop-types'

Church.propTypes = {
  data: shape({
    church: shape({
      data: shape({
        heading: textShape.isRequired,
        subheading: textShape.isRequired,
        sections: arrayOf(
          shape({
            heading: textShape.isRequired,
            content: htmlShape.isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequried,
    }).isRequired,
  }).isRequired,
}

export default function Church({data}) {
  const {
    church: {
      data: {heading, sections},
    },
  } = data

  return (
    <Layout>
      <h1>{heading.text}</h1>
      {sections.map(section => (
        <section key={section.heading.text}>
          <h2>{section.heading.text}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: section.content.html,
            }}
          />
        </section>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query ChurchQuery {
    church: prismicChurch {
      data {
        heading {
          text
        }
        subheading {
          text
        }
        sections {
          heading: section_heading {
            text
          }
          content: section_content {
            html
          }
        }
      }
    }
  }
`
