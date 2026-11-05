"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiArrowLeftLine,
  RiCalendarLine,
  RiEyeLine,
  RiFileTextLine,
  RiHeartPulseLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
  RiTimerLine,
} from "react-icons/ri";
import AdminModal from "@/components/admin/AdminModal";
import AdminStatus from "@/components/admin/AdminStatus";
import InitialsAvatar from "@/components/admin/InitialsAvatar";
import {
  ADMIN_REQUEST_STATUS,
  submitRequestReview,
} from "@/lib/api/admin/requests";
import { formatDate, formatNaira } from "@/lib/format";
import styles from "./RequestReview.module.css";

const NOTES_LIMIT = 1000;

// Verification checks, in the Figma's words
const CHECKS = [
  {
    key: "identity",
    title: "Identity details checked",
    text: "Name and basic details match document.",
  },
  {
    key: "phone",
    title: "Phone number checked",
    text: "Active and reachable.",
  },
  {
    key: "location",
    title: "Location checked",
    text: "Matches address on document.",
  },
  {
    key: "document",
    title: "Supporting document reviewed",
    text: "Medical report is valid and recent.",
  },
  {
    key: "genuine",
    title: "Request appears genuine and meets sadaqua criteria",
    text: "To be confirmed based on overall assessment.",
  },
];

const OUTCOMES = [
  {
    value: "verified",
    title: "Verified",
    text: "The request is genuine and meets sadaqua criteria.",
  },
  {
    value: "unverified",
    title: "Unable to verified",
    text: "There are inconsistencies or insufficient information.",
  },
];

/**
 * Request Review & Verification (Figma): the request on the left, the
 * document and checks in the middle, the verification work on the right.
 *
 * request:      one request from getRequestForReview()
 * categoryLabel: e.g. "Healthcare"
 * modal:        "info" | "reject" | null - which pop-up is open (from the address)
 */
