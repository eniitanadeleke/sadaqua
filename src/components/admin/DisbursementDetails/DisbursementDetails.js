import Image from "next/image";
import Link from "next/link";
import {
  RiDownload2Line,
  RiFilePdf2Line,
  RiHeartPulseLine,
  RiMapPinLine,
} from "react-icons/ri";
import AdminDrawer from "@/components/admin/AdminDrawer";
import AdminStatus from "@/components/admin/AdminStatus";
import { statusExtra } from "@/components/admin/CauseCell";
import { DISBURSEMENT_STATUS } from "@/lib/api/admin/disbursements";
import { getCategory } from "@/lib/categories";
import { formatDate, formatNaira } from "@/lib/format";
import styles from "./DisbursementDetails.module.css";

/** Completed (deep green) or Pending (gold at 10%) */
export function DisbursementStatus({ status, className = "" }) {
  const s = DISBURSEMENT_STATUS[status];
  if (s.tone === "pending") {
    return (
      <AdminStatus
        tone="gold"
        className={`${statusExtra.pending} ${className}`}
      >
        {s.label}
      </AdminStatus>
    );
  }
  return (
    <AdminStatus tone={s.tone} className={className}>
      {s.label}
    </AdminStatus>
  );
}

/**
 * The panel that opens over the Disbursements list (Figma: Disbursements details).
 * disbursement: one item from getDisbursement()
 * closeHref:    the list address without ?view
 */
export default function DisbursementDetails({ disbursement: d, closeHref }) {
  const category = getCategory(d.category);
  const rows = [
    ["Reference number", d.reference],
    ["Amount", formatNaira(d.amount)],
    ["Purpose", d.purpose],
    ["Date", formatDate(d.date)],
    [
      "Recorded by",
      <>
        {d.recordedBy.name}{" "}
        <small className={styles.role}>{d.recordedBy.role}</small>
      </>,
    ],
    ["Recipient display name", d.recipientDisplayName],
    ["Status", <DisbursementStatus key="s" status={d.status} />],
  ];

  return (
    <AdminDrawer
      title={<span className={styles.title}>Disbursement details</span>}
      closeHref={closeHref}
    >
      <div className={styles.cause}>
        <Image
          src={d.image}
          alt=""
          width={84}
          height={84}
          className={styles.photo}
          unoptimized
        />
        <div>
          <p className={styles.causeTitle}>{d.cause}</p>
          <p className={styles.meta}>
            <span>
              <RiHeartPulseLine aria-hidden="true" />
              {category?.label}
            </span>
            <span>
              <RiMapPinLine aria-hidden="true" />
              {d.location}
            </span>
          </p>
          <AdminStatus tone="green" className={styles.causeStatus}>
            Active
          </AdminStatus>
        </div>
      </div>

      <dl className={styles.rows}>
        {rows.map(([label, value]) => (
          <div key={label} className={styles.row}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <h3 className={styles.evidenceTitle}>Supporting evidence</h3>
      <div className={styles.file}>
        <RiFilePdf2Line className={styles.pdf} aria-hidden="true" />
        <div className={styles.fileText}>
          <p className={styles.fileName}>{d.evidence.name}</p>
          <p className={styles.fileSize}>{d.evidence.size}</p>
        </div>
        <a
          href="#"
          className={styles.download}
          aria-label={`Download ${d.evidence.name}`}
          title="Available when the backend is connected"
        >
          <RiDownload2Line aria-hidden="true" />
        </a>
      </div>
      <p className={styles.note}>{d.note}</p>

      <Link href={closeHref} scroll={false} className={styles.close}>
        Close
      </Link>
    </AdminDrawer>
  );
}
