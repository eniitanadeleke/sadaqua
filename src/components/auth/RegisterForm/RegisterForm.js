"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/auth/PasswordInput";
import { signUp } from "@/lib/api/auth";
import { validateSignUp } from "@/lib/validation";
import styles from "./RegisterForm.module.css";

// Where each role lands after creating an account
const HOME_BY_ROLE = { giver: "/giver", recipient: "/recipient" };

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

/**
 * Sign-up form. A client component because it remembers what is typed,
 * shows errors as the person types, and sends the form.
 */
export default function RegisterForm({ role }) {
  const router = useRouter();
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const next = { ...values, [name]: type === "checkbox" ? checked : value };
    setValues(next);
    // After the first submit, update the errors live so they clear as they are fixed.
    if (submitted) setErrors(validateSignUp(next));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setFormError("");

    const found = validateSignUp(values);
    setErrors(found);

    const firstProblem = Object.keys(found)[0];
    if (firstProblem) {
      // Move the cursor to the first field that needs fixing.
      event.currentTarget.elements[firstProblem]?.focus();
      return;
    }

    setLoading(true);
    try {
      await signUp({
        role,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.replace(/\s+/g, ""),
        password: values.password,
      });
      router.push(HOME_BY_ROLE[role]);
    } catch (error) {
      setFormError(error.message);
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <Input
          name="fullName"
          placeholder="Enter your full name"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <Input
          name="email"
          type="email"
          placeholder="Enter your email address"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder="Enter your phone number"
          autoComplete="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <PasswordInput
          name="password"
          placeholder="Create password"
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
          placeholder="Confirm password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
      </div>

      <Checkbox
        name="acceptTerms"
        checked={values.acceptTerms}
        onChange={handleChange}
        error={errors.acceptTerms}
        className={styles.terms}
      >
        I agree to Sadaqua&apos;s <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>
      </Checkbox>

      {formError && (
        <p className={styles.formError} role="alert">
          {formError}
        </p>
      )}

      <Button
        type="submit"
        fullWidth
        loading={loading}
        loadingText="Creating account..."
        className={styles.submit}
      >
        Create account
      </Button>

      <p className={styles.switch}>
        Already have an account? <Link href={`/login?role=${role}`}>Log in</Link>
      </p>
    </form>
  );
}
