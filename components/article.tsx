import styles from "./article.module.css";

type Props = React.ComponentProps<"article"> & {
  id?: string;
  highlight?: "even" | "odd" | null;
};

export function Article({ id, children, highlight = null, ...props }: Props) {
  const variant = highlight ? styles[`article_${highlight}`] : styles.article;

  return (
    <article {...props} className={variant} id={id}>
      {children}
    </article>
  );
}
