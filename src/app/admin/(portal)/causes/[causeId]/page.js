import Image from "next/image";
import Link from "next/link";
import {
  RiAddLine,
  RiArrowLeftLine,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiFileTextLine,
  RiHeartPulseLine,
  RiMapPinLine,
  RiShieldCheckLine,
  RiStethoscopeLine,
  RiTimeLine,
  RiUserLine,
} from "react-icons/ri";
import AdminStats from "@/components/admin/AdminStats";
import AdminStatus from "@/components/admin/AdminStatus";
import {
  ProgressCell,
  VerifiedPill,
  statusExtra,
} from "@/components/admin/CauseCell";
import {
  CauseActionModal,
  CauseStatusSelect,
} from "@/components/admin/CauseManagement";
import {
  ADMIN_CAUSE_STATUS,
  getCauseForManagement,
} from "@/lib/api/admin/causes";
import { isAdminDemo } from "@/lib/api/admin/demo";
import { getCategory } from "@/lib/categories";
import { formatDate, formatNaira, percentRaised } from "@/lib/format";
import styles from "./page.module.css";

export const metadata = { title: "Cause management | Sadaqua admin" };

function CauseStatus({ status, className = "" }) {
  const s = ADMIN_CAUSE_STATUS[status];
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

/** Cause Management: one published cause, its updates and its payouts */
export default async function CauseManagementPage({ params, searchParams }) {
  const { causeId } = await params;
  const query = await searchParams;
  const demo = await isAdminDemo(query);
  const cause = await getCauseForManagement(causeId, { demo });
  const here = `/admin/causes/${causeId}`;

  if (!cause) {
    return (
      <>
        <BackLink />
        <div className={styles.missing}>
          <h1 className={styles.missingTitle}>Cause not found</h1>
          <p>
            This cause doesn&apos;t exist or hasn&apos;t been published yet.
          </p>
          <Link href="/admin/causes" className={styles.missingLink}>
            Go to Approved Causes
          </Link>
        </div>
      </>
    );
  }

  const category = getCategory(cause.category);
  const percent = percentRaised(cause.raised, cause.goal);

  return (
    <>
      <BackLink />

      <section className={styles.top}>
        <Image
          src={cause.image}
          alt=""
          width={137}
          height={148}
          className={styles.photo}
          unoptimized
          priority
        />
        <div className={styles.summary}>
          <h1 className={styles.title}>{cause.title}</h1>
          <div className={styles.badges}>
            <VerifiedPill large />
            <CauseStatus status={cause.status} />
          </div>
          <p className={styles.meta}>
            <span>
              <RiHeartPulseLine aria-hidden="true" />
              {category?.label}
            </span>
            <span>
              <RiMapPinLine aria-hidden="true" />
              {cause.location}
            </span>
          </p>
          <p className={styles.meta}>
            <span>
              <RiCalendarLine aria-hidden="true" />
              Published {cause.publishedLabel}
            </span>
          </p>
        </div>
        <div className={styles.topActions}>
          <Link
            href={`${here}?action=fulfil`}
            scroll={false}
            className={styles.filledButton}
          >
            Mark as fulfilled
          </Link>
          <Link
            href={`${here}?action=close`}
            scroll={false}
            className={styles.outlinedButton}
          >
            Close cause
          </Link>
        </div>
      </section>

      <div className={styles.numbers}>
        <AdminStats
          className={styles.numberCards}
          items={[
            {
              label: "Goal",
              value: formatNaira(cause.goal),
              icon: RiFileTextLine,
              tone: "deep",
            },
            {
              label: "Raised",
              value: formatNaira(cause.raised),
              icon: RiTimeLine,
              tone: "gold",
            },
            {
              label: "Disbursed",
              value: formatNaira(cause.disbursed),
              icon: RiErrorWarningLine,
              tone: "orange",
            },
            {
              label: "Remaining",
              value: formatNaira(cause.remaining),
              icon: RiCheckboxCircleLine,
              tone: "green",
            },
          ]}
        />
        <div className={styles.funded}>
          <p className={styles.fundedValue}>{percent}% funded</p>
          <p className={styles.fundedText}>
            {formatNaira(cause.raised)} of {formatNaira(cause.goal)} raised
          </p>
          <ProgressCell
            percent={percent}
            label={null}
            className={styles.fundedBar}
          />
        </div>
      </div>

      <div className={styles.columns}>
        <div className={styles.column}>
          <section
            className={`${styles.card} ${styles.infoCard}`}
            aria-labelledby="info-title"
          >
            <h2 id="info-title" className={styles.cardTitle}>
              Cause information
            </h2>
            <dl className={styles.facts}>
              <Fact
                icon={RiHeartPulseLine}
                label="Category"
                value={category?.label}
              />
              <Fact
                icon={RiMapPinLine}
                label="Location"
                value={cause.location}
              />
              <Fact
                icon={RiCalendarLine}
                label="Published"
                value={longDate(cause.publishedAt)}
              />
              <Fact
                icon={RiUserLine}
                label="Recipient display preference"
                value={cause.displayPreference}
              />
              <Fact
                icon={RiShieldCheckLine}
                label="Verification status"
                value={<VerifiedPill large className={styles.factPill} />}
              />
            </dl>
            <h3 className={styles.needTitle}>Need</h3>
            <p className={styles.needText}>{cause.need}</p>
          </section>

          <section
            className={`${styles.card} ${styles.statusCard}`}
            aria-labelledby="status-title"
          >
            <h2 id="status-title" className={styles.cardTitle}>
              Cause status
            </h2>
            <CauseStatusSelect causeId={causeId} status={cause.status} />
          </section>
        </div>

        <div className={styles.column}>
          <section
            className={`${styles.card} ${styles.updatesCard}`}
            aria-labelledby="updates-title"
          >
            <div className={styles.cardHead}>
              <h2 id="updates-title" className={styles.cardTitle}>
                Impact update
              </h2>
              <Link
                href={`${here}?action=update`}
                scroll={false}
                className={styles.smallButton}
              >
                <RiAddLine aria-hidden="true" />
                Post update
              </Link>
            </div>
            <ul className={styles.updates}>
              {cause.updates.map((update) => (
                <li key={update.id} className={styles.update}>
                  {update.image ? (
                    <Image
                      src={update.image}
                      alt=""
                      width={72}
                      height={72}
                      className={styles.updateImage}
                      unoptimized
                    />
                  ) : (
                    <span className={styles.updateIcon} aria-hidden="true">
                      <RiStethoscopeLine />
                    </span>
                  )}
                  <div className={styles.updateBody}>
                    <h3 className={styles.updateTitle}>{update.title}</h3>
                    <p className={styles.updateDate}>
                      <RiCalendarLine aria-hidden="true" />
                      {update.date}
                    </p>
                    <p className={styles.updateText}>{update.text}</p>
                    <p className={styles.updatedBy}>
                      <RiCheckboxCircleLine aria-hidden="true" />
                      Updated by {update.by}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={`${styles.card} ${styles.historyCard}`}
            aria-labelledby="history-title"
          >
            <div className={styles.cardHead}>
              <h2 id="history-title" className={styles.cardTitle}>
                Disbursement history
              </h2>
              <Link
                href={`${here}?action=disburse`}
                scroll={false}
                className={styles.smallButton}
              >
                <RiAddLine aria-hidden="true" />
                Record disbursement
              </Link>
            </div>
            <table className={styles.history}>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {cause.disbursements.map((d) => (
                  <tr key={d.id}>
                    <td>{formatDate(d.date)}</td>
                    <td>{formatNaira(d.amount)}</td>
                    <td>{d.purpose}</td>
                    <td>
                      <CauseStatus status={d.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link
              href={`/admin/disbursements?${new URLSearchParams({ q: cause.title })}`}
              className={styles.viewAll}
            >
              View all
            </Link>
          </section>

          <p className={styles.note}>
            <RiErrorWarningLine aria-hidden="true" />
            You can mark this cause as fulfilled once the full payment has been
            disbursed and the need has been met
          </p>
        </div>
      </div>

      {query.action && (
        <CauseActionModal
          action={query.action}
          causeId={causeId}
          closeHref={here}
        />
      )}
    </>
  );
}

function BackLink() {
  return (
    <Link href="/admin/causes" className={styles.back}>
      <RiArrowLeftLine aria-hidden="true" />
      Back to requests
    </Link>
  );
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className={styles.fact}>
      <Icon className={styles.factIcon} aria-hidden="true" />
      <dt className={styles.factLabel}>{label}</dt>
      <dd className={styles.factValue}>{value}</dd>
    </div>
  );
}

/** "2026-09-16" -> "16 September 2026" (Figma: Cause information) */
function longDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
