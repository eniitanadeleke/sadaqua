import Image from "next/image";
import Link from "next/link";
import { TbArrowRight, TbMapPin } from "react-icons/tb";
import CauseProgress from "@/components/causes/CauseProgress";
import { getCategory } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import styles from "./ImpactCard.module.css";

/** A cause the giver supported, with its latest update (Figma: Your impact). */
export default function ImpactCard({ cause }) {
  const category = getCategory(cause.category);
  return (
    <article className={styles.card}>
      <div className={styles.photo}>
        <Image src={cause.image} alt="" fill sizes="112px" />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{cause.title}</h3>
        <ul className={styles.meta}>
          {category && (
            <li>
              <category.Icon className={styles.metaIcon} aria-hidden="true" />
              {category.label}
            </li>
          )}
          <li>
            <TbMapPin className={styles.metaIcon} aria-hidden="true" />
            {cause.location}
          </li>
        </ul>

        <CauseProgress raised={cause.raised} goal={cause.goal} size="xs" className={styles.progress} />

        {cause.latestUpdate && (
          <div className={styles.update}>
            <p className={styles.updateLabel}>Latest update</p>
            <p className={styles.updateTitle}>{cause.latestUpdate.title}</p>
            <p className={styles.updateDate}>{formatDate(cause.latestUpdate.date)}</p>
            <Link href={`/giver/impact?cause=${cause.id}`} className={styles.updateLink}>
              View updates <TbArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
