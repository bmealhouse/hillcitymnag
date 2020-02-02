import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout} from 'src/components'
import {textShape} from 'src/utils/custom-prop-types'

Sermons.propTyes = {
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
      <h1>{heading.text}</h1>
      {sermons.edges.map(({node: sermon}) => (
        <section key={sermon.id}>
          <h2>{sermon.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: sermon.description,
            }}
          />
          <p>{sermon.audioUrl}</p>
        </section>
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
