"use client";

import { useState } from "react";
import Link from "next/link";
import AdminModal from "@/components/admin/AdminModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { updateCause } from "@/lib/api/admin/causes";
import styles from "./CauseManagement.module.css";

// The Figma has no screens for these, so they use the same pop-up card as
// the other admin pop-ups (designer question).
const ACTIONS = {
  fulfil: {
    title: "Mark as fulfilled?",
    text: "Only do this once the full payment has been disbursed and the need has been met. Givers will see this cause as fulfilled.",
    confirm: "Mark as fulfilled",
    done: "This cause is now marked as fulfilled.",
  },
  close: {
    title: "Close this cause?",
    text: "The cause will stop receiving donations. You can reopen it from Cause status.",
    confirm: "Close cause",
    done: "This cause is now closed.",
  },
  update: {
    title: "Post update",
    confirm: "Post update",
    done: "Your update has been posted.",
    fields: [
      {
        name: "title",
        label: "Title",
        placeholder: "e.g. Treatment support provided",
      },
      { name: "text", label: "Update", placeholder: "What has happened?" },
    ],
  },
  disburse: {
    title: "Record disbursement",
    confirm: "Record disbursement",
    done: "The disbursement has been recorded.",
    fields: [
      {
        name: "amount",
        label: "Amount (₦)",
        placeholder: "e.g. 100000",
        inputMode: "numeric",
      },
      { name: "purpose", label: "Purpose", placeholder: "e.g. Treatment" },
      { name: "date", label: "Date", type: "date" },
    ],
  },
};

/** The pop-up for Mark as fulfilled, Close cause, Post update and Record disbursement */
export default function CauseActionModal({ action, causeId, closeHref }) {
  const config = ACTIONS[action];
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  if (!config) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      const type = {
        fulfil: "fulfil",
        close: "close",
        update: "update",
        disburse: "disbursement",
      }[action];
      await updateCause(causeId, { type, ...values });
      setDone(true);
    } catch (err) {
      setErrors({ [err.field || "form"]: err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminModal title={config.title} closeHref={closeHref} top={200}>
      {done ? (
        <>
          <p className={styles.modalText} role="status">
            {config.done}
          </p>
          <Button href={closeHref} fullWidth className={styles.modalButton}>
            Done
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {config.text && <p className={styles.modalText}>{config.text}</p>}
          {config.fields && (
            <div className={styles.modalFields}>
              {config.fields.map((field) => (
                <Input
                  plain
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type ?? "text"}
                  inputMode={field.inputMode}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(event) =>
                    setValues((v) => ({
                      ...v,
                      [field.name]: event.target.value,
                    }))
                  }
                  error={errors[field.name]}
                />
              ))}
            </div>
          )}
          {errors.form && (
            <p className={styles.modalError} role="alert">
              {errors.form}
            </p>
          )}
          <div className={styles.modalActions}>
            <Link
              href={closeHref}
              scroll={false}
              className={styles.modalCancel}
            >
              Cancel
            </Link>
            <Button
              type="submit"
              loading={saving}
              loadingText="Saving"
              className={styles.modalConfirm}
            >
              {config.confirm}
            </Button>
          </div>
        </form>
      )}
    </AdminModal>
  );
}
