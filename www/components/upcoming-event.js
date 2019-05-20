import React from 'react'
import {object} from 'prop-types'
import {color, mediaQuery} from '../shared/constants'

UpcomingEvent.propTypes = {
  upcomingEvent: object,
}

UpcomingEvent.defaultProps = {
  upcomingEvent: null,
}

export default function UpcomingEvent({upcomingEvent}) {
  if (!upcomingEvent) {
    return (
      <div className="col-md-6" css={main}>
        <h2 css={header}>Upcoming Event</h2>
        <div css={calendar}>
          <i
            className="fa fa-calendar-minus-o"
            aria-hidden="true"
            css={noEventIcon}
          />
        </div>
        <h3 css={noEventMessage}>More special events to be posted soon!</h3>
      </div>
    )
  }

  const startTime = parseTime(upcomingEvent.startTime)
  const endTime = parseTime(upcomingEvent.endTime)

  let formattedDay = startTime.day
  let formattedTime = endTime
    ? `${startTime.time} — ${endTime.time}`
    : `${startTime.time}`

  if (endTime && endTime.day > startTime.day) {
    formattedDay = `${startTime.day}-${endTime.day}`
    formattedTime = undefined
  }

  return (
    <div className="col-md-6" css={main}>
      <h2 css={header}>Upcoming Event</h2>
      <div css={calendar}>
        <i className="fa fa-calendar-o" aria-hidden="true" css={icon} />
        <span css={month}>{startTime.month}</span>
        <span css={day}>{formattedDay}</span>
        <span css={time}>{formattedTime}</span>
      </div>
      <h4 css={location}>{upcomingEvent.place.name}</h4>
      {/* <a
        href={`https://www.facebook.com/events/${upcomingEvent.id}`}
        css={titleLink}>
        <h3 css={title}>
          {upcomingEvent.name}
        </h3>
      </a> */}
      <h3 css={title}>{upcomingEvent.name}</h3>
      <p css={description}>{upcomingEvent.description}</p>
      {/* <a
        className="btn btn-default btn-lg"
        href={`https://www.facebook.com/events/${upcomingEvent.id}`}
        css={btn}
      >
        See details
      </a>
      <a
        href="https://www.facebook.com/pg/Hill-City-Assembly-of-God-115583631855218/events/"
        css={[link, allEvents]}
      >
        All events ›
      </a> */}
    </div>
  )
}

const MONTHS = [
  'January',
  'Feburary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const parseTime = value => {
  if (!value) {
    return undefined
  }

  const date = new Date(value)
  const hours24 = date.getHours()
  const hours12 = hours24 > 12 ? hours24 - 12 : hours24
  const timeOfDay = hours24 > 12 ? 'PM' : 'AM'
  const minutes = date.getMinutes()

  return {
    source: date,
    month: MONTHS[date.getMonth()],
    day: date.getDate(),
    time:
      minutes > 0
        ? `${hours12}:${minutes} ${timeOfDay}`
        : `${hours12} ${timeOfDay}`,
  }
}

const main = {
  margin: '0 auto',
  maxWidth: 450,
  [mediaQuery.md]: {
    marginLeft: -1,
    paddingLeft: 50,
    borderLeft: '1px solid #eee',
    maxWidth: 'none',
  },
}

const header = {
  margin: 0,
  fontFamily: 'proxima-nova-condensed, sans-serif',
  fontSize: 55,
  fontWeight: 900,
  lineHeight: 1,
  textAlign: 'center',
  textTransform: 'uppercase',
  [mediaQuery.md]: {
    padding: '0 15%',
    fontSize: 66,
  },
}

const calendar = {
  margin: '30px auto',
  marginBottom: 40,
  maxWidth: '100%',
  maxHeight: 225,
  [mediaQuery.md]: {maxHeight: 300},
}

const icon = {
  fontSize: 225,
  [mediaQuery.md]: {fontSize: 300},
}

const month = {
  position: 'relative',
  display: 'block',
  color: color.mediumGreen,
  fontSize: 20,
  fontWeight: 400,
  letterSpacing: -1,
  top: -135,
  [mediaQuery.md]: {
    fontSize: 25,
    fontWeight: 300,
    top: -175,
  },
}

const day = {
  position: 'relative',
  display: 'block',
  color: color.charcoal,
  fontFamily: 'proxima-nova-condensed, sans-serif',
  fontSize: 68,
  fontWeight: 900,
  top: -150,
  [mediaQuery.md]: {
    fontSize: 85,
    top: -195,
  },
}

const time = {
  position: 'relative',
  display: 'block',
  color: color.charcoal,
  fontFamily: 'proxima-nova-condensed, sans-serif',
  fontSize: 16,
  fontWeight: 900,
  top: -175,
  [mediaQuery.md]: {
    fontSize: 20,
    top: -220,
  },
}

const location = {
  margin: 0,
  color: color.lightGreen,
  fontFamily: 'proxima-nova-condensed, sans-serif',
  fontSize: 22,
  fontWeight: '900',
  textTransform: 'uppercase',
}

// const titleHover = {
//   color: color.darkGray,
//   textDecoration: 'none',
// }

// const titleLink = {
//   color: color.darkGray,
//   [pseudo.focus]: titleHover,
//   [pseudo.hover]: titleHover,
// }

const title = {
  marginTop: 0,
  fontFamily: 'reklame-script, sans-serif',
  fontSize: 44,
  fontWeight: 500,
}

const description = {
  marginBottom: 20,
  fontSize: 18,
  fontWeight: 300,
  lineHeight: 1.25,
}

// const allEvents = {
//   position: 'relative',
//   display: 'inline-block',
//   margin: '0 16px',
//   fontSize: 16,
//   top: 3,
// }

const noEventIcon = {
  marginLeft: 15,
  fontSize: 225,
  [mediaQuery.md]: {
    marginLeft: 20,
    fontSize: 300,
  },
}

const noEventMessage = {
  width: 290,
  margin: '0 auto',
  fontFamily: 'reklame-script, sans-serif',
  fontSize: 60,
  fontWeight: 500,
}
