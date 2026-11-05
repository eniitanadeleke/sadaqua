"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { adminRequestPasswordReset } from "@/lib/api/admin/session";
import { validateEmail } from "@/lib/validation";
import loginStyles from "../AdminLoginForm/AdminLoginForm.module.css";
import styles from "./AdminForgotForm.module.css";

/**
 * Admin Forgot Password. The Figma has no "link sent" screen, so after
 * sending, the same card says where the link went (designer question).
 */
export default function AdminForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const problem = validateEmail(email);
    setError(problem);
    if (problem) {
      event.currentTarget.elements.email.focus();
      return;
    }
    setLoading(true);
    try {
      await adminRequestPasswordReset({ email: email.trim() });
      setSentTo(email.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className={`${loginStyles.title} ${styles.title}`}>
        Forgot Password?
      </h1>
      <p className={styles.text}>
        Enter the email associated with your account and we&apos;ll send you a
        link to reset your password.
      </p>

      <Input
        plain
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Enter your email address"
        aria-label="Email address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          if (error) setError(null);
        }}
        error={error}
        className={styles.field}
      />

      {sentTo && (
        <p className={styles.sent} role="status">
          If {sentTo} is an admin account, a reset link is on its way.{" "}
          <Link href="/admin/login">Back to Log in</Link>
        </p>
      )}

      <Button
        type="submit"
        fullWidth
        loading={loading}
        loadingText="Sending"
        className={styles.submit}
      >
        Resend link
      </Button>

      <p className={loginStyles.notice}>Unauthorised access prohibited</p>
    </form>
  );
}
