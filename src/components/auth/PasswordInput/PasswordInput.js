"use client";

import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
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
  return <MdVisibility className={styles.icon} aria-hidden="true" />;
}

function EyeOffIcon() {
  return <MdVisibilityOff className={styles.icon} aria-hidden="true" />;
}
