"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/auth/PasswordInput";
import { logIn } from "@/lib/api/auth";
import { validateLogIn } from "@/lib/validation";
import styles from "./LoginForm.module.css";

// Where each role lands after logging in
const HOME_BY_ROLE = { giver: "/giver", recipient: "/recipient" };

/**
 * Log-in form for givers and recipients.
 * role is optional: it only decides where "Create account" points.
 */
export default function LoginForm({ role }) {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // After the first submit, update the errors live so they clear as they are fixed.
    if (submitted) setErrors(validateLogIn(next));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // Keep a handle on the form: React clears event.currentTarget after an await.
    const form = event.currentTarget;
    setSubmitted(true);
    setFormError("");

    const found = validateLogIn(values);
    setErrors(found);

    const firstProblem = Object.keys(found)[0];
    if (firstProblem) {
      form.elements[firstProblem]?.focus();
      return;
    }

    setLoading(true);
    try {
      const { user } = await logIn({
        email: values.email.trim(),
        password: values.password,
      });
      router.push(HOME_BY_ROLE[user.role]);
    } catch (error) {
      if (error.field) {
        // Wrong email or password: show it under that field, as in Figma.
        setErrors({ [error.field]: error.message });
        form.elements[error.field]?.focus();
      } else {
        setFormError(error.message);
      }
      setLoading(false);
    }
  }

  const createAccountHref = role ? `/register?role=${role}` : "/";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email address"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <PasswordInput
          name="password"
          placeholder="Enter password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
      </div>

      <Link href="/forgot-password" className={styles.forgot}>
        Forgot password?
      </Link>

      {formError && (
        <p className={styles.formError} role="alert">
          {formError}
        </p>
      )}

      {/* Pushed to the bottom of the screen, as in Figma */}
      <div className={styles.actions}>
        <Button type="submit" fullWidth loading={loading} loadingText="Logging in...">
          Log in
        </Button>

        <p className={styles.switch}>
          Don&apos;t have an account? <Link href={createAccountHref}>Create account</Link>
        </p>
      </div>
    </form>
  );
}
