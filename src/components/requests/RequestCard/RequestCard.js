import Link from "next/link";
import {
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiEditLine,
  RiErrorWarningLine,
  RiMapPinLine,
  RiStethoscopeLine,
} from "react-icons/ri";
import CalendarIcon from "@/components/icons/CalendarIcon";
import HourglassIcon from "@/components/icons/HourglassIcon";
import RequestStatusBadge from "@/components/requests/RequestStatusBadge";
import { getCategory } from "@/lib/categories";
import { formatDate, formatNaira } from "@/lib/format";
import { getRequestStatus } from "@/lib/requestStatus";
import styles from "./RequestCard.module.css";

// The big round picture on the left. Healthcare requests show a stethoscope
// (Figma: Recipient Home); other categories use their usual icon.
const BIG_ICONS = { healthcare: RiStethoscopeLine };

// The icon in the green note on My request, by status.
// Recipient Home uses the plain "i" for every status.
const LIST_NOTE_ICONS = {
  under_review: { Icon: HourglassIcon, tone: "review" },
  verified: { Icon: RiCheckboxCircleLine, tone: "success" },
  needs_changes: { Icon: RiEditLine, tone: "error" },
};

/**
 * One help request, as a white card.
 *
 * variant: "home" - Recipient Home's "Your request" (no amount, no link)
 *          "list" - My request: adds the amount, a line and "View request"
 */
export default function RequestCard({ request, variant = "home" }) {
  const isList = variant === "list";
  const category = getCategory(request.category);
  const BigIcon = BIG_ICONS[request.category] ?? category.Icon;
  const CategoryIcon = category.Icon;
  const { note } = getRequestStatus(request.status);
  const noteIcon = isList
    ? LIST_NOTE_ICONS[request.status]
    : { Icon: RiErrorWarningLine, tone: "info" };

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.top}>
        <span className={styles.picture} aria-hidden="true">
          <BigIcon className={styles.bigIcon} />
        </span>

        <div className={styles.details}>
          <h3 className={styles.title}>{request.title}</h3>
          <ul className={styles.meta}>
            <li>
              <CategoryIcon className={styles.metaIcon} aria-hidden="true" />
              {category.label}
            </li>
            <li>
              <RiMapPinLine className={styles.metaIcon} aria-hidden="true" />
              {request.location}
            </li>
          </ul>

          {isList ? (
            <div className={styles.amountRow}>
              <p className={styles.amount}>
                <strong>{formatNaira(request.amount)}</strong> needed
              </p>
              <RequestStatusBadge status={request.status} />
            </div>
          ) : (
            <RequestStatusBadge
              status={request.status}
              className={styles.badge}
            />
          )}

          <p className={styles.date}>
            <CalendarIcon className={styles.metaIcon} />
            Submitted {formatDate(request.submittedAt)}
          </p>
        </div>
      </div>

      {note && (
        <div className={styles.note}>
          {noteIcon && (
            <span
              className={`${styles.noteIcon} ${styles[noteIcon.tone]}`}
              aria-hidden="true"
            >
              <noteIcon.Icon />
            </span>
          )}
          <p>
            {note.map((line, i) => (
              <span key={line} className={styles.noteLine}>
                {i > 0 && " "}
                {line}
              </span>
            ))}
          </p>
        </div>
      )}

      {isList && (
        <Link
          href={`/recipient/requests/${request.id}`}
          className={styles.view}
        >
          View request
          <RiArrowRightLine className={styles.viewIcon} aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}
