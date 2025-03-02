import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { PrismicNextImage } from "@prismicio/next";
import { Layout, H2Kicker, Article } from "@/components";
import { fetchBuzzsproutEpisodes } from "@/lib/fetch-buzzsprout-episodes";
import { prismic, createClient } from "@/prismicio";
import styles from "./index.module.css";

export default async function Homepage() {
  const client = createClient();

  const [
    { data: page },
    [{ data: { image } } = { data: {} }],
    [{ data: { video } } = { data: {} }],
    events,
    messages,
  ] = await Promise.all([
    client.getSingle("homepage"),
    client.getAllByType("image", {
      filters: [prismic.filter.at("my.image.display_on_homepage", true)],
      orderings: {
        field: "document.last_publication_date",
        direction: "desc",
      },
      limit: 1,
    }),
    client.getAllByType("video", {
      filters: [prismic.filter.at("my.video.display_on_homepage", true)],
      orderings: {
        field: "document.last_publication_date",
        direction: "desc",
      },
      limit: 1,
    }),
    client.getAllByType("event", {
      filters: [prismic.filter.at("my.event.display_on_homepage", true)],
      orderings: {
        field: "my.event.date_time",
        direction: "desc",
      },
      limit: 3,
    }),
    fetchBuzzsproutEpisodes(),
  ]);

  const filteredMessages = messages
    .filter((message) => message.duration !== null)
    .toSorted(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    .slice(0, 3);

  const eventsAndMessages = [];

  for (const { id, data: event } of events) {
    eventsAndMessages.push({
      type: "EVENT",
      hashtag: id,
      id: prismic.asText(event.title),
      date: prismic.asDate(event.date_time)?.toISOString(),
      title: prismic.asText(event.title),
      description: prismic.asHTML(event.description),
    });
  }

  for (const message of filteredMessages) {
    const slug = message.audio_url
      .replaceAll(".mp3", "")
      .split("/")
      .slice(-1)
      .join("");

    eventsAndMessages.push({
      type: message.tags ? "MESSAGE_SERIES" : "MESSAGE_STANDALONE",
      hashtag: message.tags ? message.tags.replace(/\s/g, "-") : slug,
      id: String(message.id),
      date: message.published_at,
      title: message.tags
        ? `${message.tags} - ${message.title}`
        : message.title,
      description: message.description,
    });
  }

  const recentUpdates = eventsAndMessages
    .sort(
      (a, b) =>
        new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime()
    )
    .slice(0, 3);

  return (
    <Layout>
      <hgroup>
        <h1 className={styles.title}>{prismic.asText(page.heading)}</h1>
        <H2Kicker>{prismic.asText(page.service_time)}</H2Kicker>
      </hgroup>
      {/* <Article highlight="odd">
        {Date.now() < new Date("07/05/2021").getTime() && (
          <h3 className={styles.announcement}>
            All are welcome to &ldquo;CELEBRATING OUR FREEDOM&rdquo; gathering
            on Sunday, July 4, at 8am!
          </h3>
        )}
      </Article> */}
      <Article highlight="even">
        <h3 className={styles.missionStatement}>
          {prismic.asText(page.subheading)}
        </h3>
      </Article>
      {image && (
        <Article highlight="even">
          <PrismicNextImage field={image} fallbackAlt="" />
        </Article>
      )}
      {video && (
        <Article highlight="odd">
          <iframe
            allowFullScreen
            className={styles.video}
            title={video.title ?? ""}
            src={`https://player.vimeo.com/video/${video.video_id}`}
            allow="autoplay; fullscreen"
          />
        </Article>
      )}
      <Article highlight={video ? "even" : "odd"}>
        <h3>Recent Messages &amp; Events</h3>
        <ul className={styles.recentUpdates}>
          {recentUpdates.map((item) => (
            <li key={item.id} className={styles.item}>
              <h4>{item.title}</h4>
              <Link
                href={
                  item.type === "EVENT"
                    ? `/events/#${item.hashtag}`
                    : `/messages/#${item.hashtag}`
                }
                style={{ display: "block" }}
              >
                {item.type === "EVENT"
                  ? "See all events"
                  : item.type === "MESSAGE_SERIES"
                  ? "Listen to series"
                  : "Listen to message"}
                <FontAwesomeIcon className="fa-fw" icon={faAngleRight} />
              </Link>
            </li>
          ))}
        </ul>
      </Article>
    </Layout>
  );
}
