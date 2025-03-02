import styles from "./html-content.module.css";

type Props = React.ComponentProps<"div">;

export function HtmlContent({ children, ...props }: Props) {
  return (
    <div {...props} className={styles.htmlContent}>
      {children}
    </div>
  );
}
