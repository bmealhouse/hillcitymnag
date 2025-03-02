import Link from "next/link";
import { linkGroups } from "@/lib/link-groups";
import { prismic } from "@/prismicio";
import { DonateLink } from "./donate-link";
import layoutStyles from "./layout.module.css";
import styles from "./site-footer.module.css";

type Props = {
  layout: {
    name: prismic.RichTextField;
    address: prismic.RichTextField;
    email: prismic.RichTextField;
    phone: prismic.RichTextField;
  };
  links: Array<
    | {
        id:
          | "church"
          | "beliefs"
          | "about_us"
          | "connect_children"
          | "connect_youth"
          | "connect_adult"
          | "events"
          | "messages"
          | "sermons";
        link_text: prismic.KeyTextField;
        route: string;
        display_in_footer: prismic.BooleanField;
      }
    | {
        id: "donate";
        link_text: prismic.KeyTextField;
        route: null;
        display_in_footer: prismic.BooleanField;
      }
  >;
};

export function SiteFooter({ layout, links }: Props) {
  return (
    <>
      <footer className={styles.footer}>
        <div className={layoutStyles.container}>
          <div className={styles.siteLinks}>
            {Object.entries(linkGroups).map(([group, groupLinks]) => (
              <section key={group} className={styles.section}>
                <h2 className={styles.sectionTitle}>{group}</h2>
                <ul className={layoutStyles.unorderedList}>
                  {links
                    .filter(
                      ({ id, display_in_footer }) =>
                        display_in_footer && groupLinks.includes(id)
                    )
                    .map(({ id, link_text, route }) => (
                      <li key={id} className={styles.listItem}>
                        {id === "donate" ? (
                          <DonateLink />
                        ) : (
                          <Link href={route}>
                            {link_text?.replace("Connect - ", "")}
                          </Link>
                        )}
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
          <div className={styles.contactInfo}>
            <a
              className={styles.locationMap}
              href="https://goo.gl/maps/5GgQHKP4mGWzPgmAA"
              target="_blank"
            />
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {prismic.asText(layout.name)}
              </h2>
              <address
                className={styles.address}
                dangerouslySetInnerHTML={{
                  __html: prismic.asHTML(layout.address) ?? "",
                }}
              />
              <a
                className={styles.contactMethod}
                href={`mailto:${prismic.asText(layout.email)}`}
              >
                {prismic.asText(layout.email)}
              </a>
              <a
                className={styles.contactMethod}
                href={`tel:+1${prismic
                  .asText(layout.phone)
                  ?.replace(/\D/g, "")}`}
              >
                {prismic.asText(layout.phone)}
              </a>
            </section>
          </div>
        </div>
      </footer>
      <footer className={styles.footer} style={{ backgroundColor: "#1b1b1b" }}>
        <div className={layoutStyles.container}>
          <section className={styles.section} style={{ margin: 0 }}>
            <small className={layoutStyles.small}>
              © {prismic.asText(layout.name)}
            </small>
          </section>
        </div>
      </footer>
    </>
  );
}
