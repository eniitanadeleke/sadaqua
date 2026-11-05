"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowDownSLine, RiCloseCircleLine } from "react-icons/ri";
import AdminModal from "@/components/admin/AdminModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { inviteUser, USER_ROLES } from "@/lib/api/admin/users";
import { validateEmail, validateFullName } from "@/lib/validation";
import styles from "./UserAddModal.module.css";

/**
 * "Add organisation user" (Figma: Add Users). On success it opens
 * "Invitation sent" (?invited=<first name>).
 */
export default function UserAddModal({ closeHref }) {
  const router = useRouter();
  const [values, setValues] = useState({ fullName: "", email: "", role: "" });
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
      fullName: validateFullName(values.fullName),
      email: validateEmail(values.email),
      role: values.role ? null : "Please choose a role",
    };
    setErrors(problems);
    const first = Object.keys(problems).find((key) => problems[key]);
    if (first) {
      form.elements[first].focus();
      return;
    }
    setLoading(true);
    try {
      await inviteUser(values);
      const firstName = values.fullName.trim().split(/\s+/)[0];
      const back = new URL(closeHref, window.location.origin);
      back.searchParams.set("invited", firstName);
      router.push(`${back.pathname}${back.search}`, { scroll: false });
    } catch (err) {
      setErrors({ [err.field || "email"]: err.message });
      setLoading(false);
    }
  }

  return (
    <AdminModal closeHref={closeHref} className={styles.card}>
      <Link
        href={closeHref}
        scroll={false}
        className={styles.close}
        aria-label="Close"
      >
        <RiCloseCircleLine aria-hidden="true" />
      </Link>
      <h2 className={styles.title}>Add organisation user</h2>

      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <Input
          plain
          name="fullName"
          autoComplete="name"
          placeholder="Enter full name"
          aria-label="Full name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <Input
          plain
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter email address"
          aria-label="Email address"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <div className={styles.selectWrap}>
          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            className={`${styles.select} ${errors.role ? styles.invalid : ""}`}
            aria-label="Role"
            aria-invalid={errors.role ? true : undefined}
          >
            <option value="" disabled>
              --Select Role--
            </option>
            {Object.entries(USER_ROLES).map(([value, role]) => (
              <option key={value} value={value}>
                {role.label}
              </option>
            ))}
          </select>
          <RiArrowDownSLine className={styles.chevron} aria-hidden="true" />
          {errors.role && (
            <p className={styles.error} role="alert">
              {errors.role}
            </p>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          loading={loading}
          loadingText="Sending"
          className={styles.submit}
        >
          Send invitation
        </Button>
      </form>
    </AdminModal>
  );
}
