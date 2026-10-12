"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import StatusMessage from "@/components/ui/StatusMessage";
import { requestPasswordReset } from "@/lib/api/auth";
import { validateEmail } from "@/lib/validation";
import styles from "./ForgotPassword.module.css";

/**
 * Forgot password: ask for the email, send the reset link,
 * then show "Check your email" in place of the form.
 */
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState("");

  function handleChange(event) {
    setEmail(event.target.value);
    if (submitted) setError(validateEmail(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitted(true);

    const problem = validateEmail(email);
    setError(problem);
    if (problem) {
      form.elements.email.focus();
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset({ email: email.trim() });
      setSentTo(email.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // After sending: no design in Figma yet, so this reuses the
  // "Password Reset Successful" layout (logged as a designer question).
  if (sentTo) {
    return (
      <StatusMessage
        icon="mail"
        title="Check your email"
        actionLabel="Back to Log in"
        actionHref="/login"
      >
        <p>
          If an account exists for <strong>{sentTo}</strong>, we have sent a link
          to reset your password.
        </p>
      </StatusMessage>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Forgot Password?</h1>
      <p className={styles.subtitle}>
        Enter the email associated with your account and we&apos;ll send you a
        link to reset your password.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email address"
          autoComplete="email"
          value={email}
          onChange={handleChange}
          error={error}
        />

        {/* Pushed down to where Figma places the button */}
        <div className={styles.actions}>
          <Button type="submit" fullWidth loading={loading} loadingText="Sending...">
            Send Reset Link
          </Button>

          <p className={styles.switch}>
            Don&apos;t have an account? <Link href="/">Create account</Link>
          </p>
        </div>
      </form>
    </>
  );
}
