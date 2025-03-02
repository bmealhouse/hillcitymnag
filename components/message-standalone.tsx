"use client";

import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { HtmlContent } from "@/components";
import styles from "./message-standalone.module.css";

type Props = {
  id: number;
  slug: string;
  title: string;
  published_at: string;
  description: string;
};

export function MessageStandalone({
  id,
  slug,
  title,
  published_at,
  description,
}: Props) {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <h3 className={styles.datePublished}>
        {format(new Date(published_at), "LLLL do, yyyy")}
      </h3>
      <HtmlContent
        style={{ marginBottom: "calc(4rem * var(--scale))" }}
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
      <div
        id={`buzzsprout-small-player-${id}`}
        className={styles.mediaPlayer}
      />
      <Helmet>
        <script
          async
          type="text/javascript"
          src={`https://www.buzzsprout.com/140598/${id}-${slug}.js?container_id=buzzsprout-small-player-${id}&player=small`}
        />
      </Helmet>
    </>
  );
}
