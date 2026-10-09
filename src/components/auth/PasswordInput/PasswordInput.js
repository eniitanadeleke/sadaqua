"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import styles from "./PasswordInput.module.css";

/**
 * Password field with a show/hide eye button.
 * Takes the same props as Input (label, error, hint, placeholder...).
 *
 * This file needs "use client" because it remembers whether the password
 * is visible (useState) and reacts to clicks, which only happens in the browser.
 */
export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false);

  const toggle = (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setVisible((v) => !v)}
      aria-label={visible ? "Hide password" : "Show password"}
      aria-pressed={visible}
    >
      {visible ? <EyeIcon /> : <EyeOffIcon />}
    </button>
  );

  return (
    <Input
      autoComplete="current-password"
      {...props}
      type={visible ? "text" : "password"}
      suffix={toggle}
    />
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M12 5C6.5 5 2.7 9.1 1.5 12c1.2 2.9 5 7 10.5 7s9.3-4.1 10.5-7C21.3 9.1 17.5 5 12 5Zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M3.3 2 2 3.3l3.1 3.1C3.4 7.8 2.1 9.8 1.5 12c1.2 2.9 5 7 10.5 7 2 0 3.8-.5 5.3-1.4l3.4 3.4 1.3-1.3L3.3 2ZM12 16.5A4.5 4.5 0 0 1 7.5 12c0-.8.2-1.5.5-2.1l1.5 1.5a2.5 2.5 0 0 0 3.1 3.1l1.5 1.5c-.6.3-1.3.5-2.1.5Zm0-11.5c5.5 0 9.3 4.1 10.5 7-.5 1.3-1.5 2.8-2.9 4.1l-3.1-3.1c.1-.3.1-.7.1-1A4.5 4.5 0 0 0 12 7.5c-.3 0-.7 0-1 .1L8.7 5.3C9.7 5.1 10.8 5 12 5Z" />
    </svg>
  );
}
