import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout, Article, HtmlContent} from 'src/components'
import {textShape} from 'src/utils/custom-prop-types'

Messages.propTypes = {
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

function Messages({data}) {
  const {
    page: {
      data: {heading},
    },
    sermons,
  } = data

  return (
    <Layout>
      <hgroup>
        <h1>{heading.text}</h1>
      </hgroup>
      {sermons.edges.map(({node: sermon}) => (
        <Article key={sermon.id} highlight="even">
          <h2>{sermon.title}</h2>
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

export default React.memo(Messages)

export const pageQuery = graphql`
  query MessagesQuery {
    page: prismicMessages {
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
