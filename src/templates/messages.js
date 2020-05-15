import React from 'react'
import {string, number, object, shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {buildMessages} from '../../gatsby-node'
import {
  Layout,
  Article,
  MessageSeries,
  MessageStandalone,
  Pagination,
} from 'src/components'
import {textShape} from 'src/utils'

Messages.propTypes = {
  data: shape({
    page: shape({
      data: shape({
        heading: textShape.isRequired,
      }).isRequired,
    }).isRequired,
    allBuzzsproutPodcastEpisode: shape({
      edges: arrayOf(
        shape({
          node: shape({
            id: string.isRequired,
            buzzsproutId: number.isRequired,
            slug: string.isRequired,
            title: string.isRequired,
            publishedAt: string.isRequired,
            duration: number.isRequired,
            description: string,
            tags: string,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: object.isRequired,
}

function Messages({data, pageContext}) {
  const {
    page: {
      data: {heading},
    },
    allBuzzsproutPodcastEpisode,
  } = data

  const messages = buildMessages(allBuzzsproutPodcastEpisode).slice(0, 5)

  return (
    <Layout>
      <hgroup>
        <h1>{heading.text}</h1>
      </hgroup>
      {messages.map((message) =>
        message.type === 'MESSAGE_SERIES' ? (
          <Article key={message.name} highlight="even">
            <MessageSeries {...message} />
          </Article>
        ) : (
          <Article key={message.id} highlight="even">
            <MessageStandalone {...message} />
          </Article>
        ),
      )}
      <Pagination {...pageContext} />
    </Layout>
  )
}

export default React.memo(Messages)

export const pageQuery = graphql`
  query PaginatedMessagesQuery($skip: Int!) {
    page: prismicMessages {
      data {
        heading {
          text
        }
      }
    }
    allBuzzsproutPodcastEpisode(
      sort: {fields: [published_at], order: DESC}
      skip: $skip
      limit: 20
    ) {
      edges {
        node {
          id
          buzzsproutId
          slug
          title
          publishedAt: published_at
          duration
          description
          tags
        }
      }
    }
  }
`
