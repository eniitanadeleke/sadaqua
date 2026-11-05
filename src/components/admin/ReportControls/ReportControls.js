"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiArrowDownSLine, RiCalendarLine } from "react-icons/ri";
import {
  REPORT_PERIODS,
  formatReportDate,
  rangeForPeriod,
} from "@/lib/api/admin/reports";
import styles from "./ReportControls.module.css";

/**
 * Period dropdown, From / To dates and "Share report" (Figma: Reports).
 * Every change goes into the address (?period=&from=&to=) and the page
 * redraws with that range.
 */
export default function ReportControls({ period, from, to }) {
  const router = useRouter();
  const pathname = usePathname();

  function go(next) {
    const query = new URLSearchParams({ period, from, to, ...next });
    router.replace(`${pathname}?${query}`, { scroll: false });
  }

  function choosePeriod(value) {
    if (value === "custom") go({ period: value });
    else go({ period: value, ...rangeForPeriod(value) });
  }

  function chooseDate(key, value) {
    if (!value) return;
    const next = { period: "custom", from, to, [key]: value };
    if (next.from > next.to) next[key === "from" ? "to" : "from"] = value;
    go(next);
  }

  const shareHref = `${pathname}?${new URLSearchParams({ period, from, to, share: "1" })}`;

  return (
    <div className={styles.row}>
      <label className={styles.period}>
        <span className={styles.periodText}>
          {REPORT_PERIODS.find((p) => p.value === period)?.label ?? "This week"}
        </span>
        <RiArrowDownSLine className={styles.chevron} aria-hidden="true" />
        <select
          value={period}
          onChange={(event) => choosePeriod(event.target.value)}
          className={styles.select}
          aria-label="Report period"
        >
          {REPORT_PERIODS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      <DateBox
        label="From"
        value={from}
        onChange={(v) => chooseDate("from", v)}
      />
      <DateBox label="To" value={to} onChange={(v) => chooseDate("to", v)} />

      <Link href={shareHref} scroll={false} className={styles.share}>
        Share report
      </Link>
    </div>
  );
}

/** "From / 01 Sept 2026" box with a calendar; the real date picker is invisible on top */
function DateBox({ label, value, onChange }) {
  return (
    <label className={styles.date}>
      <span className={styles.dateLabel}>{label}</span>
      <span className={styles.dateValue}>{formatReportDate(value)}</span>
      <RiCalendarLine className={styles.calendar} aria-hidden="true" />
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onClick={(event) => event.currentTarget.showPicker?.()}
        className={styles.dateInput}
        aria-label={`${label} date`}
      />
    </label>
  );
}
