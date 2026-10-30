"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiFileTextLine,
  RiLockLine,
  RiMapPinLine,
  RiPencilLine,
} from "react-icons/ri";
import HandHeartIcon from "@/components/icons/HandHeartIcon";
import Button from "@/components/ui/Button";
import { submitHelpRequest } from "@/lib/api/recipient";
import { getCategory } from "@/lib/categories";
import { formatNaira } from "@/lib/format";
import { STEP_PATHS, useStepGuard } from "./useStepGuard";
import { useRequestDraft } from "./RequestDraftProvider";
import DocumentRow from "./DocumentRow";
import FieldError from "./FieldError";
import styles from "./RequestForm.module.css";

/** Step 4 (Figma: Help Request - Review): check everything, then submit */
export default function ReviewStep() {
  const router = useRouter();
  const allowed = useStepGuard(4);
  const { draft, file } = useRequestDraft();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (!allowed) return null;

  async function handleSubmit() {
    setError("");
    setSending(true);
    try {
      const { id } = await submitHelpRequest({ ...draft, file });
      // The success screen clears the draft (clearing here would send
      // this step back to step 1 before the new page opens).
      router.push(`/recipient/request-help/success?id=${id}`);
    } catch (err) {
      setError(err.message);
      setSending(false);
    }
  }

  const urgent = draft.urgency === "urgent";

  return (
    <div className={styles.review}>
      <ReviewCard
        icon={HandHeartIcon}
        title="Your need"
        editHref={STEP_PATHS[0]}
      >
        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>Category</dt>
            <dd>{getCategory(draft.category).label}</dd>
          </div>
          <div className={styles.factPair}>
            <div className={styles.fact}>
              <dt>Amount needed</dt>
              <dd>{formatNaira(draft.amount)}</dd>
            </div>
            <div className={styles.fact}>
              <dt>Urgency</dt>
              <dd>
                <span
                  className={`${styles.urgencyBadge} ${urgent ? styles.urgentBadge : ""}`}
                >
                  <RiCheckboxCircleLine aria-hidden="true" />
                  {urgent ? "Urgent" : "Normal"}
                </span>
              </dd>
            </div>
          </div>
          <div className={styles.fact}>
            <dt>Description</dt>
            <dd className={styles.description}>{draft.description}</dd>
          </div>
        </dl>
      </ReviewCard>

      <ReviewCard
        icon={RiMapPinLine}
        title="Location"
        editHref={STEP_PATHS[2]}
        className={styles.locationCard}
      >
        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>Area</dt>
            <dd>
              {draft.area}, {draft.state}
            </dd>
          </div>
        </dl>
        <p className={styles.smallNote}>
          <RiErrorWarningLine aria-hidden="true" />
          Only your general location will be shown publicly.
        </p>
      </ReviewCard>

      <ReviewCard
        icon={RiFileTextLine}
        title="Supporting document"
        editHref={STEP_PATHS[2]}
        className={styles.documentCard}
      >
        <div className={styles.reviewDocument}>
          <DocumentRow document={draft.document} />
        </div>
        <p className={styles.smallNote}>
          <RiErrorWarningLine aria-hidden="true" />
          Your document will only be used during verification.
        </p>
      </ReviewCard>

      <p className={styles.consent}>
        <RiErrorWarningLine className={styles.consentIcon} aria-hidden="true" />
        <span>
          By submitting this request, you confirm that the information provided
          is accurate and that Sadaqua may review your request for verification.
        </span>
      </p>

      <FieldError id="submit-error">{error}</FieldError>

      <Button
        fullWidth
        className={styles.submit}
        onClick={handleSubmit}
        loading={sending}
        loadingText="Submitting request..."
      >
        Submit request
      </Button>

      <p className={styles.protected}>
        <RiLockLine className={styles.protectedIcon} aria-hidden="true" />
        Your information is protected and kept private
      </p>
    </div>
  );
}

function ReviewCard({ icon: Icon, title, editHref, className = "", children }) {
  return (
    <section className={`${styles.reviewCard} ${className}`}>
      <div className={styles.reviewHeader}>
        <span className={styles.reviewIcon} aria-hidden="true">
          <Icon />
        </span>
        <h3 className={styles.reviewTitle}>{title}</h3>
        <Link
          href={editHref}
          className={styles.edit}
          aria-label={`Edit ${title.toLowerCase()}`}
        >
          Edit
          <RiPencilLine className={styles.editIcon} aria-hidden="true" />
        </Link>
      </div>
      {children}
    </section>
  );
}
