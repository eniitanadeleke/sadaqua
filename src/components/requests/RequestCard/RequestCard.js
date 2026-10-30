import {
  RiErrorWarningLine,
  RiMapPinLine,
  RiStethoscopeLine,
} from "react-icons/ri";
import CalendarIcon from "@/components/icons/CalendarIcon";
import RequestStatusBadge from "@/components/requests/RequestStatusBadge";
import { getCategory } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { getRequestStatus } from "@/lib/requestStatus";
import styles from "./RequestCard.module.css";

// The big round picture on the left. Healthcare requests show a stethoscope
// (Figma: Recipient Home); other categories use their usual icon.
const BIG_ICONS = { healthcare: RiStethoscopeLine };

/**
 * One help request on Recipient Home (Figma: "Your request" card):
 * category picture, title, category and place, status, date sent,
 * and a green note saying what happens next.
 */
export default function RequestCard({ request }) {
  const category = getCategory(request.category);
  const BigIcon = BIG_ICONS[request.category] ?? category.Icon;
  const CategoryIcon = category.Icon;
  const { note } = getRequestStatus(request.status);

  return (
    <article className={styles.card}>
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
          <RequestStatusBadge
            status={request.status}
            className={styles.badge}
          />
          <p className={styles.date}>
            <CalendarIcon className={styles.metaIcon} />
            Submitted {formatDate(request.submittedAt)}
          </p>
        </div>
      </div>

      {note && (
        <p className={styles.note}>
          <RiErrorWarningLine className={styles.noteIcon} aria-hidden="true" />
          <span>
            {note.map((line, i) => (
              <span key={line} className={styles.noteLine}>
                {i > 0 && " "}
                {line}
              </span>
            ))}
          </span>
        </p>
      )}
    </article>
  );
}
