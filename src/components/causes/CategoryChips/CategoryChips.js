import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import styles from "./CategoryChips.module.css";

/** The six coloured category pills. Each opens the causes list filtered by it. */
export default function CategoryChips({ baseHref = "/giver/causes" }) {
  return (
    <ul className={styles.chips}>
      {CATEGORIES.filter((category) => category.onHome).map(({ key, label, Icon, color, background }) => (
        <li key={key}>
          <Link
            href={`${baseHref}?category=${key}`}
            className={styles.chip}
            style={{ "--chip-color": color, "--chip-bg": background }}
          >
            <Icon className={styles.icon} aria-hidden="true" />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
