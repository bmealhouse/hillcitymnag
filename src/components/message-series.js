import React, {useState} from 'react'
import {number, string, arrayOf, shape} from 'prop-types'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStarOfLife} from '@fortawesome/free-solid-svg-icons'
import {Helmet} from 'react-helmet'
import {format} from 'date-fns'
import prettyMs from 'pretty-ms'
import {HtmlContent} from 'src/components'
import {rem, screens} from 'src/utils'

MessageSeries.propTypes = {
  name: string.isRequired,
  messages: arrayOf(
    shape({
      buzzsproutId: number.isRequired,
      slug: string.isRequired,
      title: string.isRequired,
      publishedAt: string.isRequired,
      description: string,
    }).isRequired,
  ).isRequired,
}

function MessageSeries({name, messages}) {
  const [selectedMessage, setSelectedMessage] = useState(messages[0])

  return (
    <>
      <Title>{selectedMessage.title}</Title>
      <DatePublished>
        {format(new Date(selectedMessage.publishedAt), 'LLLL do, yyyy')}
      </DatePublished>
      <HtmlContent
        css={`
          margin-bottom: ${rem(4)};
        `}
        dangerouslySetInnerHTML={{
          __html: selectedMessage.description,
        }}
      />
      <MediaPlayer id={`buzzsprout-small-player-${name}`} />
      <Helmet>
        <script
          async
          type="text/javascript"
          src={`https://www.buzzsprout.com/140598/${selectedMessage.buzzsproutId}-${selectedMessage.slug}.js?container_id=buzzsprout-small-player-${name}&player=small`}
          charSet="utf-8"
        />
      </Helmet>
      <SeriesTitle>Messages from {name}</SeriesTitle>
      <table css="margin-bottom: 0;">
        <tbody>
          {messages.map((message) => (
            <TableRow
              key={message.id}
              isSelectedMessage={message.id === selectedMessage.id}
              onClick={() => {
                if (message.id !== selectedMessage.id) {
                  setSelectedMessage(message)
                }
              }}
            >
              <td css="padding-right: 0;">
                <FontAwesomeIcon icon={faStarOfLife} />
              </td>
              <td>{message.title}</td>
              <td>{format(new Date(message.publishedAt), 'L/d/yyyy')}</td>
              <td>
                {prettyMs(
                  message.duration * 1000 - (message.duration % 60) * 1000,
                  {unitCount: 2},
                )}
              </td>
            </TableRow>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default React.memo(MessageSeries)

const Title = styled.h2`
  margin: 0;
`

const DatePublished = styled.span`
  margin-bottom: ${rem(4)};
  color: hsla(47, 21%, 15%, 0.5);
  font-size: ${rem('lg')};
  font-weight: 700;
`

const MediaPlayer = styled.div`
  height: 120px;
`

const SeriesTitle = styled.h3`
  margin: 0;
  margin-top: ${rem(6)};
  padding-bottom: 13.5px;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);
`

const TableRow = styled.tr`
  font-size: ${rem('xs')};

  @media (min-width: ${screens.sm}) {
    font-size: ${rem('sm')};
  }

  svg {
    color: ${(props) =>
      props.isSelectedMessage ? 'hsla(0, 0%, 0%, 0.25)' : 'transparent'};
  }

  &:hover {
    cursor: pointer;

    svg {
      color: #333;
    }
  }
`
