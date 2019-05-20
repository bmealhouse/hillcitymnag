import React from 'react'
import {object} from 'prop-types'
import {color, mediaQuery, pseudo} from '../shared/constants'
import {btn, link} from '../shared/styles'

LatestSermon.propTypes = {
  latestSermon: object.isRequired,
}

export default function LatestSermon({latestSermon}) {
  const {src} = latestSermon.enclosure
  const latestSermonHref = src.slice(0, src.length - 4)

  return (
    <div className="col-md-6" css={main}>
      <h2 css={header}>Latest Sermon</h2>
      <img
        alt="Small Town Preacher"
        src="static/img/light-logo.svg"
        css={artwork}
      />
      <h4 css={date}>{latestSermon.date}</h4>
      <a href={latestSermonHref} css={titleLink}>
        <h3 css={title}>{latestSermon.title}</h3>
      </a>
      <p css={description}>{latestSermon.description.replace(/<\/?p>/g, '')}</p>
      <a className="btn btn-default btn-lg" href={latestSermonHref} css={btn}>
        <i
          className="fa fa-play-circle-o fa-lg"
          aria-hidden="true"
          css={icon}
        />
        Listen
      </a>
      <a href="https://www.buzzsprout.com/140598" css={[link, allSermons]}>
        All sermons ›
      </a>
    </div>
  )
}

const main = {
  margin: '0 auto',
  maxWidth: 450,
  [mediaQuery.md]: {
    paddingRight: 50,
    borderRight: '1px solid #eee',
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

const artwork = {
  margin: '30px auto',
  marginBottom: 40,
  maxWidth: '100%',
  maxHeight: 225,
  [mediaQuery.md]: {maxHeight: 300},
}

const date = {
  margin: 0,
  color: color.lightGreen,
  fontFamily: 'proxima-nova-condensed, sans-serif',
  fontSize: 22,
  fontWeight: '900',
  textTransform: 'uppercase',
}

const titleHover = {
  color: color.darkGray,
  textDecoration: 'none',
}

const titleLink = {
  color: color.darkGray,
  [pseudo.focus]: titleHover,
  [pseudo.hover]: titleHover,
}

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

const icon = {
  marginRight: 7,
}

const allSermons = {
  position: 'relative',
  display: 'inline-block',
  margin: '0 16px',
  fontSize: 16,
  top: 3,
}
