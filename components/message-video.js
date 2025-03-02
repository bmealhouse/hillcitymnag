"use client";

import React from "react";
import { number, string } from "prop-types";
import styled from "styled-components";
import { format } from "date-fns";
import { HtmlContent } from "@/components";

MessageVideo.propTypes = {
  id: number.isRequired,
  title: string.isRequired,
  description: string,
  date: string.isRequired,
};

function MessageVideo({ id, title, description, date }) {
  return (
    <>
      <Title>{title}</Title>
      <DatePublished>{format(new Date(date), "LLLL do, yyyy")}</DatePublished>
      {description && (
        <HtmlContent
          css={`
            margin-bottom: calc(4rem * var(--scale));
          `}
        >
          {description}
        </HtmlContent>
      )}
      <Video
        allowFullScreen
        title={title}
        src={`https://player.vimeo.com/video/${id}`}
        allow="autoplay; fullscreen"
        frameBorder="0"
      />
    </>
  );
}

export default React.memo(MessageVideo);

const Title = styled.h2`
  margin: 0;
`;

const DatePublished = styled.h3`
  margin-bottom: calc(4rem * var(--scale));
  color: hsla(47, 21%, 15%, 0.5);
  font-size: var(--lg-rem);
`;

const Video = styled.iframe`
  width: 100%;
  height: 224px;

  @media (min-width: 640px) {
    height: 344px;
  }

  @media (min-width: 768px) {
    height: 372px;
  }

  @media (min-width: 1024px) {
    height: 406px;
  }

  @media (min-width: 1280px) {
    height: 446px; /* 428 */
  }
`;
