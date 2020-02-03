import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout} from 'src/components'
import {htmlShape, textShape} from 'src/utils/custom-prop-types'

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

export default function AboutUs({data}) {
  const {
    page: {
      data: {heading, content, teamMembersHeading, teamMembers},
    },
  } = data

  return (
    <Layout>
      <h1>{heading.text}</h1>
      <section
        dangerouslySetInnerHTML={{
          __html: content.html,
        }}
      />
      <section>
        <h2>{teamMembersHeading.text}</h2>
        {teamMembers.map(teamMember => (
          <div key={teamMember.name.text}>
            <h3>{teamMember.name.text}</h3>
            <p>{teamMember.email}</p>
            <p>{teamMember.title}</p>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query AboutUsQuery {
    page: prismicAboutUs {
      data {
        heading {
          text
        }
        content {
          html
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
