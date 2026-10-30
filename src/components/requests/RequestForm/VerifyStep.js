"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  RiArrowDownSLine,
  RiLockLine,
  RiUploadCloud2Line,
} from "react-icons/ri";
import Button from "@/components/ui/Button";
import { DOCUMENT_TYPES, MAX_DOCUMENT_BYTES } from "@/lib/api/recipient";
import { NIGERIAN_STATES } from "@/lib/nigeria";
import { useRequestDraft } from "./RequestDraftProvider";
import { useStepGuard } from "./useStepGuard";
import DocumentRow from "./DocumentRow";
import FieldError from "./FieldError";
import styles from "./RequestForm.module.css";

/** Step 3 (Figma: Help Request - Verify): state, area and one document */
export default function VerifyStep() {
  const router = useRouter();
  const allowed = useStepGuard(3);
  const { draft, update, setFile } = useRequestDraft();
  const [errors, setErrors] = useState({});
  const fileInput = useRef(null);

  if (!allowed) return null;

  function handleFile(event) {
    const chosen = event.target.files?.[0];
    event.target.value = ""; // so choosing the same file again still works
    if (!chosen) return;
    if (!DOCUMENT_TYPES[chosen.type]) {
      setErrors((e) => ({
        ...e,
        document: "Please choose a PDF, JPG, PNG or MP4 file.",
      }));
      return;
    }
    if (chosen.size > MAX_DOCUMENT_BYTES) {
      setErrors((e) => ({ ...e, document: "This file is larger than 10 MB." }));
      return;
    }
    setErrors((e) => ({ ...e, document: undefined }));
    setFile(chosen);
    update({
      document: { name: chosen.name, size: chosen.size, type: chosen.type },
    });
  }

  function removeFile() {
    setFile(null);
    update({ document: null });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!draft.state) next.state = "Please choose your state.";
    if (!draft.area.trim()) next.area = "Please enter your area or city.";
    if (!draft.document) next.document = "Please upload a supporting document.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      router.push("/recipient/request-help/review");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="state" className={styles.label}>
        State
      </label>
      <div
        className={`${styles.selectBox} ${errors.state ? styles.invalid : ""}`}
      >
        <select
          id="state"
          className={`${styles.select} ${draft.state ? "" : styles.placeholder}`}
          value={draft.state}
          onChange={(event) => update({ state: event.target.value })}
          aria-invalid={errors.state ? "true" : undefined}
        >
          <option value="">--Select state--</option>
          {NIGERIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <RiArrowDownSLine className={styles.chevron} aria-hidden="true" />
      </div>
      <FieldError id="state-error">{errors.state}</FieldError>

      <label htmlFor="area" className={`${styles.label} ${styles.nextLabel}`}>
        Area/City
      </label>
      <div
        className={`${styles.field} ${styles.areaField} ${errors.area ? styles.invalid : ""}`}
      >
        <input
          id="area"
          className={styles.input}
          placeholder="Enter your area or city"
          autoComplete="address-level2"
          maxLength={80}
          value={draft.area}
          onChange={(event) => update({ area: event.target.value })}
          aria-invalid={errors.area ? "true" : undefined}
          aria-describedby="area-hint"
        />
      </div>
      <p id="area-hint" className={styles.hint}>
        We won’t display your exact address.
      </p>
      <FieldError id="area-error">{errors.area}</FieldError>

      <p
        className={`${styles.label} ${styles.documentLabel}`}
        id="document-label"
      >
        Supporting document
      </p>
      <p className={styles.documentHelp}>
        Upload one document/video that helps us verify your request.
      </p>

      <input
        ref={fileInput}
        id="document"
        type="file"
        accept={Object.keys(DOCUMENT_TYPES).join(",")}
        className={styles.fileInput}
        onChange={handleFile}
        aria-labelledby="document-label"
      />
      {draft.document ? (
        <div className={styles.chosen}>
          <DocumentRow
            document={draft.document}
            action={
              <button
                type="button"
                className={styles.remove}
                onClick={removeFile}
              >
                Remove
              </button>
            }
          />
        </div>
      ) : (
        <button
          type="button"
          className={`${styles.upload} ${errors.document ? styles.invalid : ""}`}
          onClick={() => fileInput.current?.click()}
        >
          <span className={styles.uploadTitle}>
            <RiUploadCloud2Line
              className={styles.uploadIcon}
              aria-hidden="true"
            />
            Upload document
          </span>
          <span className={styles.uploadTypes}>
            PDF, JPG, PNG or MP4 (Max 10 MB)
          </span>
        </button>
      )}
      <FieldError id="document-error">{errors.document}</FieldError>

      <p className={styles.lockNote}>
        <RiLockLine className={styles.lockNoteIcon} aria-hidden="true" />
        <span>
          Your document is private and will only be
          <br />
          used during verification
        </span>
      </p>

      <Button type="submit" fullWidth className={styles.reviewButton}>
        Review request
      </Button>
    </form>
  );
}
