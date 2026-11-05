"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/auth/PasswordInput";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { adminLogIn } from "@/lib/api/admin/session";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminSession";
import { validateEmail } from "@/lib/validation";
import styles from "./AdminLoginForm.module.css";

/**
 * Admin log-in (Figma: Admin Log in). On success it remembers the admin in a
 * cookie (until the real backend session exists) and opens the request queue.
 * Test account: admin@sadaqua.org / Sadaqua1!
 */
export default function AdminLoginForm() {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const problems = {
      email: validateEmail(values.email),
      password: values.password ? null : "Please enter your password",
    };
    setErrors(problems);
    const first = Object.keys(problems).find((key) => problems[key]);
    if (first) {
      form.elements[first].focus();
      return;
    }

    setLoading(true);
    try {
      await adminLogIn(values);
      document.cookie = `${ADMIN_SESSION_COOKIE}=1; path=/; SameSite=Lax`;
      router.push("/admin/requests");
    } catch (err) {
      setErrors({ [err.field || "password"]: err.message });
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1 className={styles.title}>Welcome back</h1>
      <p className={styles.subtitle}>Continue your journey with Sadaqua.</p>

      <div className={styles.fields}>
        <Input
          plain
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          aria-label="Email address"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <PasswordInput
          plain
          name="password"
          placeholder="Enter password"
          aria-label="Password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
      </div>

      <Link href="/admin/forgot-password" className={styles.forgot}>
        Forgot password?
      </Link>

      <Button
        type="submit"
        fullWidth
        loading={loading}
        loadingText="Logging in"
        className={styles.submit}
      >
        Log in
      </Button>

      <p className={styles.notice}>Unauthorised access prohibited</p>
    </form>
  );
}
