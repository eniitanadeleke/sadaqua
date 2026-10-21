import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { formatShortDate } from "@/lib/format";
import styles from "./CauseDetails.module.css";

/** "Recent updates": the newest update and a link to all of them. */
export default function UpdateCard({ update, href }) {
  return (
    <section className={styles.block} aria-labelledby="recent-updates">
      <h2 id="recent-updates" className={styles.heading}>
        Recent updates
      </h2>
      <article className={styles.update}>
        <h3 className={styles.updateTitle}>{update.title}</h3>
        <p className={styles.updateDate}>{formatShortDate(update.date)}</p>
        <p className={styles.updateText}>{update.text}</p>
        <Link href={href} className={styles.link}>
          View all updates <RiArrowRightLine aria-hidden="true" />
        </Link>
      </article>
    </section>
  );
}
