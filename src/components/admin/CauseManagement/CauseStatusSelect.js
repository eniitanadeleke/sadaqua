"use client";

import { useState } from "react";
import { RiArrowDownSLine, RiErrorWarningLine } from "react-icons/ri";
import {
  ADMIN_CAUSE_STATUS,
  CAUSE_STATUS_NOTES,
  updateCause,
} from "@/lib/api/admin/causes";
import styles from "./CauseManagement.module.css";

/**
 * "Cause status" dropdown with the note under it (Figma: Cause Management).
 * Changing it saves straight away.
 */
export default function CauseStatusSelect({ causeId, status }) {
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleChange(event) {
    const next = event.target.value;
    setValue(next);
    setSaving(true);
    setMessage("");
    try {
      await updateCause(causeId, { type: "status", status: next });
      setMessage("Status saved.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className={styles.selectBox}>
        <select
          value={value}
          onChange={handleChange}
          disabled={saving}
          className={styles.select}
          aria-label="Cause status"
        >
          {Object.entries(ADMIN_CAUSE_STATUS).map(([key, s]) => (
            <option key={key} value={key}>
              {s.label}
            </option>
          ))}
        </select>
        <RiArrowDownSLine className={styles.selectChevron} aria-hidden="true" />
      </div>
      <p className={styles.statusNote}>
        <RiErrorWarningLine aria-hidden="true" />
        {CAUSE_STATUS_NOTES[value]}
      </p>
      <p className={styles.saved} role="status">
        {saving ? "Saving..." : message}
      </p>
    </>
  );
}
