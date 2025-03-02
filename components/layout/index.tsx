import { prismic, createClient } from "@/prismicio";
import { routeMap } from "@/lib/route-map";
import { SiteHeader } from "./site-header";
import { ContactUs } from "./contact-us";
import { SiteFooter } from "./site-footer";
import styles from "./layout.module.css";

type Props = {
  children: React.ReactNode;
};

export async function Layout({ children }: Props) {
  const client = createClient();
  const { data: layout } = await client.getSingle("layout");

  const data = {
    name: {
      text: "NAME",
    },
    location: {
      latitude: 0,
      longitude: 0,
    },
    address: {
      html: "<strong>ADDRESS</strong>",
    },
    phone: {
      text: "PHONE",
    },
    email: {
      text: "EMAIL",
    },
  };

  // const {
  //   layout: { data },
  // } = useStaticQuery(graphql`
  //   query LayoutQuery {
  //     layout: prismicLayout {
  //       data {
  //         name {
  //           text
  //         }
  //         location {
  //           latitude
  //           longitude
  //         }
  //         address {
  //           html
  //         }
  //         phone {
  //           text
  //         }
  //         email {
  //           text
  //         }
  //       }
  //     }
  //   }
  // `);

  const links = layout.links.map((link) => {
    if (prismic.isFilled.contentRelationship(link.link_route)) {
      return {
        id: link.link_route.type,
        link_text: link.link_text,
        route: routeMap[link.link_route.type],
        display_in_header: link.display_in_header,
        display_in_footer: link.display_in_footer,
      };
    }

    return {
      id: "donate" as const,
      link_text: link.link_text,
      route: null,
      display_in_header: link.display_in_header,
      display_in_footer: link.display_in_footer,
    };
  });

  return (
    <>
      <div className={styles.container}>
        <SiteHeader layout={layout} {...data} links={links} />
        <main className={styles.main}>{children}</main>
      </div>
      <ContactUs />
      <SiteFooter layout={layout} links={links} />
    </>
  );
}
