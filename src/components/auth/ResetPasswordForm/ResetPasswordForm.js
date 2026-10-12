"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import PasswordInput from "@/components/auth/PasswordInput";
import { resetPassword } from "@/lib/api/auth";
import { validateResetPassword } from "@/lib/validation";
import styles from "./ResetPasswordForm.module.css";

const EMPTY_FORM = { password: "", confirmPassword: "" };

/**
 * New password + confirm. The token comes from the email link
 * and is passed in by the page.
 */
export default function ResetPasswordForm({ token }) {
  const router = useRouter();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [linkError, setLinkError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitted) setErrors(validateResetPassword(next));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitted(true);
    setLinkError("");

    const found = validateResetPassword(values);
    setErrors(found);

    const firstProblem = Object.keys(found)[0];
    if (firstProblem) {
      form.elements[firstProblem]?.focus();
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ token, password: values.password });
      router.push("/reset-password/success");
    } catch (error) {
      setLinkError(error.message);
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <PasswordInput
          name="password"
          placeholder="Enter new password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          hint="Use 8 or more characters with a mix of letters and numbers."
          error={
            errors.password && (
              <span>
                <span className={styles.strengthLabel}>Password strength:</span>{" "}
                <strong>{errors.password.strength}</strong>
                {errors.password.missing.map((message) => (
                  <span key={message} className={styles.rule}>
                    {message}
                  </span>
                ))}
              </span>
            )
          }
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm new password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
      </div>

      {linkError && (
        <p className={styles.formError} role="alert">
          {linkError} <Link href="/forgot-password">Request a new link</Link>
        </p>
      )}

      {/* Pushed down to where Figma places the button */}
      <div className={styles.actions}>
        <Button type="submit" fullWidth loading={loading} loadingText="Resetting...">
          Reset Password
        </Button>

        <p className={styles.switch}>
          Remember your password? <Link href="/login">Log in</Link>
        </p>
      </div>
    </form>
  );
}
