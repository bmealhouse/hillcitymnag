"use client";

import React from "react";
import { number, string } from "prop-types";
import styled from "styled-components";
import { format } from "date-fns";
import { HtmlContent } from "@/components";
import { rem, screens } from "@/lib/utils";

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
            margin-bottom: ${rem(4)};
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
  margin-bottom: ${rem(4)};
  color: hsla(47, 21%, 15%, 0.5);
  font-size: ${rem("lg")};
`;

const Video = styled.iframe`
  width: 100%;
  height: 224px;

  @media (min-width: ${screens.sm}) {
    height: 344px;
  }

  @media (min-width: ${screens.md}) {
    height: 372px;
  }

  @media (min-width: ${screens.lg}) {
    height: 406px;
  }

  @media (min-width: ${screens.xl}) {
    height: 446px; /* 428 */
  }
`;
