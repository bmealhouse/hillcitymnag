"use client";

import React, { useState } from "react";
import { number, string, arrayOf, shape } from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import prettyMs from "pretty-ms";
import { HtmlContent } from "@/components";
import { rem, screens, useMedia } from "@/lib/utils";

MessageSeries.propTypes = {
  name: string.isRequired,
  messages: arrayOf(
    shape({
      buzzsproutId: number.isRequired,
      slug: string.isRequired,
      title: string.isRequired,
      date: string.isRequired,
      description: string,
    }).isRequired
  ).isRequired,
};

function MessageSeries({ name, messages }) {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const isMobile = useMedia([`(min-width: ${screens.sm})`], [false], true);

  return (
    <>
      <Title>{selectedMessage.title}</Title>
      <DatePublished>
        {format(new Date(selectedMessage.date), "LLLL do, yyyy")}
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
                  setSelectedMessage(message);
                }
              }}
            >
              <td css="padding-right: 0;">
                <FontAwesomeIcon icon={faStarOfLife} />
              </td>
              <td>{message.title}</td>
              <td>{format(new Date(message.date), "L/d/yyyy")}</td>
              {!isMobile && (
                <td>
                  {prettyMs(
                    message.duration * 1000 - (message.duration % 60) * 1000,
                    { unitCount: 2 }
                  )}
                </td>
              )}
            </TableRow>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default React.memo(MessageSeries);

const Title = styled.h2`
  margin: 0;
`;

const DatePublished = styled.span`
  margin-bottom: ${rem(4)};
  color: hsla(47, 21%, 15%, 0.5);
  font-size: ${rem("lg")};
  font-weight: 700;
`;

const MediaPlayer = styled.div`
  height: 120px;
`;

const SeriesTitle = styled.h3`
  margin: 0;
  margin-top: ${rem(6)};
  padding-bottom: 13.5px;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);
`;

const TableRow = styled.tr`
  font-size: ${rem("sm")};

  svg {
    color: ${(props) =>
      props.isSelectedMessage ? "hsla(0, 0%, 0%, 0.25)" : "transparent"};
  }

  &:hover {
    cursor: pointer;

    svg {
      color: #333;
    }
  }
`;
