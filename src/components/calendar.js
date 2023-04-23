import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import {createGlobalStyle} from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import tippy from 'tippy.js'
import {rem} from 'src/utils'
import 'tippy.js/dist/tippy.css' // eslint-disable-line import/no-unassigned-import

Calendar.propTypes = {
  events: arrayOf(
    shape({
      title: string.isRequired,
      description: string,
      start: string.isRequired,
      end: string,
    }).isRequired,
  ),
}

export default function Calendar({events}) {
  return (
    <>
      <FullCalendarStyles />
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[rrulePlugin, dayGridPlugin]}
        height="auto"
        contentHeight="auto"
        events={events}
        eventBackgroundColor="#18371b"
        eventBorderColor="#18371b"
        eventDidMount={(info) => {
          const {
            title,
            start,
            end,
            _def: {recurringDef},
            extendedProps: {description},
          } = info.event

          const date = start.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })

          const startTime = start.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })

          let endTime
          if (end) {
            endTime = end.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })
          } else if (recurringDef) {
            // Recurring events to don't keep track of the event end time.
            // We need to look up the event end time by title from the original
            // events config.
            const event = events.find((event) => event.title === title)
            if (event?.end) {
              endTime = new Date(event.end).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })
            }
          }

          tippy(info.el, {
            content: `<h3>${info.event.title}</h3>${
              description ? `${description}<br/>` : ''
            }${`${date} @ ${startTime}${endTime ? ` - ${endTime}` : ''}`}`,
            allowHTML: true,
          })
        }}
      />
    </>
  )
}

const FullCalendarStyles = createGlobalStyle`
  .fc .fc-toolbar .fc-toolbar-title {
    color: hsla(47, 21%, 15%, 0.5);
    font-size: 1.51572rem;
  }

  .fc .fc-toolbar .fc-button-primary {
    padding: ${rem(1)} ${rem(2)};
    background-color: hsl(125.8, 39.2%, 15.5%);
    border-color: transparent;

    &:hover {
      background-color: hsla(125.8, 39.2%, 15.5%, 0.5);
      border-color: transparent;
    }

    &:disabled {
      background-color: hsl(125.8, 39.2%, 15.5%);
      border-color: transparent;
    }
  }

  .fc .fc-toolbar .fc-toolbar-chunk {
    display: flex;
  }

  .fc .fc-toolbar .fc-today-button,
  .fc .fc-toolbar .fc-button-group {
    margin-left: ${rem(2)} !important;
  }

  .fc .fc-scrollgrid table {
    margin: 0;
  }

  .fc a {
    color: #333;
    text-decoration: none;
  }

  .fc .fc-daygrid-body .fc-daygrid-event {
    font-size: ${rem('xs')};
    letter-spacing: -0.025em;
    cursor: default;
  }

  .fc .fc-daygrid-body .fc-daygrid-day.fc-day-today {
    background: hsla(47, 21%, 92%, 0.75);
  }

  .tippy-box {
    padding: ${rem(2)};
  }

  .tippy-content {
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
