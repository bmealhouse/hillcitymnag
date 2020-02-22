import React from 'react'
import {shape} from 'prop-types'
import {graphql} from 'gatsby'
import styled from 'styled-components'
import {Layout, HeaderGroup, H1, H2} from 'src/components'
import {textShape, rem} from 'src/utils'

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
      {/* py-16? px-10? */}
      <HeaderGroup>
        <H1>{heading.text}</H1>
        <H2 css="color:rgba(24,55,27,0.75);">{serviceTime.text}</H2>
      </HeaderGroup>
      <MissionStatement>
        <p>{subheading.text}</p>
      </MissionStatement>
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

const MissionStatement = styled.article`
  margin-right: ${rem(-4)};
  margin-left: ${rem(-4)};
  margin-bottom: ${rem(64)};
  padding: ${rem(10)} ${rem(4)};
  font-size: ${rem('2xl')};
  font-weight: 700;
  line-height: ${rem('4xl')};
  color: #fff;
  background-color: #292929;
`
