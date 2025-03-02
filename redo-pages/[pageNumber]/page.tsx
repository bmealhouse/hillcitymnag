import {
  Layout,
  Article,
  MessageStandalone,
  // MessageSeries,
  // MessageStandalone,
  // MessageVideo,
  // Pagination,
} from "@/components";
import {
  fetchBuzzsproutEpisodes,
  type BuzzsproutEpisode,
} from "@/lib/fetch-buzzsprout-episodes";
import { createClient, prismic } from "@/prismicio";

// Messages.propTypes = {
//   data: shape({
//     page: shape({
//       data: shape({
//         heading: textShape.isRequired,
//       }).isRequired,
//     }).isRequired,
//     allBuzzsproutPodcastEpisode: shape({
//       edges: arrayOf(
//         shape({
//           node: shape({
//             id: string.isRequired,
//             buzzsproutId: number.isRequired,
//             slug: string.isRequired,
//             title: string.isRequired,
//             date: string.isRequired,
//             duration: number.isRequired,
//             description: string,
//             tags: string,
//           }).isRequired,
//         }).isRequired
//       ).isRequired,
//     }).isRequired,
//     allPrismicVideo: shape({
//       edges: arrayOf(
//         shape({
//           node: shape({
//             data: shape({
//               video: shape({
//                 id: number.isRequired,
//                 title: string.isRequired,
//                 description: string,
//                 date: string.isRequired,
//               }).isRequired,
//             }).isRequired,
//           }).isRequired,
//         })
//       ).isRequired,
//     }).isRequired,
//   }).isRequired,
//   pageContext: shape({
//     pageNumber: number.isRequired,
//   }).isRequired,
// };

type Props = {
  params: Promise<{ pageNumber: string }>;
};

export default async function Messages({ params }: Props) {
  const client = createClient();

  const [{ pageNumber }, { data: page }, buzzsproutEpisodes] =
    await Promise.all([
      params,
      client.getSingle("messages"),
      fetchBuzzsproutEpisodes(),
    ]);
  // const {
  //   page: {
  //     data: { heading },
  //   },
  //   allBuzzsproutPodcastEpisode,
  //   allPrismicVideo,
  // } = data;

  // const startIndex = pageContext.pageNumber * 5;
  // const messages = buildMessages({
  //   allBuzzsproutPodcastEpisode,
  //   allPrismicVideo,
  // }).slice(startIndex, startIndex + 5);

  return (
    <Layout>
      <hgroup>
        <h1>{prismic.asText(page.heading)}</h1>
      </hgroup>
      {buildMessages(buzzsproutEpisodes).map((message) =>
        message.type === "MESSAGE_SERIES" ? (
          <Article
            key={message.name}
            id={message.name.replace(/\s/g, "-")}
            highlight="even"
          >
            message series
            {/* <MessageSeries {...message} /> */}
          </Article>
        ) : message.type === "MESSAGE_VIDEO" ? (
          <Article
            key={message.id}
            id={message.title.toLowerCase().replace(/\s/g, "-")}
            highlight="even"
          >
            message video
            {/* <MessageVideo {...message} /> */}
          </Article>
        ) : (
          <Article key={message.id} id={message.slug} highlight="even">
            <MessageStandalone {...message} />
          </Article>
        )
      )}
      {/* <Pagination {...pageContext} /> */}
    </Layout>
  );
}

// export const pageQuery = graphql`
//   query MessagesQuery {
//     allBuzzsproutPodcastEpisode(
//       filter: { duration: { ne: null } }
//       sort: { fields: [published_at], order: DESC }
//     ) {
//       edges {
//         node {
//           id
//           buzzsproutId
//           slug
//           title
//           date: published_at
//           duration
//           description
//           tags
//         }
//       }
//     }
//     allPrismicVideo(
//       sort: { fields: [data___video___upload_date], order: DESC }
//     ) {
//       edges {
//         node {
//           data {
//             video {
//               id: video_id
//               title
//               description
//               date: upload_date
//             }
//           }
//         }
//       }
//     }
//   }
// `;

type BuzzsproutEpisodeWithSlug = BuzzsproutEpisode & {
  slug: string;
};

type Message =
  | {
      type: "MESSAGE_SERIES";
      name: string;
      messages: BuzzsproutEpisodeWithSlug[];
    }
  | ({
      type: "MESSAGE_STANDALONE";
    } & BuzzsproutEpisodeWithSlug)
  | {
      type: "MESSAGE_VIDEO";
      id: string;
      title: string;
    };

function buildMessages(buzzsproutEpisodes: BuzzsproutEpisode[]) {
  const messages: Message[] = [];

  for (const episode of buzzsproutEpisodes.toSorted(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )) {
    const slug = episode.audio_url
      .replaceAll(".mp3", "")
      .split("/")
      .slice(-1)
      .join("");

    if (episode.tags) {
      const series = messages.find(
        (message) =>
          message.type === "MESSAGE_SERIES" && message.name === episode.tags
      );

      if (series && series.type === "MESSAGE_SERIES") {
        series.messages.push({ ...episode, slug });
        return messages;
      }

      messages.push({
        name: episode.tags,
        messages: [{ ...episode, slug }],
        type: "MESSAGE_SERIES",
      });
    } else {
      messages.push({
        ...episode,
        type: "MESSAGE_STANDALONE",
        slug,
      });
    }
  }

  // for (const {
  //   node: { data: message },
  // } of allPrismicVideo.edges) {
  //   messages.push({
  //     ...message.video,
  //     type: "MESSAGE_VIDEO",
  //   });
  // }

  return messages;
}
