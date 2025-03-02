import { Layout, H2Kicker, Article, HtmlContent } from "@/components";
import { createClient, prismic } from "@/prismicio";

export default async function Church() {
  const client = createClient();
  const { data: page } = await client.getSingle("church");

  return (
    <Layout>
      <hgroup>
        <h1>{prismic.asText(page.heading)}</h1>
        <H2Kicker>{prismic.asText(page.subheading)}</H2Kicker>
      </hgroup>
      {page.sections.map((section) => (
        <Article key={prismic.asText(section.section_heading)} highlight="even">
          <h3>{prismic.asText(section.section_heading)}</h3>
          <HtmlContent
            dangerouslySetInnerHTML={{
              __html: prismic.asHTML(section.section_content),
            }}
          />
        </Article>
      ))}
    </Layout>
  );
}

// export const pageQuery = graphql`
//   query ChurchQuery {
//     page: prismicChurch {
//       data {
//         heading {
//           text
//         }
//         subheading {
//           text
//         }
//         sections {
//           heading: section_heading {
//             text
//           }
//           content: section_content {
//             html
//           }
//         }
//       }
//     }
//   }
// `;
