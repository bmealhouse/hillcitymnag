"use client";

import { useState, useEffect } from "react";

export default function useMedia(queries, values, defaultValue) {
  const mediaQueryLists = queries.map((q) =>
    typeof window === `undefined` ? [] : window.matchMedia(q)
  );

  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return typeof values[index] === "undefined" ? defaultValue : values[index];
  };

  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      const handler = () => setValue(getValue);
      mediaQueryLists.forEach((mql) => mql.addListener(handler));

      return () => {
        mediaQueryLists.forEach((mql) => mql.removeListener(handler));
      };
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return value;
}
