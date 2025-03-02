import styles from "./donate-link.module.css";

export function DonateLink() {
  return (
    <a
      className={styles.externalLink}
      href="https://tithe.ly/give?c=4633778"
      target="_blank"
    >
      Donate
    </a>
  );
}
