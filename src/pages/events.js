import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import {Layout} from 'src/components'
import {htmlShape, textShape} from 'src/utils/custom-prop-types'

Events.propTyes = {
  data: shape({
    page: shape({
      data: shape({
        heading: textShape.isRequired,
      }).isRequired,
    }).isRequired,
    events: shape({
      nodes: arrayOf(
        shape({
          data: shape({
            heading: textShape.isRequired,
            description: htmlShape.isRequired,
            dateTime: string.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default function Events({data}) {
  const {
    page: {
      data: {heading},
    },
    events,
  } = data

  return (
    <Layout>
      <h1>{heading.text}</h1>
      {events.nodes.map(({data: event}) => (
        <section key={event.dateTime}>
          <h2>{event.heading.text}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: event.description.html,
            }}
          />
          <p>{event.dateTime}</p>
        </section>
      ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query EventsQuery {
    page: prismicEvents {
      data {
        heading {
          text
        }
      }
    }
    events: allPrismicEvent(sort: {fields: [data___date_time], order: ASC}) {
      nodes {
        data {
          heading {
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
