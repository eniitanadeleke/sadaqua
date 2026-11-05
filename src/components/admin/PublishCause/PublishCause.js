"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiArrowDownSLine,
  RiArrowLeftLine,
  RiCheckboxCircleLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiHeartLine,
  RiHeartPulseLine,
  RiMapPinLine,
  RiShieldCheckFill,
  RiUpload2Line,
} from "react-icons/ri";
import AdminModal from "@/components/admin/AdminModal";
import { publishCause } from "@/lib/api/admin/causes";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { formatNaira } from "@/lib/format";
import { NAME_DISPLAY_OPTIONS } from "@/lib/nameDisplay";
import styles from "./PublishCause.module.css";

const TEXT_LIMIT = 1000;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

// Figma writes the initials option as "Initials (A.M)"
function nameOptionLabel(option, applicant) {
  if (option.key !== "initials") return option.label;
  const initials = applicant
    .split(/\s+/)
    .map((part) => part[0])
    .join(".");
  return `Initials (${initials})`;
}

/**
 * Publish Approved Cause (Figma): the cause form on the left and a live
 * preview of the giver's cause card on the right. ?published=1 shows the
 * "Cause published successfully" pop-up over the page.
 *
 * draft:     from getPublishDraft()
 * published: true when the success pop-up should show
 */
