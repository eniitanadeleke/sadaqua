"use client";

import { useState } from "react";
import Link from "next/link";
import { RiArrowRightSLine, RiNotification3Line } from "react-icons/ri";
import { signOutAllDevices } from "@/lib/api/admin/settings";
import notificationStyles from "../SettingsNotifications/SettingsNotifications.module.css";
import styles from "./SettingsSecurity.module.css";

/**
 * Security card body (Figma: Settings - Security): "Change password" opens
 * the Change Password pop-up; the second row signs out everywhere else.
 * (The Figma uses the bell here too.)
 */
export default function SettingsSecurity({ passwordHref }) {
  const [state, setState] = useState("idle"); // idle | busy | done | error

  async function signOutEverywhere() {
    setState("busy");
    try {
      await signOutAllDevices();
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <div className={notificationStyles.who}>
        <RiNotification3Line
          className={notificationStyles.bell}
          aria-hidden="true"
        />
        <div>
          <p className={notificationStyles.name}>Account Security</p>
          <p className={notificationStyles.line}>
            Keep your account safe and secured
          </p>
        </div>
      </div>

      <ul className={styles.rows}>
        <li>
          <Link href={passwordHref} scroll={false} className={styles.row}>
            Change password
            <RiArrowRightSLine className={styles.chevron} aria-hidden="true" />
          </Link>
        </li>
        <li>
          <button
            type="button"
            className={styles.row}
            onClick={signOutEverywhere}
            disabled={state === "busy"}
          >
            signout of all devices where you are signed in
            <RiArrowRightSLine className={styles.chevron} aria-hidden="true" />
          </button>
          {state === "done" && (
            <p className={styles.note} role="status">
              You have been signed out on your other devices.
            </p>
          )}
          {state === "error" && (
            <p className={`${styles.note} ${styles.error}`} role="alert">
              We could not do that. Please try again.
            </p>
          )}
        </li>
      </ul>
    </>
  );
}