export default function RequestReview({ request, categoryLabel, modal }) {
  const router = useRouter();
  const base = `/admin/requests/${request.reference}`;
  const [outcome, setOutcome] = useState(request.outcome ?? "");
  const [checks, setChecks] = useState(request.checks ?? {});
  const [notes, setNotes] = useState(request.notes ?? "");
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");

  const status = ADMIN_REQUEST_STATUS[request.status];
  const review = { outcome, checks, notes };

  async function handleApprove() {
    setError("");
    setBusy("approve");
    try {
      await submitRequestReview(request.reference, "approve", review);
      router.push(`/admin/causes/publish/${request.reference}`);
    } catch (err) {
      setError(err.message);
      setBusy(null);
    }
  }

  return (
    <>
      <div className={styles.top}>
        <div>
          <Link href="/admin/requests" className={styles.back}>
            <RiArrowLeftLine aria-hidden="true" />
            Back to requests
          </Link>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Request {request.reference}</h1>
            <AdminStatus tone={status.tone}>{status.label}</AdminStatus>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${styles.approve}`}
            onClick={handleApprove}
            disabled={busy !== null}
            aria-busy={busy === "approve" || undefined}
          >
            {busy === "approve" ? "Approving…" : "Approve"}
          </button>
          <Link
            href={`${base}?action=info`}
            scroll={false}
            className={`${styles.button} ${styles.outline}`}
          >
            Request more information
          </Link>
          <Link
            href={`${base}?action=reject`}
            scroll={false}
            className={`${styles.button} ${styles.reject}`}
          >
            Reject
          </Link>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.grid}>
        {/* ---------- Left: the request ---------- */}
        <div className={styles.column}>
          <section className={styles.card} aria-labelledby="application-title">
            <h2 id="application-title" className={styles.cardTitle}>
              Application
            </h2>
            <div className={styles.applicant}>
              <InitialsAvatar name={request.applicant} tone="neutral" />
              <div>
                <p className={styles.name}>{request.applicant}</p>
                <p className={styles.meta}>
                  <RiHeartPulseLine aria-hidden="true" />
                  {categoryLabel} request
                </p>
                <p className={styles.meta}>
                  <RiMapPinLine aria-hidden="true" />
                  {request.location}
                </p>
              </div>
            </div>
          </section>

          <section className={styles.card} aria-labelledby="details-title">
            <h2 id="details-title" className={styles.cardTitle}>
              Request details
            </h2>
            <dl className={styles.details}>
              <Detail icon={RiHeartPulseLine} label="Category">
                {categoryLabel}
              </Detail>
              <Detail icon={RiMoneyDollarCircleLine} label="Amount needed">
                {formatNaira(request.amountNeeded)}
              </Detail>
              <Detail icon={RiTimerLine} label="Urgency" badge>
                <span
                  className={
                    request.urgency === "urgent" ? styles.urgent : styles.normal
                  }
                >
                  {request.urgency === "urgent" ? "Urgent" : "Normal"}
                </span>
              </Detail>
              <Detail icon={RiMapPinLine} label="Location">
                {request.location}
              </Detail>
              <Detail icon={RiCalendarLine} label="Submitted">
                {formatLongDate(request.submittedAt.slice(0, 10))}
              </Detail>
              <Detail icon={RiFileTextLine} label="Reference number">
                {request.reference}
              </Detail>
            </dl>
          </section>

          <section className={styles.card} aria-labelledby="why-title">
            <h2 id="why-title" className={styles.cardTitle}>
              Why help is needed
            </h2>
            <p className={styles.story}>{request.description}</p>
          </section>
        </div>

        {/* ---------- Middle: document and checks ---------- */}
        <div className={styles.column}>
          <section className={styles.card} aria-labelledby="document-title">
            <h2 id="document-title" className={styles.cardTitle}>
              Supporting document
            </h2>
            <div className={styles.document}>
              <Image
                src={request.document.image}
                alt={`Supporting document: ${request.document.name}`}
                fill
                sizes="360px"
                className={styles.documentImage}
                unoptimized
              />
            </div>
            <div className={styles.documentActions}>
              <a href={request.document.image} className={styles.docButton}>
                <RiEyeLine aria-hidden="true" />
                View document
              </a>
              <a
                href={request.document.image}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.docButton}
              >
                <RiEyeLine aria-hidden="true" />
                Open in new tab
              </a>
            </div>
          </section>

          <section className={styles.card} aria-labelledby="checks-title">
            <h2 id="checks-title" className={styles.cardTitle}>
              Verification checks
            </h2>
            <ul className={styles.checks}>
              {CHECKS.map((check) => (
                <li key={check.key}>
                  <label className={styles.check}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={Boolean(checks[check.key])}
                      onChange={(event) =>
                        setChecks((c) => ({
                          ...c,
                          [check.key]: event.target.checked,
                        }))
                      }
                    />
                    <span>
                      <span className={styles.checkTitle}>{check.title}</span>
                      <span className={styles.checkText}>{check.text}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ---------- Right: the officer's verification ---------- */}
        <div className={styles.column}>
          <section className={styles.card} aria-labelledby="outcome-title">
            <h2 id="outcome-title" className={styles.cardTitle}>
              Verification outcome
            </h2>
            <fieldset className={styles.outcomes}>
              <legend className="visually-hidden">Verification outcome</legend>
              {OUTCOMES.map((option) => (
                <label key={option.value} className={styles.outcome}>
                  <input
                    type="radio"
                    name="outcome"
                    value={option.value}
                    className={styles.radio}
                    checked={outcome === option.value}
                    onChange={() => setOutcome(option.value)}
                  />
                  <span>
                    <span className={styles.outcomeTitle}>{option.title}</span>
                    <span className={styles.outcomeText}>{option.text}</span>
                  </span>
                </label>
              ))}
            </fieldset>

            <label htmlFor="verification-notes" className={styles.notesTitle}>
              Verification notes
            </label>
            <textarea
              id="verification-notes"
              className={styles.notes}
              value={notes}
              maxLength={NOTES_LIMIT}
              onChange={(event) => setNotes(event.target.value)}
            />
            <p className={styles.counter} aria-live="polite">
              {notes.length}/{NOTES_LIMIT} Characters
            </p>
          </section>

          <section className={styles.card} aria-labelledby="next-title">
            <h2 id="next-title" className={styles.cardTitle}>
              Next steps
            </h2>
            <p className={styles.next}>
              After venification, you can approve the request.
              <br />
              It will then be reviewed for publication as a cause.
            </p>
          </section>

          <section className={styles.card} aria-labelledby="timeline-title">
            <h2 id="timeline-title" className={styles.cardTitle}>
              Request timeline
            </h2>
            <dl className={styles.timeline}>
              <div>
                <dt>Submitted</dt>
                <dd>{formatStamp(request.submittedAt)}</dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>{formatStamp(request.updatedAt)}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <AdminStatus tone={status.tone}>{status.label}</AdminStatus>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      {modal && (
        <DecisionModal
          kind={modal}
          request={request}
          review={review}
          closeHref={base}
        />
      )}
    </>
  );
}

function Detail({ icon: Icon, label, badge, children }) {
  return (
    <div className={styles.detail}>
      <Icon className={styles.detailIcon} aria-hidden="true" />
      <div>
        <dt className={styles.detailLabel}>{label}</dt>
        <dd className={badge ? styles.detailBadge : styles.detailValue}>
          {children}
        </dd>
      </div>
    </div>
  );
}

/** "2026-09-17T14:12" -> "17 Sept 2026, 02:12 PM" (Figma: Request timeline) */
function formatStamp(isoDateTime) {
  const [date, time = "00:00"] = isoDateTime.split("T");
  const [hours, minutes] = time.split(":").map(Number);
  const hour12 = String(hours % 12 || 12).padStart(2, "0");
  return `${formatDate(date)}, ${hour12}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
}

/** "2026-09-16" -> "16 September 2026" (Figma: Submitted) */
function formatLongDate(isoDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}

/**
 * "Request more information" and "Reject" ask for a message first.
 * The Figma has no frame for these pop-ups; this uses the admin pop-up card
 * with one text box (designer question).
 */
function DecisionModal({ kind, request, review, closeHref }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const isReject = kind === "reject";

  async function handleSubmit(event) {
    event.preventDefault();
    if (!message.trim()) {
      setError(
        isReject
          ? "Please give a reason."
          : "Please say what information is needed.",
      );
      return;
    }
    setSending(true);
    try {
      await submitRequestReview(
        request.reference,
        isReject ? "reject" : "request_info",
        {
          ...review,
          message: message.trim(),
        },
      );
      router.push("/admin/requests");
    } catch (err) {
      setError(err.message);
      setSending(false);
    }
  }

  return (
    <AdminModal
      title={isReject ? "Reject request" : "Request more information"}
      closeHref={closeHref}
      top={240}
    >
      <form onSubmit={handleSubmit} className={styles.modalForm} noValidate>
        <label htmlFor="decision-message" className={styles.modalLabel}>
          {isReject
            ? "Reason for rejecting"
            : "What do you need from the applicant?"}
        </label>
        <textarea
          id="decision-message"
          className={styles.modalText}
          value={message}
          maxLength={NOTES_LIMIT}
          onChange={(event) => {
            setMessage(event.target.value);
            if (error) setError("");
          }}
          aria-invalid={error ? true : undefined}
        />
        {error && (
          <p className={styles.modalError} role="alert">
            {error}
          </p>
        )}
        <div className={styles.modalActions}>
          <Link
            href={closeHref}
            scroll={false}
            className={`${styles.button} ${styles.outline}`}
          >
            Cancel
          </Link>
          <button
            type="submit"
            className={`${styles.button} ${isReject ? styles.rejectFilled : styles.approve}`}
            disabled={sending}
          >
            {sending ? "Sending…" : isReject ? "Reject" : "Send request"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
