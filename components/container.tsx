"use client";

import styled from "styled-components";
import { screens } from "@/lib/utils";

export default styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${screens.sm}) {
    max-width: 640px;
  }

  @media (min-width: ${screens.md}) {
    max-width: 690px;
  }

  @media (min-width: ${screens.lg}) {
    max-width: 750px;
  }

  @media (min-width: ${screens.xl}) {
    max-width: 820px;
  }
`;
