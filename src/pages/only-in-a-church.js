import React from 'react'
import {shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout, H2Kicker, Article, HtmlContent} from 'src/components'
import {htmlShape, textShape} from 'src/utils'

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

function Church({data}) {
  const {
    page: {
      data: {heading, subheading, sections},
    },
  } = data

  return (
    <Layout>
      <hgroup>
        <h1>{heading.text}</h1>
        <H2Kicker>{subheading.text}</H2Kicker>
      </hgroup>
      {sections.map((section) => (
        <Article key={section.heading.text} highlight="even">
          <h3>{section.heading.text}</h3>
          <HtmlContent
            dangerouslySetInnerHTML={{
              __html: section.content.html,
            }}
          />
        </Article>
      ))}
    </Layout>
  )
}

export default React.memo(Church)

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
