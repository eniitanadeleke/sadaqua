import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import styles from "./BackHeader.module.css";

/** Back arrow + page title row (Figma: "<- Browse causes", "<- Cause details"). */
export default function BackHeader({ title, backHref, className = "" }) {
  return (
    <div className={`${styles.row} ${className}`}>
      <Link href={backHref} className={styles.back} aria-label="Go back">
        <RiArrowLeftLine aria-hidden="true" />
      </Link>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
