import React from 'react'
import {string, shape, arrayOf} from 'prop-types'
import {createGlobalStyle} from 'styled-components'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import tippy from 'tippy.js'
import {rem} from 'src/utils'
import '@fullcalendar/core/main.css' // eslint-disable-line import/no-unassigned-import
import '@fullcalendar/daygrid/main.css' // eslint-disable-line import/no-unassigned-import
import 'tippy.js/dist/tippy.css' // eslint-disable-line import/no-unassigned-import

Calendar.propTypes = {
  events: arrayOf(
    shape({
      title: string.isRequired,
      start: string.isRequired,
      description: string,
    }).isRequired,
  ),
}

export default function Calendar({events}) {
  return (
    <>
      <FullCalendarStyles />
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        height="auto"
        contentHeight="auto"
        events={events}
        eventBackgroundColor="#18371b"
        eventBorderColor="#18371b"
        eventRender={(info) => {
          const {description} = info.event.extendedProps

          if (description) {
            tippy(info.el, {
              content: `<h3>${info.event.title}</h3>${description}`,
              allowHTML: true,
            })
          }
        }}
      />
    </>
  )
}

const FullCalendarStyles = createGlobalStyle`
  .fc-unthemed .fc-toolbar h2 {
    color: hsla(47, 21%, 15%, 0.5);
    font-size: 1.51572rem;
  }

  .fc-unthemed .fc-button-primary {
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

  .fc-unthemed .fc-view-container table {
    margin: 0;
  }

  .fc-unthemed .fc-event-container .fc-content {
    font-size: ${rem('xs')};
    letter-spacing: -0.025em;
  }

  .fc-unthemed .fc-day-grid td.fc-today {
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
