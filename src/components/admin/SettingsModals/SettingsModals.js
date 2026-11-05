"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiArrowDownSLine,
  RiCheckboxCircleFill,
  RiCloseCircleLine,
} from "react-icons/ri";
import AdminModal from "@/components/admin/AdminModal";
import PasswordInput from "@/components/auth/PasswordInput";
import Input from "@/components/ui/Input";
import {
  ADMIN_ROLES,
  changeAdminPassword,
  updateAdminProfile,
  updateOrganisation,
} from "@/lib/api/admin/settings";
import { validateEmail } from "@/lib/validation";
import styles from "./SettingsModals.module.css";

const IMAGE_TYPES = ["image/jpeg", "image/png"];
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

/** Card, round X, centred green title; children are the form */
function SettingsModal({ title, subtitle, closeHref, children }) {
  return (
    <AdminModal closeHref={closeHref} width={434} className={styles.card}>
      <Link
        href={closeHref}
        scroll={false}
        className={styles.close}
        aria-label="Close"
      >
        <RiCloseCircleLine aria-hidden="true" />
      </Link>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}
    </AdminModal>
  );
}

/** Cancel + green button at the bottom of each pop-up */
function Actions({ closeHref, label, busyLabel, busy }) {
  return (
    <div className={styles.actions}>
      <Link href={closeHref} scroll={false} className={styles.cancel}>
        Cancel
      </Link>
      <button
        type="submit"
        className={styles.save}
        disabled={busy}
        aria-busy={busy || undefined}
      >
        {busy ? busyLabel : label}
      </button>
    </div>
  );
}

/** Round picture + small outlined button + "JPG,JPEG,PNG  Max 2MB" */
function PictureField({ src, buttonLabel, ring, onPick, error }) {
  const input = useRef(null);
  return (
    <div className={styles.picture}>
      <span className={`${styles.photo} ${ring ? styles.ring : ""}`}>
        <Image
          src={src}
          alt=""
          width={56}
          height={56}
          className={styles.photoImage}
          unoptimized
        />
      </span>
      <div>
        <button
          type="button"
          className={styles.change}
          onClick={() => input.current?.click()}
        >
          {buttonLabel}
        </button>
        <p className={styles.hint}>JPG,JPEG,PNG&nbsp; Max 2MB</p>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
      <input
        ref={input}
        type="file"
        accept=".jpg,.jpeg,.png"
        hidden
        onChange={(event) => onPick(event.target.files?.[0])}
      />
    </div>
  );
}

/** Checks a picked image; returns an error message or null */
function checkImage(file) {
  if (!IMAGE_TYPES.includes(file.type))
    return "Please choose a JPG, JPEG or PNG image.";
  if (file.size > MAX_IMAGE_BYTES) return "The image must be 2MB or smaller.";
  return null;
}

function useSaved(closeHref) {
  const router = useRouter();
  return () => {
    router.push(closeHref, { scroll: false });
    router.refresh();
  };
}

/** Figma: Edit profile */
export function SettingsProfileModal({ account, closeHref }) {
  const done = useSaved(closeHref);
  const [values, setValues] = useState({
    fullName: account.fullName,
    role: account.role,
  });
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  function pickPhoto(file) {
    if (!file) return;
    const problem = checkImage(file);
    setErrors((e) => ({ ...e, photo: problem }));
    if (!problem) setPhoto({ file, url: URL.createObjectURL(file) });
  }

  async function submit(event) {
    event.preventDefault();
    if (!values.fullName.trim()) {
      setErrors({ fullName: "Please enter your full name" });
      return;
    }
    setBusy(true);
    try {
      await updateAdminProfile({ ...values, photo: photo?.file });
      done();
    } catch (err) {
      setErrors({ [err.field || "fullName"]: err.message });
      setBusy(false);
    }
  }

  return (
    <SettingsModal title="Edit profile" closeHref={closeHref}>
      <form onSubmit={submit} noValidate className={styles.form}>
        <PictureField
          src={photo?.url ?? account.photo}
          buttonLabel="Change photo"
          ring
          onPick={pickPhoto}
          error={errors.photo}
        />
        <Input
          plain
          name="fullName"
          label="Full name"
          required
          value={values.fullName}
          onChange={(event) =>
            setValues((v) => ({ ...v, fullName: event.target.value }))
          }
          error={errors.fullName}
          className={`${styles.field} ${styles.first}`}
        />
        <Input
          plain
          name="email"
          label="Email address"
          value={account.email}
          disabled
          className={`${styles.field} ${styles.locked}`}
        />
        <label className={styles.selectField}>
          <span className={styles.label}>Role</span>
          <span className={styles.selectBox}>
            <select
              value={values.role}
              onChange={(event) =>
                setValues((v) => ({ ...v, role: event.target.value }))
              }
              className={styles.select}
            >
              {ADMIN_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <RiArrowDownSLine
              className={styles.selectChevron}
              aria-hidden="true"
            />
          </span>
        </label>
        <Actions
          closeHref={closeHref}
          label="Save changes"
          busyLabel="Saving"
          busy={busy}
        />
      </form>
    </SettingsModal>
  );
}

const PASSWORD_CHECKS = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One number", test: (v) => /\d/.test(v) },
];

