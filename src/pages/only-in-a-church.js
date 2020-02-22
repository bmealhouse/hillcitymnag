import React from 'react'
import {shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {
  Layout,
  HeaderGroup,
  H1,
  Kicker,
  H2Kicker,
  H3,
  Article,
  HtmlContent,
} from 'src/components'
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

export default function Church({data}) {
  const {
    page: {
      data: {heading, subheading, sections},
    },
  } = data

  return (
    <Layout>
      <HeaderGroup>
        <H1>{heading.text}</H1>
        <Kicker>
          <H2Kicker>{subheading.text}</H2Kicker>
        </Kicker>
      </HeaderGroup>
      {sections.map(section => (
        <Article key={section.heading.text}>
          <H3>{section.heading.text}</H3>
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