export default function PublishCause({ draft, published }) {
  const router = useRouter();
  const base = `/admin/causes/publish/${draft.requestId}`;
  const [values, setValues] = useState({
    title: draft.title,
    category: draft.category,
    amount: String(draft.amount),
    story: draft.story,
    location: draft.location,
    nameDisplay: draft.nameDisplay,
  });
  const [image, setImage] = useState(draft.image);
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(null);
  const [note, setNote] = useState("");
  const objectUrl = useRef(null);

  useEffect(
    () => () => objectUrl.current && URL.revokeObjectURL(objectUrl.current),
    [],
  );

  function set(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }));
    setNote("");
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      setImageError("Please choose a PDF, JPG or PNG file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError("This file is larger than 2 MB.");
      return;
    }
    setImageError("");
    if (file.type === "application/pdf") return; // kept, but there is nothing to preview
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setImage(objectUrl.current);
  }

  async function save(action) {
    setBusy(action);
    setNote("");
    try {
      await publishCause(
        draft.requestId,
        { ...values, amount: Number(values.amount.replace(/\D/g, "")), image },
        action,
      );
      if (action === "publish") {
        router.push(`${base}?published=1`, { scroll: false });
      } else {
        setNote("Draft saved.");
      }
    } catch (err) {
      if (err.field) setErrors({ [err.field]: err.message });
      else setNote(err.message);
    } finally {
      setBusy(null);
    }
  }

  const amount = Number(values.amount.replace(/\D/g, "")) || 0;
  const category = getCategory(values.category);

  return (
    <>
      <Link href={`/admin/requests/${draft.requestId}`} className={styles.back}>
        <RiArrowLeftLine aria-hidden="true" />
        Back to requests
      </Link>
      <h1 className={styles.title}>Publish Approved Request as a Cause</h1>
      <p className={styles.subtitle}>
        Review the information blow. This is what will be visible to givers when
        the cause is published.
      </p>

      <div className={styles.grid}>
        {/* ---------- The form ---------- */}
        <section className={styles.card} aria-labelledby="cause-info-title">
          <h2 id="cause-info-title" className={styles.cardTitle}>
            Cause information
          </h2>

          <Field label="Cause title" htmlFor="cause-title" error={errors.title}>
            <input
              id="cause-title"
              className={styles.input}
              value={values.title}
              maxLength={TEXT_LIMIT}
              onChange={(event) => set("title", event.target.value)}
              aria-invalid={errors.title ? true : undefined}
            />
            <p className={styles.counter}>
              {values.title.length}/1000 Characters
            </p>
          </Field>

          <div className={styles.pair}>
            <Field
              label="Category"
              htmlFor="cause-category"
              error={errors.category}
            >
              <div className={styles.selectBox}>
                <select
                  id="cause-category"
                  className={styles.select}
                  value={values.category}
                  onChange={(event) => set("category", event.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <RiArrowDownSLine
                  className={styles.selectIcon}
                  aria-hidden="true"
                />
              </div>
            </Field>
            <Field
              label="Amount needed"
              htmlFor="cause-amount"
              error={errors.amount}
            >
              <div className={`${styles.input} ${styles.amount}`}>
                <span aria-hidden="true">₦</span>
                <input
                  id="cause-amount"
                  inputMode="numeric"
                  value={amount ? amount.toLocaleString("en-NG") : ""}
                  onChange={(event) => set("amount", event.target.value)}
                  aria-invalid={errors.amount ? true : undefined}
                />
              </div>
            </Field>
          </div>

          <Field label="Short story" htmlFor="cause-story" error={errors.story}>
            <textarea
              id="cause-story"
              className={`${styles.input} ${styles.story}`}
              value={values.story}
              maxLength={TEXT_LIMIT}
              onChange={(event) => set("story", event.target.value)}
              aria-invalid={errors.story ? true : undefined}
            />
            <p className={styles.counter}>
              {values.story.length}/1000 Characters
            </p>
          </Field>

          <Field label="General location" htmlFor="cause-location" plain>
            <input
              id="cause-location"
              className={styles.input}
              value={values.location}
              onChange={(event) => set("location", event.target.value)}
            />
          </Field>

          <fieldset className={styles.names}>
            <legend className={styles.label}>
              Name display <span className={styles.required}>*</span>
            </legend>
            <div className={styles.nameOptions}>
              {NAME_DISPLAY_OPTIONS.map((option) => (
                <label key={option.key} className={styles.nameOption}>
                  <input
                    type="radio"
                    name="nameDisplay"
                    value={option.key}
                    className={styles.radio}
                    checked={values.nameDisplay === option.key}
                    onChange={() => set("nameDisplay", option.key)}
                  />
                  {nameOptionLabel(option, draft.applicant)}
                </label>
              ))}
            </div>
          </fieldset>

          <p className={styles.label}>Cause image</p>
          <div className={styles.imageRow}>
            <div className={styles.thumb}>
              <Image
                src={image}
                alt=""
                fill
                sizes="186px"
                className={styles.cover}
                unoptimized
              />
            </div>
            <div>
              <label className={styles.change}>
                <RiUpload2Line aria-hidden="true" />
                Change Image
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="visually-hidden"
                  onChange={handleImage}
                />
              </label>
              <p
                className={imageError ? styles.fileError : styles.fileHint}
                role={imageError ? "alert" : undefined}
              >
                {imageError || "PDF, JPG, PNG (Max 2 MB)"}
              </p>
            </div>
          </div>

          <InfoBox
            icon={RiCheckboxCircleLine}
            title="Publishing confirmation"
            className={styles.confirm}
          />
        </section>

        {/* ---------- What givers will see ---------- */}
        <section className={styles.card} aria-label="Preview for givers">
          <InfoBox icon={RiErrorWarningLine} title="Public information" />

          <div className={styles.preview}>
            <Image
              src={image}
              alt=""
              fill
              sizes="522px"
              className={styles.cover}
              unoptimized
            />
            <span className={styles.donors}>
              <span className={styles.faces} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              0 donors
            </span>
          </div>

          <div className={styles.badges}>
            <span className={styles.verified}>
              <RiShieldCheckFill aria-hidden="true" />
              Verified
            </span>
            <span className={styles.save}>
              <RiHeartLine aria-hidden="true" />
              Save cause
            </span>
          </div>

          <h3 className={styles.previewTitle}>
            {values.title || "Cause title"}
          </h3>
          <p className={styles.previewMeta}>
            <span>
              <RiHeartPulseLine aria-hidden="true" />
              {category?.label}
            </span>
            <span>
              <RiMapPinLine aria-hidden="true" />
              {values.location}
            </span>
          </p>
          <p className={styles.previewStory}>{values.story}</p>

          <div className={styles.raised}>
            <p>
              <strong>₦0</strong> raised of {formatNaira(amount)}
            </p>
            <p>0%</p>
          </div>
          <div className={styles.track} aria-hidden="true" />
          <span className={styles.giveNow} aria-disabled="true">
            Give Now
          </span>
        </section>
      </div>

      <div className={styles.footer}>
        <Link
          href={`/admin/requests/${draft.requestId}`}
          className={`${styles.button} ${styles.outline}`}
        >
          Back to review
        </Link>
        {note && (
          <p className={styles.note} role="status">
            {note}
          </p>
        )}
        <div className={styles.footerRight}>
          <button
            type="button"
            className={`${styles.button} ${styles.outline}`}
            onClick={() => save("draft")}
            disabled={busy !== null}
          >
            {busy === "draft" ? "Saving…" : "Save draft"}
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.filled}`}
            onClick={() => save("publish")}
            disabled={busy !== null}
          >
            {busy === "publish" ? "Publishing…" : "Publish cause"}
          </button>
        </div>
      </div>

      {published && (
        <AdminModal width={510} top={280} className={styles.success}>
          <span className={styles.successIcon} aria-hidden="true">
            <RiCheckLine />
          </span>
          <h2 className={styles.successTitle}>Cause published successfully</h2>
          <p className={styles.successText}>
            {values.title} is now visible to givers on Sadaqua.
          </p>
          <Link
            href={`/admin/causes/${draft.requestId}`}
            className={`${styles.wide} ${styles.filled}`}
          >
            View published cause
          </Link>
          <Link
            href="/admin/causes"
            className={`${styles.wide} ${styles.outline}`}
          >
            Go to approved causes
          </Link>
        </AdminModal>
      )}
    </>
  );
}

function Field({ label, htmlFor, error, plain, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
        {!plain && <span className={styles.required}> *</span>}
      </label>
      {children}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function InfoBox({ icon: Icon, title, className = "" }) {
  return (
    <div className={`${styles.info} ${className}`}>
      <Icon className={styles.infoIcon} aria-hidden="true" />
      <div>
        <p className={styles.infoTitle}>{title}</p>
        <p className={styles.infoText}>
          Only the information shown in this preview will be visible to givers.
          Sensitive verification details will remain private.
        </p>
      </div>
    </div>
  );
}
