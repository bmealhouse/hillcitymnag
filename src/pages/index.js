import React from 'react'
import {shape} from 'prop-types'
import {graphql} from 'gatsby'
import styled from 'styled-components'
import {Layout, H2Kicker, Article} from 'src/components'
import {textShape} from 'src/utils'

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
      <hgroup>
        <h1>{heading.text}</h1>
        <H2Kicker>{serviceTime.text}</H2Kicker>
      </hgroup>
      <Article highlight="even">
        <MissionStatement>{subheading.text}</MissionStatement>
      </Article>
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

const MissionStatement = styled.h3`
  margin: 0;
  font-weight: 500;
`
