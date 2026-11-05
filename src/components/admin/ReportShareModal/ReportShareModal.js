"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RiCalendarLine,
  RiCheckLine,
  RiCloseCircleLine,
  RiFileExcel2Line,
  RiFilePdf2Line,
} from "react-icons/ri";
import AdminModal from "@/components/admin/AdminModal";
import DotSpinner from "@/components/ui/DotSpinner";
import {
  exportReport,
  formatReportPeriod,
  reportSummaryText,
} from "@/lib/api/admin/reports";
import styles from "./ReportShareModal.module.css";

const INCLUDES = ["Registered users", "Donations", "Causes", "Disbursements"];

const FORMATS = [
  {
    value: "pdf",
    label: "PDF",
    text: "Best for sharing and printing",
    icon: RiFilePdf2Line,
  },
  {
    value: "excel",
    label: "Excel",
    text: "Best for editing and analysis",
    icon: RiFileExcel2Line,
  },
];

/**
 * Share report (Figma: Share Reports, Share Reports-1, Share Reports-2):
 * choose the format -> "Processing" -> "Report ready" with Download and
 * Copy report summary.
 *
 * report:    the numbers on the page
 * range:     { from, to }
 * closeHref: the Reports page without ?share
 */
export default function ReportShareModal({ report, range, closeHref }) {
  const [format, setFormat] = useState("pdf");
  const [stage, setStage] = useState("choose"); // choose | processing | ready
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function prepare() {
    setStage("processing");
    setError("");
    try {
      setFile(await exportReport(report, range, format));
      setStage("ready");
    } catch (err) {
      setError(
        err.message || "We could not prepare the report. Please try again.",
      );
      setStage("choose");
    }
  }

  function download() {
    const url = URL.createObjectURL(
      new Blob([file.content], { type: file.type }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = file.fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(reportSummaryText(report, range));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Copying is blocked in this browser.");
    }
  }

  if (stage === "ready") {
    return (
      <AdminModal
        closeHref={closeHref}
        width={434}
        className={styles.readyCard}
      >
        <span className={styles.tick} aria-hidden="true">
          <RiCheckLine />
        </span>
        <h2 className={styles.readyTitle}>Report ready</h2>
        <p className={styles.readyText}>
          Your report for {formatReportPeriod(range, "plain")} has been prepared
          and is ready to be download.
        </p>
        <button type="button" className={styles.primary} onClick={download}>
          Download report
        </button>
        <button type="button" className={styles.outline} onClick={copySummary}>
          {copied ? "Copied!" : "Copy report summary"}
        </button>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </AdminModal>
    );
  }

  const busy = stage === "processing";

  return (
    <AdminModal closeHref={closeHref} width={545} className={styles.card}>
      <Link
        href={closeHref}
        scroll={false}
        className={styles.close}
        aria-label="Close"
      >
        <RiCloseCircleLine aria-hidden="true" />
      </Link>

      <h2 className={styles.title}>Share report</h2>
      <p className={styles.subtitle}>
        Your report will be exported and can be shared outside Sadaqua
      </p>

      <h3 className={styles.heading}>Report period</h3>
      <p className={styles.period}>
        <RiCalendarLine className={styles.calendar} aria-hidden="true" />
        <span>{formatReportPeriod(range, "padded")}</span>
      </p>

      <h3 className={`${styles.heading} ${styles.includesHeading}`}>
        Report includes
      </h3>
      <ul className={styles.includes}>
        {INCLUDES.map((item) => (
          <li key={item}>
            <RiCheckLine className={styles.check} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <fieldset className={styles.formats} disabled={busy}>
        <legend className={`${styles.heading} ${styles.formatHeading}`}>
          Choose format
        </legend>
        <div className={styles.formatRow}>
          {FORMATS.map(({ value, label, text, icon: Icon }) => (
            <label key={value} className={styles.format}>
              <input
                type="radio"
                name="format"
                value={value}
                checked={format === value}
                onChange={() => setFormat(value)}
                className={styles.radio}
              />
              <Icon
                className={`${styles.fileIcon} ${styles[value]}`}
                aria-hidden="true"
              />
              <span className={styles.formatLabel}>{label}</span>
              <span className={styles.formatText}>{text}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.actions}>
        <Link href={closeHref} scroll={false} className={styles.cancel}>
          Cancel
        </Link>
        <button
          type="button"
          className={`${styles.primary} ${styles.download} ${busy ? styles.busy : ""}`}
          onClick={prepare}
          disabled={busy}
          aria-busy={busy || undefined}
        >
          {busy ? (
            <>
              Processing
              <DotSpinner className={styles.spinner} />
            </>
          ) : (
            "Download report"
          )}
        </button>
      </div>
    </AdminModal>
  );
}
