import React from 'react'
import {number, string} from 'prop-types'
import styled from 'styled-components'
import {Helmet} from 'react-helmet'
import {format} from 'date-fns'
import {HtmlContent} from 'src/components'
import {rem} from 'src/utils'

MessageStandalone.propTypes = {
  buzzsproutId: number.isRequired,
  slug: string.isRequired,
  title: string.isRequired,
  date: string.isRequired,
  description: string,
}

function MessageStandalone({buzzsproutId, slug, title, date, description}) {
  return (
    <>
      <Title>{title}</Title>
      <DatePublished>{format(new Date(date), 'LLLL do, yyyy')}</DatePublished>
      <HtmlContent
        css={`
          margin-bottom: ${rem(4)};
        `}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      <MediaPlayer id={`buzzsprout-small-player-${buzzsproutId}`} />
      <Helmet>
        <script
          async
          type="text/javascript"
          src={`https://www.buzzsprout.com/140598/${buzzsproutId}-${slug}.js?container_id=buzzsprout-small-player-${buzzsproutId}&player=small`}
          charSet="utf-8"
        />
      </Helmet>
    </>
  )
}

export default React.memo(MessageStandalone)

const Title = styled.h2`
  margin: 0;
`

const DatePublished = styled.h3`
  margin-bottom: ${rem(4)};
  color: hsla(47, 21%, 15%, 0.5);
  font-size: ${rem('lg')};
`

const MediaPlayer = styled.div`
  height: 120px;
`
