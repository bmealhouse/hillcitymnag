import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import {createGlobalStyle} from 'styled-components'
import {graphql} from 'gatsby'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import tippy from 'tippy.js'
import {Layout} from 'src/components'
import {htmlShape, textShape, rem} from 'src/utils'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import 'tippy.js/dist/tippy.css'

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
      <FullCalendarStyles />
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        height="auto"
        contentHeight="auto"
        events={events.nodes.map(({data: event}) => ({
          title: event.title.text,
          start: event.dateTime,
          description: event.description.html,
        }))}
        eventRender={(info) => {
          tippy(info.el, {
            content: `<h3>${info.event.title}</h3>${info.event.extendedProps.description}`,
            allowHTML: true,
          })
        }}
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

const FullCalendarStyles = createGlobalStyle`
  .fc-toolbar h2 {
    color: hsla(47, 21%, 15%, 0.5);
    font-size: 1.51572rem;
  }

  .fc-view-container table {
    margin: 0;
  }

  .fc-event-container .fc-content {
    font-size: ${rem('xs')};
    letter-spacing: -0.025em;
  }

  .tippy-content {
    padding: ${rem(3)};

    h3 {
      margin-bottom: ${rem(1)};
      color: hsla(47, 21%, 90%, 0.5);
      font-size: ${rem('sm')};
      font-weight: 700;
      text-transform: uppercase;
    }

    p {
      margin: 0;
    }
  }
`
