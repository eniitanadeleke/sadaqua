import Link from "next/link";
import {
  RiArrowRightLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiEditLine,
  RiErrorWarningLine,
  RiHeadphoneLine,
  RiPencilLine,
} from "react-icons/ri";
import HandHeartIcon from "@/components/icons/HandHeartIcon";
import HourglassIcon from "@/components/icons/HourglassIcon";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import DocumentRow from "@/components/requests/RequestForm/DocumentRow";
import { getCategory } from "@/lib/categories";
import { formatDate, formatNaira, percentRaised } from "@/lib/format";
import { getStatusPanel } from "@/lib/requestStatus";
import styles from "./RequestDetails.module.css";

// Pieces of the request details page (Figma: My request details).

const PANEL_ICONS = {
  review: HourglassIcon,
  changes: RiEditLine,
  verified: RiCheckboxCircleLine,
  progress: HandHeartIcon,
  rejected: RiCloseCircleLine,
};

/**
 * The coloured status box inside the request card.
 * action: optional button under the text (e.g. "Provide information")
 */
export function RequestStatusPanel({ status, action }) {
  const { tone, title, lines } = getStatusPanel(status);
  const Icon = PANEL_ICONS[tone];
  return (
    <div className={`${styles.panel} ${styles[tone]}`} role="status">
      <span className={styles.panelIcon} aria-hidden="true">
        <Icon />
      </span>
      <div className={styles.panelBody}>
        <p className={styles.panelTitle}>{title}</p>
        <p className={styles.panelText}>
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        {action}
      </div>
    </div>
  );
}

const STEP_LABELS = {
  done: "Done",
  current: "Current stage",
  pending: "Not reached yet",
  failed: "Not approved",
};

/**
 * "Request Progress": the stages with a line joining them.
 * steps: from lib/requestTimeline.js
 * children: extra lines at the bottom of the card (e.g. the reason)
 * roomy: Figma leaves extra space under the last step on Under review
 *        and Verified (the frames where "Your request" follows)
 */
export function RequestProgress({ steps, roomy = false, children }) {
  return (
    <section
      className={styles.progressSection}
      aria-labelledby="progress-title"
    >
      <h2 id="progress-title" className={styles.sectionTitle}>
        Request Progress
      </h2>
      <div className={`${styles.progressCard} ${roomy ? styles.roomy : ""}`}>
        <ol className={styles.steps}>
          {steps.map((step, i) => {
            const next = steps[i + 1];
            const lineDone = next && next.state !== "pending";
            return (
              <li
                key={step.key}
                className={`${styles.step} ${styles[step.state]} ${step.key === "progress" ? styles.green : ""}`}
              >
                <StepMarker state={step.state} />
                {next && (
                  <span
                    className={`${styles.stepLine} ${lineDone ? styles.lineDone : ""}`}
                    aria-hidden="true"
                  />
                )}
                <div className={styles.stepHead}>
                  <h3 className={styles.stepTitle}>
                    {step.title}
                    <span className={styles.srOnly}>
                      {" "}
                      ({STEP_LABELS[step.state]})
                    </span>
                  </h3>
                  {step.date && step.state !== "pending" && (
                    <time dateTime={step.date} className={styles.stepDate}>
                      {formatDate(step.date)}
                    </time>
                  )}
                </div>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            );
          })}
        </ol>
        {children}
      </div>
    </section>
  );
}

function StepMarker({ state }) {
  if (state === "done") {
    return (
      <RiCheckboxCircleLine className={styles.markerIcon} aria-hidden="true" />
    );
  }
  if (state === "failed") {
    return (
      <RiCloseCircleLine className={styles.markerIcon} aria-hidden="true" />
    );
  }
  return <span className={styles.marker} aria-hidden="true" />;
}

/** "Reason" under a request that was not approved */
export function RejectionReason({ reason }) {
  if (!reason) return null;
  return (
    <div className={styles.reason}>
      <h3 className={styles.reasonTitle}>Reason</h3>
      <p className={styles.reasonText}>{reason}</p>
    </div>
  );
}

