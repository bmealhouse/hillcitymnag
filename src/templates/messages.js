import React from 'react'
import {string, number, shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import buildMessages from 'src/build-messages'
import {
  Layout,
  Article,
  MessageSeries,
  MessageStandalone,
  MessageVideo,
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
            date: string.isRequired,
            duration: number.isRequired,
            description: string,
            tags: string,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
    allPrismicVideo: shape({
      edges: arrayOf(
        shape({
          node: shape({
            data: shape({
              video: shape({
                id: number.isRequired,
                title: string.isRequired,
                description: string,
                date: string.isRequired,
              }).isRequired,
            }).isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: shape({
    pageNumber: number.isRequired,
  }).isRequired,
}

function Messages({data, pageContext}) {
  const {
    page: {
      data: {heading},
    },
    allBuzzsproutPodcastEpisode,
    allPrismicVideo,
  } = data

  const startIndex = pageContext.pageNumber * 5
  const messages = buildMessages({
    allBuzzsproutPodcastEpisode,
    allPrismicVideo,
  }).slice(startIndex, startIndex + 5)

  return (
    <Layout>
      <hgroup>
        <h1>{heading.text}</h1>
      </hgroup>
      {messages.map((message) =>
        message.type === 'MESSAGE_SERIES' ? (
          <Article
            key={message.name}
            id={message.name.replace(/\s/g, '-')}
            highlight="even"
          >
            <MessageSeries {...message} />
          </Article>
        ) : message.type === 'MESSAGE_VIDEO' ? (
          <Article
            key={message.id}
            id={message.title.toLowerCase().replace(/\s/g, '-')}
            highlight="even"
          >
            <MessageVideo {...message} />
          </Article>
        ) : (
          <Article key={message.id} id={message.slug} highlight="even">
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
  query MessagesQuery {
    page: prismicMessages {
      data {
        heading {
          text
        }
      }
    }
    allBuzzsproutPodcastEpisode(
      filter: {duration: {ne: null}}
      sort: {fields: [published_at], order: DESC}
    ) {
      edges {
        node {
          id
          buzzsproutId
          slug
          title
          date: published_at
          duration
          description
          tags
        }
      }
    }
    allPrismicVideo(sort: {fields: [data___video___upload_date], order: DESC}) {
      edges {
        node {
          data {
            video {
              id: video_id
              title
              description
              date: upload_date
            }
          }
        }
      }
    }
  }
`
