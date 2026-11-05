"use client";

import { useState } from "react";
import { RiNotification3Line } from "react-icons/ri";
import { updateNotificationSettings } from "@/lib/api/admin/settings";
import styles from "./SettingsNotifications.module.css";

const TOPICS = [
  { key: "newRequest", label: "New help request" },
  { key: "needsReview", label: "Request needing review" },
  { key: "decisions", label: "Verification decisions" },
  { key: "disbursements", label: "Disbursement activities" },
];

/**
 * Notification card body (Figma: Settings - Notification): the email switch
 * and what to be told about. Each change is saved straight away.
 */
export default function SettingsNotifications({ initial }) {
  const [settings, setSettings] = useState(initial);
  const [error, setError] = useState("");

  async function save(next) {
    const before = settings;
    setSettings(next);
    setError("");
    try {
      await updateNotificationSettings(next);
    } catch {
      setSettings(before);
      setError("We could not save that change. Please try again.");
    }
  }

  return (
    <>
      <div className={styles.who}>
        <RiNotification3Line className={styles.bell} aria-hidden="true" />
        <div>
          <p className={styles.name}>Email notification</p>
          <p className={styles.line}>Receive update for important activities</p>
        </div>
      </div>

      <fieldset className={styles.topics} disabled={!settings.email}>
        <legend className="visually-hidden">Email me about</legend>
        {TOPICS.map(({ key, label }) => (
          <label key={key} className={styles.topic}>
            <input
              type="checkbox"
              checked={settings.topics[key]}
              onChange={(event) =>
                save({
                  ...settings,
                  topics: { ...settings.topics, [key]: event.target.checked },
                })
              }
              className={styles.box}
            />
            {label}
          </label>
        ))}
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </fieldset>

      <button
        type="button"
        role="switch"
        aria-checked={settings.email}
        aria-label="Email notification"
        className={styles.switch}
        onClick={() => save({ ...settings, email: !settings.email })}
      >
        <span className={styles.knob} />
      </button>
    </>
  );
}
