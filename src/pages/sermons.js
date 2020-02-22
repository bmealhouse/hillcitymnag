import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout, HeaderGroup, H1, H2, Article, HtmlContent} from 'src/components'
import {textShape} from 'src/utils/custom-prop-types'

Sermons.propTypes = {
  data: shape({
    page: shape({
      data: shape({
        heading: textShape.isRequired,
      }).isRequired,
    }).isRequired,
    sermons: shape({
      edges: arrayOf(
        shape({
          node: shape({
            id: string.isRequired,
            title: string.isRequired,
            description: string.isRequired,
            audioUrl: string.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default function Sermons({data}) {
  const {
    page: {
      data: {heading},
    },
    sermons,
  } = data

  return (
    <Layout>
      <HeaderGroup>
        <H1>{heading.text}</H1>
      </HeaderGroup>
      {sermons.edges.map(({node: sermon}) => (
        <Article key={sermon.id}>
          <H2>{sermon.title}</H2>
          <HtmlContent
            dangerouslySetInnerHTML={{
              __html: sermon.description,
            }}
          />
          <p>{sermon.audioUrl}</p>
        </Article>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query SermonsQuery {
    page: prismicSermons {
      data {
        heading {
          text
        }
      }
    }
    sermons: allBuzzsproutPodcastEpisode {
      edges {
        node {
          id
          title
          description
          audioUrl: audio_url
        }
      }
    }
  }
`
