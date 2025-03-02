import { Layout, Article, HtmlContent } from "@/components";
import { createClient, prismic } from "@/prismicio";

export default async function Beliefs() {
  const client = createClient();
  const { data: page } = await client.getSingle("beliefs");

  return (
    <Layout>
      <hgroup>
        <h1>{prismic.asText(page.heading)}</h1>
      </hgroup>
      <div>
        {page.beliefs.map((belief) => (
          <Article key={prismic.asText(belief.belief_heading)} highlight="odd">
            <h2>{prismic.asText(belief.belief_heading)}</h2>
            <HtmlContent
              dangerouslySetInnerHTML={{
                __html: prismic.asHTML(belief.belief_content),
              }}
            />
          </Article>
        ))}
      </div>
    </Layout>
  );
}
