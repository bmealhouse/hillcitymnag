import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import styled from 'styled-components'
import {graphql} from 'gatsby'
import {Layout, Article} from 'src/components'
import {htmlShape, textShape, rem} from 'src/utils'

AboutUs.propTypes = {
  data: shape({
    page: shape({
      data: shape({
        heading: textShape.isRequired,
        content: htmlShape.isRequired,
        teamMembersHeading: textShape.isRequired,
        teamMembers: arrayOf(
          shape({
            name: textShape.isRequired,
            email: string.isRequired,
            title: string.isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequried,
    }).isRequired,
  }).isRequired,
}

function AboutUs({data}) {
  const {
    page: {
      data: {heading, content, teamMembersHeading, teamMembers},
    },
  } = data

  return (
    <Layout>
      <hgroup>
        <h1>{heading.text}</h1>
      </hgroup>
      <Article highlight="even">
        <Mission>
          <Quote>&ldquo;</Quote>
          {content.text}
          <Quote>&rdquo;</Quote>
        </Mission>
      </Article>
      <Article highlight="even">
        <h2>{teamMembersHeading.text}</h2>
        {/* TODO: fix this section */}
        {teamMembers.map((teamMember) => (
          <div key={teamMember.name.text}>
            <h3>{teamMember.name.text}</h3>
            <p>{teamMember.email}</p>
            <p>{teamMember.title}</p>
          </div>
        ))}
      </Article>
    </Layout>
  )
}

export default React.memo(AboutUs)

export const pageQuery = graphql`
  query AboutUsQuery {
    page: prismicAboutUs {
      data {
        heading {
          text
        }
        content {
          html
          text
        }
        teamMembersHeading: team_members_heading {
          text
        }
        teamMembers: team_members {
          name: team_member_name {
            text
          }
          email: team_member_email
          title: team_member_title
        }
      }
    }
  }
`

const Mission = styled.h2`
  margin-bottom: 0;
  font-weight: 500;
  font-style: italic;
`

const Quote = styled.span`
  position: fixed;
  display: none;
  transform: translate(-${rem(4)});
  font-size: ${rem(30)};
`
