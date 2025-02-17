"use client";

import React from "react";
import { number, string } from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { rem } from "@/lib/utils";

Pagination.propTypes = {
  humanPageNumber: number.isRequired,
  numberOfPages: number.isRequired,
  nextPagePath: string,
  previousPagePath: string,
};

function Pagination({
  humanPageNumber,
  numberOfPages,
  nextPagePath,
  previousPagePath,
}) {
  return (
    numberOfPages > 1 && (
      <Wrapper>
        {previousPagePath && (
          <Link to={previousPagePath}>
            <FontAwesomeIcon icon={faAngleLeft} style={{ marginTop: "5px" }} />
          </Link>
        )}
        {humanPageNumber > 5 ? (
          <>
            <PageLink pageNumber={1} currentPageNumber={humanPageNumber} />
            <span>&hellip;</span>
          </>
        ) : (
          Array.from(new Array(5).keys())
            .map((index) => index + 1)
            .map((pageNumber) => (
              <PageLink
                key={pageNumber}
                pageNumber={pageNumber}
                currentPageNumber={humanPageNumber}
              />
            ))
        )}
        {humanPageNumber > 5 &&
          humanPageNumber < numberOfPages - 4 &&
          Array.from(new Array(5).keys())
            .map((pageNumber) => pageNumber + humanPageNumber - 2)
            .map((pageNumber) => (
              <PageLink
                key={pageNumber}
                pageNumber={pageNumber}
                currentPageNumber={humanPageNumber}
              />
            ))}
        {humanPageNumber < numberOfPages - 4 ? (
          <>
            <span>&hellip;</span>
            <PageLink
              pageNumber={numberOfPages}
              currentPageNumber={humanPageNumber}
            />
          </>
        ) : (
          Array.from(new Array(5).keys())
            .map((index) => index + 1)
            .map((pageNumber) => pageNumber + numberOfPages - 5)
            .map((pageNumber) => (
              <PageLink
                key={pageNumber}
                pageNumber={pageNumber}
                currentPageNumber={humanPageNumber}
              />
            ))
        )}
        {nextPagePath && (
          <Link to={nextPagePath}>
            <FontAwesomeIcon icon={faAngleRight} style={{ marginTop: "5px" }} />
          </Link>
        )}
      </Wrapper>
    )
  );
}

export default React.memo(Pagination);

PageLink.propTypes = {
  pageNumber: number.isRequired,
  currentPageNumber: number.isRequired,
};

function PageLink({ pageNumber, currentPageNumber }) {
  return pageNumber === currentPageNumber ? (
    <strong>{currentPageNumber}</strong>
  ) : (
    <Link to={`/messages${pageNumber > 1 ? `/${pageNumber}` : ""}`}>
      {pageNumber}
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: ${rem("sm")};
  text-align: center;

  > * {
    width: ${rem(6)};
  }

  a {
    text-decoration: none;

    &:hover {
      font-weight: 700;
      background-color: hsla(47, 21%, 92%, 0.5);
      border-radius: 9999px;
    }
  }
`;
