import React from 'react'
import {shape} from 'prop-types'
import {graphql} from 'gatsby'
import website from '../../config/website'
import {Layout} from 'src/components'
import {textShape} from 'src/utils/custom-prop-types'

Homepage.propTypes = {
  data: shape({
    page: shape({
      data: shape({
        heading: textShape.isRequired,
        subheading: textShape.isRequired,
        serviceTime: textShape.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default function Homepage({data}) {
  const {
    page: {
      data: {heading, subheading, serviceTime},
    },
  } = data

  return (
    <Layout>
      <h1>{heading.text}</h1>
      <h2>{subheading.text}</h2>
      <h2>{serviceTime.text}</h2>
      <main id={website.skipNavId} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    page: prismicHomepage {
      data {
        heading {
          text
        }
        subheading {
          text
        }
        serviceTime: service_time {
          text
        }
      }
    }
  }
`
