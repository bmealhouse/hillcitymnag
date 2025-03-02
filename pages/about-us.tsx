import { PrismicNextImage } from "@prismicio/next";
import { Layout, Article } from "@/components";
import { createClient, prismic } from "@/prismicio";
import styles from "@/styles/about-us.module.css";

export default async function AboutUs() {
  const client = createClient();
  const { data: page } = await client.getSingle("about_us");

  return (
    <Layout>
      <hgroup>
        <h1>{prismic.asText(page.heading)}</h1>
      </hgroup>
      <Article highlight="even">
        <h2 className={styles.mission}>
          <span className={styles.leftQuote}>&ldquo;</span>
          {prismic.asText(page.content)}
          <span className={styles.rightQuote}>&rdquo;</span>
        </h2>
      </Article>
      <Article highlight="even">
        <h2>{prismic.asText(page.team_members_heading)}</h2>
        {page.team_members.map(
          ({
            team_member_photo,
            team_member_name,
            team_member_title,
            team_member_email,
          }) => (
            <div
              className={styles.teamMember}
              key={prismic.asText(team_member_name)}
            >
              <PrismicNextImage
                field={team_member_photo}
                width={196}
                height={196}
                imgixParams={{ w: 196, ar: "1:1", fit: "crop" }}
                alt=""
                style={{
                  // objectFit: "cover",
                  // objectPosition: "50% 50%",
                  border: "2px solid hsla(47, 21%, 80%, 0.5)",
                  borderRadius: "9999px",
                }}
              />
              <div className={styles.teamMemberDetails}>
                <h3 className={styles.name}>
                  {prismic.asText(team_member_name)}
                </h3>
                <h4 className={styles.title}>{team_member_title}</h4>
                <a href={`mailto:${team_member_email}`}>{team_member_email}</a>
              </div>
            </div>
          )
        )}
      </Article>
    </Layout>
  );
}
