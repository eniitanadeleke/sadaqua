import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiShieldCheckFill } from "react-icons/ri";
import styles from "./CauseCell.module.css";

/**
 * Pieces shared by the admin cause and disbursement screens
 * (Figma: Approved Causes, Cause Management, Disbursements).
 */

/** Green "Verified" pill with the shield (Figma: 24px, or 28px on Cause Management) */
export function VerifiedPill({ large = false, className = "" }) {
  return (
    <span
      className={`${styles.verified} ${large ? styles.verifiedLarge : ""} ${className}`}
    >
      <RiShieldCheckFill className={styles.shield} aria-hidden="true" />
      Verified
    </span>
  );
}

/** 48px cause photo, title, then the place and the Verified pill (Approved Causes) */
export function CauseCell({ cause }) {
  return (
    <span className={styles.cause}>
      <Image
        src={cause.image}
        alt=""
        width={48}
        height={48}
        className={styles.thumb}
        unoptimized
      />
      <span className={styles.causeText}>
        <span className={styles.causeTitle}>{cause.title}</span>
        <span className={styles.causeMeta}>
          <span className={styles.place}>{cause.location}</span>
          <VerifiedPill />
        </span>
      </span>
    </span>
  );
}

/** "45%" over a thin bar (Approved Causes, Cause Management) */
export function ProgressCell({ percent, label, className = "" }) {
  return (
    <span className={`${styles.progress} ${className}`}>
      {label !== null && (
        <span className={styles.percent}>{label ?? `${percent}%`}</span>
      )}
      <span
        className={styles.track}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className={styles.fill} style={{ width: `${percent}%` }} />
      </span>
    </span>
  );
}

/** Green "Manage ->" / "View ->" link in the Action column */
export function ActionLink({ href, children, scroll }) {
  return (
    <Link href={href} className={styles.action} scroll={scroll}>
      {children} <RiArrowRightLine aria-hidden="true" />
    </Link>
  );
}

/** Extra status colours that the shared AdminStatus does not have:
 *  "pending" = gold at 10% (Fully funded, Pending) */
export const statusExtra = styles;