/**
 * What the person asked for: need, category, amount, urgency, description
 * and the document (Figma: "Your request" card).
 */
export function RequestFacts({ request }) {
  const urgent = request.urgency === "urgent";
  return (
    <>
      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt>What you need</dt>
          <dd>{request.title}</dd>
        </div>
        <div className={styles.fact}>
          <dt>Category</dt>
          <dd>{getCategory(request.category).label}</dd>
        </div>
        <div className={styles.fact}>
          <dt>Amount needed</dt>
          <dd>{formatNaira(request.amount)}</dd>
        </div>
        <div className={styles.fact}>
          <dt>Urgency</dt>
          <dd>
            <span
              className={`${styles.urgency} ${urgent ? styles.urgent : ""}`}
            >
              <RiCheckboxCircleLine aria-hidden="true" />
              {urgent ? "Urgent" : "Normal"}
            </span>
          </dd>
        </div>
        {request.description && (
          <div className={`${styles.fact} ${styles.wide}`}>
            <dt>Description</dt>
            <dd className={styles.description}>{request.description}</dd>
          </div>
        )}
      </dl>
      {request.document && (
        <div className={styles.factsDocument}>
          <DocumentRow document={request.document} />
        </div>
      )}
    </>
  );
}

/**
 * "Your request" card. editHref: shows the Edit link (only while the
 * request can still be changed). children: e.g. the "Next step" box.
 */
export function YourRequestCard({ request, editHref, children }) {
  return (
    <section className={styles.yourRequest} aria-labelledby="your-request">
      <div className={styles.cardHeader}>
        <h2 id="your-request" className={styles.cardTitle}>
          Your request
        </h2>
        {editHref && (
          <Link href={editHref} className={styles.edit}>
            Edit
            <RiPencilLine className={styles.editIcon} aria-hidden="true" />
          </Link>
        )}
      </div>
      <RequestFacts request={request} />
      {children}
    </section>
  );
}

/** "Next step" box at the bottom of "Your request" (Figma: Verified) */
export function NextStep({ lines }) {
  return (
    <div className={`${styles.panel} ${styles.verified} ${styles.nextStep}`}>
      <span
        className={`${styles.panelIcon} ${styles.review}`}
        aria-hidden="true"
      >
        <HourglassIcon />
      </span>
      <div className={styles.panelBody}>
        <p className={styles.panelTitle}>Next step</p>
        <p className={styles.panelText}>
          {lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
    </div>
  );
}

/** Money received so far, with a bar (Figma: In progress, Fulfilled) */
export function FundingProgress({ received = 0, amount, done = false }) {
  const percent = done ? 100 : percentRaised(received, amount);
  return (
    <section className={styles.funding}>
      <h2 className={styles.fundingLabel}>
        {done ? "Amount received" : "Total received"}
      </h2>
      <p className={styles.fundingRow}>
        <span>
          {formatNaira(received)} of {formatNaira(amount)}
        </span>
        <strong>{percent}%</strong>
      </p>
      <ProgressBar
        value={percent}
        label="Amount received"
        className={styles.fundingBar}
      />
    </section>
  );
}

/** Pale green box with an "i" and a short note */
export function InfoNote({ children }) {
  return (
    <p className={styles.infoNote}>
      <RiErrorWarningLine className={styles.infoIcon} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/** "Need help?" box with a link to Support (Figma: Request not approved) */
export function NeedHelp() {
  return (
    <section className={styles.needHelp}>
      <RiHeadphoneLine className={styles.infoIcon} aria-hidden="true" />
      <div>
        <h2 className={styles.needHelpTitle}>Need help?</h2>
        <p className={styles.needHelpText}>
          Contact our support team if you have questions about this decision.
        </p>
        <Link href="/recipient/support" className={styles.contact}>
          Contact support
          <RiArrowRightLine className={styles.contactIcon} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

/** The "Provide information" button in the More information needed box */
export function ProvideInformationButton({ href }) {
  return (
    <Button href={href} size="medium" className={styles.provide}>
      Provide information
    </Button>
  );
}
