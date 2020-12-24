import React from 'react'
import {shape} from 'prop-types'
import {Link, graphql} from 'gatsby'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'
import {Layout, H2Kicker, Article, HtmlContent} from 'src/components'
import {textShape, rem, screens} from 'src/utils'

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
    messages: {edges: messages},
    events: {nodes: events},
  } = data

  const eventsAndMessages = []
  events.forEach(({id, data: event}) => {
    eventsAndMessages.push({
      type: 'EVENT',
      hashtag: id,
      id: event.title.text,
      date: event.dateTime,
      title: event.title.text,
      description: event.description.html,
    })
  })
  messages.forEach(({node: message}) => {
    eventsAndMessages.push({
      type: message.tags ? 'MESSAGE_SERIES' : 'MESSAGE_STANDALONE',
      hashtag: message.tags ? message.tags.replace(/\s/g, '-') : message.slug,
      id: message.id,
      date: message.publishedAt,
      title: message.tags
        ? `${message.tags} - ${message.title}`
        : message.title,
      description: message.description,
    })
  })

  const recentUpdates = eventsAndMessages
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <Layout>
      <hgroup>
        <Title>{heading.text}</Title>
        <H2Kicker>{serviceTime.text}</H2Kicker>
      </hgroup>
      <Article highlight="even">
        <MissionStatement>{subheading.text}</MissionStatement>
      </Article>
      <Article highlight="even">
        <Video
          allowFullScreen
          title="Christmas Eve 2020"
          src="https://player.vimeo.com/video/494255078"
          allow="autoplay; fullscreen"
          frameBorder="0"
        />
      </Article>
      <Article highlight="odd">
        <h3>Recent Messages & Events</h3>
        <RecentUpdates>
          {recentUpdates.map((item) => (
            <Item key={item.id}>
              <h4>{item.title}</h4>
              <Link
                css="display: block;"
                to={
                  item.type === 'EVENT'
                    ? `/events/#${item.hashtag}`
                    : `/messages/#${item.hashtag}`
                }
              >
                {item.type === 'EVENT'
                  ? 'See all events'
                  : item.type === 'MESSAGE_SERIES'
                  ? 'Listen to series'
                  : 'Listen to message'}
                <FontAwesomeIcon css="margin-left: 5px;" icon={faAngleRight} />
              </Link>
            </Item>
          ))}
        </RecentUpdates>
      </Article>
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
    messages: allBuzzsproutPodcastEpisode(
      filter: {duration: {ne: null}}
      sort: {fields: [published_at], order: DESC}
      limit: 3
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
    events: allPrismicEvent(
      filter: {data: {display_on_homepage: {eq: true}}}
      sort: {fields: [data___date_time], order: DESC}
      limit: 3
    ) {
      nodes {
        id: prismicId
        data {
          title {
            text
          }
          description {
            html
          }
          dateTime: date_time
        }
      }
    }
  }
`

const Title = styled.h1`
  max-width: 525px;
`

const MissionStatement = styled.h3`
  margin: 0;
  font-weight: 500;
`

const RecentUpdates = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  list-style: none;

  @media (min-width: ${screens.md}) {
    flex-direction: row;
    margin: 0 ${rem(-4)};
  }
`

const Item = styled.li`
  padding-bottom: ${rem(3)};
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);

  &:last-of-type {
    border-bottom-width: 0;
  }

  h4 {
    margin-bottom: ${rem(2)};
  }

  ${HtmlContent} {
    margin-top: 0;
    margin-bottom: ${rem(2)};
  }

  @media (min-width: ${screens.md}) {
    flex: 0 0 33.333333%;
    padding: ${rem(4)};
    border-right: 1px solid hsla(0, 0%, 0%, 0.12);
    border-bottom-width: 0;

    &:last-of-type {
      border-right-width: 0;
    }
  }
`

const Video = styled.iframe`
  width: 100%;
  height: 224px;

  @media (min-width: ${screens.sm}) {
    height: 344px;
  }

  @media (min-width: ${screens.md}) {
    height: 372px;
  }

  @media (min-width: ${screens.lg}) {
    height: 406px;
  }

  @media (min-width: ${screens.xl}) {
    height: 446px; /* 428 */
  }
`
