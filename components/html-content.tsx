"use client";

import styled from "styled-components";
import { rem } from "@/lib/utils";

export default styled.div`
  margin-top: ${rem(4)};

  p {
    margin-bottom: ${rem(4)};
  }

  h3,
  h4,
  h5,
  h6 {
    margin-top: ${rem(8)};
  }
`;