/** Figma: Edit profile-1 (Change Password) */
export function SettingsPasswordModal({ closeHref }) {
  const done = useSaved(closeHref);
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const change = (event) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }));
  };

  async function submit(event) {
    event.preventDefault();
    const problems = {
      currentPassword: values.currentPassword
        ? null
        : "Please enter your current password",
      newPassword: PASSWORD_CHECKS.every((c) => c.test(values.newPassword))
        ? null
        : "Your new password does not meet the rules below",
      confirmPassword:
        values.confirmPassword === values.newPassword
          ? null
          : "The password you entered is not the same with the above",
    };
    setErrors(problems);
    if (Object.values(problems).some(Boolean)) return;
    setBusy(true);
    try {
      await changeAdminPassword(values);
      done();
    } catch (err) {
      setErrors({ [err.field || "currentPassword"]: err.message });
      setBusy(false);
    }
  }

  return (
    <SettingsModal
      title="Change Password"
      subtitle="Choose a strong password to keep your account secured."
      closeHref={closeHref}
    >
      <form
        onSubmit={submit}
        noValidate
        className={`${styles.form} ${styles.passwordForm}`}
      >
        <PasswordInput
          plain
          name="currentPassword"
          label="Current password"
          required
          placeholder="*******"
          value={values.currentPassword}
          onChange={change}
          error={errors.currentPassword}
          className={styles.field}
        />
        <PasswordInput
          plain
          name="newPassword"
          label="New password"
          required
          autoComplete="new-password"
          placeholder="*******"
          value={values.newPassword}
          onChange={change}
          error={errors.newPassword}
          className={styles.field}
        />
        <PasswordInput
          plain
          name="confirmPassword"
          label="Confirm password"
          required
          autoComplete="new-password"
          placeholder="*******"
          value={values.confirmPassword}
          onChange={change}
          error={errors.confirmPassword}
          className={styles.field}
        />
        <ul className={styles.rules}>
          {PASSWORD_CHECKS.map(({ label, test }) => (
            <li
              key={label}
              className={test(values.newPassword) ? styles.met : ""}
            >
              <RiCheckboxCircleFill
                className={styles.ruleIcon}
                aria-hidden="true"
              />
              {label}
            </li>
          ))}
        </ul>
        <Actions
          closeHref={closeHref}
          label="Update password"
          busyLabel="Updating"
          busy={busy}
        />
      </form>
    </SettingsModal>
  );
}

/** Figma: Edit organisation details */
export function SettingsOrganisationModal({ organisation, closeHref }) {
  const done = useSaved(closeHref);
  const [values, setValues] = useState({
    name: organisation.name,
    email: organisation.email,
    phone: organisation.phone,
  });
  const [logo, setLogo] = useState(null);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const change = (event) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }));
  };

  function pickLogo(file) {
    if (!file) return;
    const problem = checkImage(file);
    setErrors((e) => ({ ...e, logo: problem }));
    if (!problem) setLogo({ file, url: URL.createObjectURL(file) });
  }

  async function submit(event) {
    event.preventDefault();
    const problems = {
      name: values.name.trim() ? null : "Please enter the organisation name",
      email: validateEmail(values.email),
      phone: /^\+?\d[\d\s]{9,16}$/.test(values.phone.trim())
        ? null
        : "Invalid phone number entered only number",
    };
    setErrors(problems);
    if (Object.values(problems).some(Boolean)) return;
    setBusy(true);
    try {
      await updateOrganisation({ ...values, logo: logo?.file });
      done();
    } catch (err) {
      setErrors({ [err.field || "name"]: err.message });
      setBusy(false);
    }
  }

  return (
    <SettingsModal title="Edit organisation details" closeHref={closeHref}>
      <form
        onSubmit={submit}
        noValidate
        className={`${styles.form} ${styles.orgForm}`}
      >
        <p className={styles.logoLabel}>Logo</p>
        <PictureField
          src={logo?.url ?? organisation.logo}
          buttonLabel="Change logo"
          onPick={pickLogo}
          error={errors.logo}
        />
        <Input
          plain
          name="name"
          label="Organisation name"
          required
          value={values.name}
          onChange={change}
          error={errors.name}
          className={`${styles.field} ${styles.first}`}
        />
        <Input
          plain
          name="email"
          type="email"
          label="Organisation email"
          required
          value={values.email}
          onChange={change}
          error={errors.email}
          className={styles.field}
        />
        <Input
          plain
          name="phone"
          type="tel"
          label="Phone number"
          required
          value={values.phone}
          onChange={change}
          error={errors.phone}
          className={styles.field}
        />
        <Actions
          closeHref={closeHref}
          label="Save changes"
          busyLabel="Saving"
          busy={busy}
        />
      </form>
    </SettingsModal>
  );
}
