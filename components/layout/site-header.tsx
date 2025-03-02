"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import website from "@/lib/config";
import { linkGroups } from "@/lib/link-groups";
import { prismic } from "@/prismicio";
import logo from "@/public/light-logo.svg";
import { DonateLink } from "./donate-link";
import layoutStyles from "./layout.module.css";
import styles from "./site-header.module.css";

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
        display_in_header: prismic.BooleanField;
        display_in_footer: prismic.BooleanField;
      }
    | {
        id: "donate";
        link_text: prismic.KeyTextField;
        route: null;
        display_in_header: prismic.BooleanField;
        display_in_footer: prismic.BooleanField;
      }
  >;
};

export function SiteHeader({ links }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [navState, setNavState] = useState<{
    openGroup: string | null;
    trigger: string | null;
  }>({
    openGroup: null,
    trigger: null,
  });

  let leaveTimeoutId: NodeJS.Timeout;
  useEffect(() => {
    return () => {
      clearTimeout(leaveTimeoutId);
    };
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link className={styles.link} href="/" style={{ flexShrink: 0 }}>
          <Image className={styles.logo} src={logo} alt={website.title} />
        </Link>
        <div className={styles.menuWrapper}>
          <ul className={styles.menu}>
            {Object.entries(linkGroups).map(([group, groupLinks]) => (
              <li className={styles.menuGroupWrapper} key={group}>
                <div
                  className={styles.menuGroup}
                  onMouseEnter={() => {
                    clearTimeout(leaveTimeoutId);
                    setNavState((previousState) => {
                      if (previousState.openGroup !== group) {
                        return { openGroup: group, trigger: "hover" };
                      }

                      return { openGroup: null, trigger: null };
                    });
                  }}
                  onMouseLeave={() => {
                    leaveTimeoutId = setTimeout(() => {
                      setNavState({ openGroup: null, trigger: null });
                    }, 150);
                  }}
                  onClick={() => {
                    setNavState((previousState) => {
                      if (previousState.openGroup !== group) {
                        return { openGroup: group, trigger: "click" };
                      }

                      return { openGroup: null, trigger: null };
                    });
                  }}
                >
                  {group}
                </div>
                <div
                  className={styles.submenu}
                  style={{
                    display: navState.openGroup === group ? "block" : "none",
                  }}
                  onMouseEnter={() => {
                    clearTimeout(leaveTimeoutId);
                  }}
                  onMouseLeave={() => {
                    leaveTimeoutId = setTimeout(() => {
                      setNavState({ openGroup: null, trigger: null });
                    }, 150);
                  }}
                >
                  <ul>
                    {links
                      .filter(
                        ({ id, display_in_header }) =>
                          display_in_header && groupLinks.includes(id)
                      )
                      .map(({ id, link_text, route }) => (
                        <li key={id}>
                          {id === "donate" ? (
                            <DonateLink />
                          ) : (
                            <Link
                              className={styles.link}
                              href={route}
                              onClick={() => {
                                setIsOpen(false);
                                setNavState({ openGroup: null, trigger: null });
                              }}
                            >
                              {link_text?.replace("Connect - ", "")}
                            </Link>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <button
            className={styles.menuToggle}
            onClick={() => {
              setIsOpen((currentValue) => !currentValue);
            }}
          >
            <FontAwesomeIcon icon={faBars} size="2x" />
            <small className={layoutStyles.small}>MENU</small>
          </button>
        </div>
      </div>
      <div
        className={styles.mobileMenu}
        style={{ transform: isOpen ? "translateY(0)" : "translateY(-100%)" }}
      >
        <ul>
          {Object.entries(linkGroups).map(([group, groupLinks]) => (
            <li key={group}>
              <div className={styles.menuGroup}>{group}</div>
              <div className={styles.submenu}>
                <ul>
                  {links
                    .filter(
                      ({ id, display_in_header }) =>
                        display_in_header && groupLinks.includes(id)
                    )
                    .map(({ id, link_text, route }) => (
                      <li key={id}>
                        {id === "donate" ? (
                          <DonateLink />
                        ) : (
                          <Link
                            className={styles.link}
                            href={route}
                            onClick={() => {
                              setIsOpen(false);
                            }}
                          >
                            {link_text?.replace("Connect - ", "")}
                          </Link>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
