import React from 'react'
import {string, array, shape} from 'prop-types'
import styled from 'styled-components'
import {graphql} from 'gatsby'
import {Layout, Wrapper} from '../components'
import website from '../../config/website'

Homepage.propTypes = {
  data: shape({
    homepage: shape({
      data: shape({
        title: shape({
          text: string.isRequired,
        }),
        content: shape({
          html: string.isRequired,
        }),
      }),
    }),
    social: shape({
      nodes: array.isRequired,
    }),
    posts: shape({
      nodes: array.isRequired,
    }),
    projects: shape({
      nodes: array.isRequired,
    }),
  }).isRequired,
}

export default function Homepage({data: {homepage, social, posts, projects}}) {
  return (
    <Layout>
      <header>
        <Wrapper>
          <h1>{homepage.data.title.text}</h1>
          <div dangerouslySetInnerHTML={{__html: homepage.data.content.html}} />
        </Wrapper>
      </header>
      <IndexWrapper
        id={website.skipNavId}
        style={{paddingTop: '2rem', paddingBottom: '2rem'}}
      >
        {/* <Title style={{marginTop: '4rem'}}>Recent posts</Title> */}
        {/* <Listing posts={posts.nodes} /> */}
        {/* <Title style={{marginTop: '8rem'}}>Recent projects</Title> */}
        {/* <ProjectListing>
          {projects.nodes.map(project => (
            <li key={project.primary.label.text}>
              <a href={project.primary.link.url}>
                {project.primary.label.text}
              </a>
            </li>
          ))}
        </ProjectListing> */}
      </IndexWrapper>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
    social: allPrismicHeroLinksBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
    posts: allPrismicPost(sort: {fields: [data___date], order: DESC}) {
      nodes {
        uid
        data {
          title {
            text
          }
          date(formatString: "DD.MM.YYYY")
          categories {
            category {
              document {
                data {
                  name
                }
              }
            }
          }
        }
      }
    }
    projects: allPrismicProjectsBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
  }
`

const IndexWrapper = Wrapper.withComponent('main')

const Hero = styled.header`
  /* background-color: ${props => props.theme.colors.greyLight};
  display: flex;
  align-items: center; */
`
