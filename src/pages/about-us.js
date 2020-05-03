import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import styled from 'styled-components'
import {graphql} from 'gatsby'
import Image from 'gatsby-image'
import {Layout, Article} from 'src/components'
import {fixedImageShape, htmlShape, textShape, rem, screens} from 'src/utils'

AboutUs.propTypes = {
  data: shape({
    page: shape({
      data: shape({
        heading: textShape.isRequired,
        content: htmlShape.isRequired,
        teamMembersHeading: textShape.isRequired,
        teamMembers: arrayOf(
          shape({
            photo: fixedImageShape.isRequired,
            name: textShape.isRequired,
            title: string.isRequired,
            email: string.isRequired,
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
          <LeftQuote>&ldquo;</LeftQuote>
          {content.text}
          <RightQuote>&rdquo;</RightQuote>
        </Mission>
      </Article>
      <Article highlight="even">
        <h2>{teamMembersHeading.text}</h2>
        {teamMembers.map((teamMember) => (
          <TeamMember key={teamMember.name.text}>
            <Image
              style={{
                width: rem(40),
                border: '2px solid hsla(47, 21%, 80%, 0.5)',
                borderRadius: '9999px',
              }}
              alt={`${teamMember.name.text} photo`}
              fixed={teamMember.photo.localFile.childImageSharp.fixed}
            />
            <TeamMemberDetails>
              <Name>{teamMember.name.text}</Name>
              <Title>{teamMember.title}</Title>
              <a href={`mailto:${teamMember.email}`}>{teamMember.email}</a>
            </TeamMemberDetails>
          </TeamMember>
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
          photo: team_member_photo {
            localFile {
              childImageSharp {
                fixed(width: 196, quality: 90) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
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
  font-size: ${rem(5)};
  font-weight: 500;
  font-style: italic;
`

const LeftQuote = styled.span`
  position: absolute;
  color: rgba(0, 0, 0, 0.075);
  font-size: ${rem(30)};
  transform: translate(${rem(-6)}, ${rem(-8)});
`

const RightQuote = styled.span`
  position: absolute;
  color: rgba(0, 0, 0, 0.075);
  font-size: ${rem(30)};
  transform: translate(${rem(-8)}, ${rem(-2)});
`

const TeamMember = styled.div`
  margin: ${rem(10)} 0;

  @media (min-width: ${screens.sm}) {
    display: flex;
  }
`

const TeamMemberDetails = styled.div`
  margin-top: ${rem(4)};

  @media (min-width: ${screens.sm}) {
    margin: ${rem(10)};
  }
`

const Name = styled.h3`
  margin: 0;
`

const Title = styled.h4`
  margin: 0;
  color: hsla(47, 21%, 15%, 0.5);
`
