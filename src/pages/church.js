import React from 'react'
import {shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout} from 'src/components'
import {htmlShape, textShape} from 'src/utils/custom-prop-types'

Church.propTypes = {
  data: shape({
    page: shape({
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
    page: {
      data: {heading, subheading, sections},
    },
  } = data

  return (
    <Layout>
      <h1>{heading.text}</h1>
      <h2>{subheading.text}</h2>
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
    page: prismicChurch {
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
