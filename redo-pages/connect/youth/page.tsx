import { Layout, H2Kicker, Article, HtmlContent } from "@/components";
import { createClient, prismic } from "@/prismicio";

export default async function Youth() {
  const client = createClient();
  const { data: page } = await client.getSingle("connect_youth");

  return (
    <Layout>
      <hgroup>
        <h1>{prismic.asText(page.heading)}</h1>
        <H2Kicker>{prismic.asText(page.subheading)}</H2Kicker>
      </hgroup>
      <Article>
        <HtmlContent
          dangerouslySetInnerHTML={{
            __html: prismic.asHTML(page.content),
          }}
        />
      </Article>
    </Layout>
  );
}
