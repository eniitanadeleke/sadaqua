"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiNotification4Line, RiTimeLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import { useRequestDraft } from "./RequestDraftProvider";
import { useStepGuard } from "./useStepGuard";
import FieldError from "./FieldError";
import styles from "./RequestForm.module.css";

const MAX_CHARACTERS = 1000;

const URGENCY = [
  {
    key: "normal",
    label: "Normal",
    text: "It’s not time sensitive",
    Icon: RiTimeLine,
    tone: "calm",
  },
  {
    key: "urgent",
    label: "Urgent",
    text: "It’s an emergency and I need immediate help",
    Icon: RiNotification4Line,
    tone: "alarm",
  },
];

/** Step 2 (Figma: Help Request - Details): description and urgency */
export default function DetailsStep() {
  const router = useRouter();
  const allowed = useStepGuard(2);
  const { draft, update } = useRequestDraft();
  const [errors, setErrors] = useState({});

  if (!allowed) return null;

  function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!draft.description.trim()) {
      next.description = "Please tell us about your need.";
    }
    if (!draft.urgency) next.urgency = "Please choose how urgent this is.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      router.push("/recipient/request-help/verify");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="description" className={styles.label}>
        Describe your need
      </label>
      <textarea
        id="description"
        className={`${styles.textarea} ${errors.description ? styles.invalid : ""}`}
        placeholder="Tell us about your need..."
        maxLength={MAX_CHARACTERS}
        value={draft.description}
        onChange={(event) => update({ description: event.target.value })}
        aria-invalid={errors.description ? "true" : undefined}
        aria-describedby="description-count"
      />
      <p id="description-count" className={styles.counter} aria-live="polite">
        {draft.description.length}/{MAX_CHARACTERS} Characters
      </p>
      <FieldError id="description-error">{errors.description}</FieldError>

      <fieldset className={styles.urgency}>
        <legend className={`${styles.label} ${styles.urgencyLegend}`}>
          How urgent is this?
        </legend>
        <div className={styles.urgencyCard}>
          {URGENCY.map(({ key, label, text, Icon, tone }) => (
            <label key={key} className={styles.urgencyOption}>
              <input
                type="radio"
                name="urgency"
                value={key}
                checked={draft.urgency === key}
                onChange={() => update({ urgency: key })}
                className={styles.radio}
              />
              <span className={styles.urgencyText}>
                <span className={styles.urgencyLabel}>{label}</span>
                <span className={styles.urgencyHint}>{text}</span>
              </span>
              <span
                className={`${styles.urgencyIcon} ${styles[tone]}`}
                aria-hidden="true"
              >
                <Icon />
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <FieldError id="urgency-error">{errors.urgency}</FieldError>

      <Button type="submit" fullWidth className={styles.continue}>
        Continue
      </Button>
    </form>
  );
}
