"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  RiArrowDownSLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiFilePdfLine,
  RiFileTextLine,
  RiLockLine,
  RiUploadCloud2Line,
} from "react-icons/ri";
import Button from "@/components/ui/Button";
import DotSpinner from "@/components/ui/DotSpinner";
import ProgressBar from "@/components/ui/ProgressBar";
import FieldError from "@/components/requests/RequestForm/FieldError";
import { RequestFacts } from "@/components/requests/RequestDetails";
import {
  DOCUMENT_TYPES,
  MAX_DOCUMENT_BYTES,
  sendMoreInformation,
  uploadRequestDocument,
} from "@/lib/api/recipient";
import { formatFileSize } from "@/lib/format";
import styles from "./MoreInfoForm.module.css";

const MAX_CHARACTERS = 1000;

/**
 * Reply to "More information needed" (Figma: More information need form,
 * and its "load state" while a document uploads).
 *
 * request:  the request being reviewed (its infoRequest says what is needed)
 * doneHref: where to go after sending (the request details page)
 */
export default function MoreInfoForm({ request, doneHref }) {
  const router = useRouter();
  const fileInput = useRef(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // { name, size, type }
  const [progress, setProgress] = useState(0);
  const [documentId, setDocumentId] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});
  const uploadRun = useRef(0); // ignores an upload the person removed

  const uploading = Boolean(file) && !documentId;

  useEffect(() => () => uploadRun.current++, []);

  async function handleFile(event) {
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
    const run = ++uploadRun.current;
    setFile({ name: chosen.name, size: chosen.size, type: chosen.type });
    setDocumentId(null);
    setProgress(0);
    try {
      const result = await uploadRequestDocument(chosen, (percent) => {
        if (run === uploadRun.current) setProgress(percent);
      });
      if (run === uploadRun.current) setDocumentId(result.documentId);
    } catch {
      if (run === uploadRun.current) {
        setFile(null);
        setErrors((e) => ({
          ...e,
          document: "The upload failed. Please try again.",
        }));
      }
    }
  }

  function removeFile() {
    uploadRun.current++;
    setFile(null);
    setDocumentId(null);
    setProgress(0);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (uploading) return;
    if (!message.trim()) {
      setErrors({ message: "Please tell us the information we asked for." });
      return;
    }
    setErrors({});
    setSending(true);
    try {
      await sendMoreInformation(request.id, { message, documentId });
      router.push(doneHref);
    } catch (err) {
      setErrors({ submit: err.message });
      setSending(false);
    }
  }

  const isPdf = file?.name.toLowerCase().endsWith(".pdf");
  const FileIcon = isPdf ? RiFilePdfLine : RiFileTextLine;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.needed}>
        <RiErrorWarningLine className={styles.neededIcon} aria-hidden="true" />
        <div>
          <h2 className={styles.neededTitle}>What we need from you</h2>
          <p className={styles.neededText}>{request.infoRequest}</p>
        </div>
      </div>

      <h2 className={styles.heading}>Add your response</h2>

      <label htmlFor="message" className={styles.label}>
        Additional information
      </label>
      <textarea
        id="message"
        className={`${styles.textarea} ${errors.message ? styles.invalid : ""}`}
        placeholder="Tell us what you’d like us to know..."
        maxLength={MAX_CHARACTERS}
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
          if (errors.message) setErrors((e) => ({ ...e, message: undefined }));
        }}
        aria-invalid={errors.message ? "true" : undefined}
        aria-describedby="message-count"
      />
      <p id="message-count" className={styles.counter} aria-live="polite">
        {message.length}/{MAX_CHARACTERS} Characters
      </p>
      <FieldError id="message-error">{errors.message}</FieldError>

      <p className={styles.uploadLabel} id="document-label">
        Upload a document <span>(optional)</span>
      </p>
      <p className={styles.uploadHelp}>
        Upload any document/video that helps us support your response.
      </p>

      <input
        ref={fileInput}
        type="file"
        accept={Object.keys(DOCUMENT_TYPES).join(",")}
        className={styles.fileInput}
        onChange={handleFile}
        aria-labelledby="document-label"
      />
      {file ? (
        <div className={styles.file}>
          <div className={styles.fileTop}>
            <FileIcon
              className={`${styles.fileIcon} ${isPdf ? styles.pdf : ""}`}
              aria-hidden="true"
            />
            <div className={styles.fileText}>
              <p className={styles.fileName}>{file.name}</p>
              <p className={styles.fileSize}>{formatFileSize(file.size)}</p>
            </div>
            <RiCheckboxCircleLine
              className={styles.fileTick}
              aria-label={uploading ? undefined : "Uploaded"}
              aria-hidden={uploading ? "true" : undefined}
            />
          </div>
          <ProgressBar
            value={progress}
            label="Upload progress"
            className={styles.fileBar}
          />
          <div className={styles.fileBottom}>
            <p aria-live="polite">
              {uploading ? (
                <>
                  Uploading....&nbsp;&nbsp;&nbsp; <strong>{progress}%</strong>
                </>
              ) : (
                <>
                  Uploaded&nbsp;&nbsp;&nbsp; <strong>100%</strong>
                </>
              )}
            </p>
            <button
              type="button"
              className={styles.remove}
              onClick={removeFile}
            >
              {uploading ? "Cancel" : "Remove"}
            </button>
          </div>
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

      <section className={styles.original}>
        <div className={styles.originalTop}>
          <span className={styles.originalIcon} aria-hidden="true">
            <RiFileTextLine />
          </span>
          <div>
            <h2 className={styles.originalTitle}>Your original request</h2>
            <p className={styles.originalText}>
              View the details of the request you submitted.
            </p>
          </div>
        </div>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setShowOriginal((open) => !open)}
          aria-expanded={showOriginal}
          aria-controls="original-request"
        >
          {showOriginal ? "Hide details" : "View details"}
          <RiArrowDownSLine
            className={`${styles.toggleIcon} ${showOriginal ? styles.open : ""}`}
            aria-hidden="true"
          />
        </button>
        {showOriginal && (
          <div id="original-request" className={styles.originalDetails}>
            <RequestFacts request={request} />
          </div>
        )}
      </section>

      <FieldError id="submit-error">{errors.submit}</FieldError>

      {uploading ? (
        <button
          type="button"
          className={`${styles.busy} ${styles.afterFile}`}
          disabled
        >
          Uploading
          <DotSpinner className={styles.busySpinner} />
        </button>
      ) : (
        <Button
          type="submit"
          fullWidth
          className={`${styles.submit} ${file ? styles.afterFile : ""}`}
          loading={sending}
          loadingText="Submitting information..."
        >
          Submit information
        </Button>
      )}

      <p className={styles.lockNote}>
        <RiLockLine className={styles.lockIcon} aria-hidden="true" />
        <span>
          Once submitted, your request will return to review.
          <br />
          We’ll notify you when there’s an update.
        </span>
      </p>
    </form>
  );
}
