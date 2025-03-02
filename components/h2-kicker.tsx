import styles from "./h2-kicker.module.css";

type Props = React.ComponentProps<"h2">;

export function H2Kicker({ children, ...props }: Props) {
  return (
    <h2 {...props} className={styles.h2Kicker}>
      {children}
    </h2>
  );
}
