import Link from "next/link";
import styles from "./not-found.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={styles.heading}>404 page not found</h1>
        <Link href="/">
          Go to homepage
          <FontAwesomeIcon className="fa-fw" icon={faAngleRight} />
        </Link>
      </div>
    </div>
  );
}
