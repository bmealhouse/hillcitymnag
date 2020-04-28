import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import {graphql} from 'gatsby'
import loadable from 'react-loadable'
import {Layout} from 'src/components'
import {htmlShape, textShape} from 'src/utils'

Events.propTypes = {
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
            title: textShape.isRequired,
            description: htmlShape.isRequired,
            dateTime: string.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

const Calendar = loadable({
  loader: () => import('src/components/calendar'),
  loading() {
    return <div>Loading events...</div>
  },
})

function Events({data}) {
  const {
    page: {
      data: {heading},
    },
    events,
  } = data

  return (
    <Layout>
      <h1 css="margin-bottom: 0;">{heading.text}</h1>
      <Calendar
        events={events.nodes.map(({data: event}) => ({
          title: event.title.text,
          start: event.dateTime,
          description: event.description.html,
        }))}
      />
    </Layout>
  )
}

export default React.memo(Events)

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
