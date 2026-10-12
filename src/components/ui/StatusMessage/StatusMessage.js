import Button from "@/components/ui/Button";
import styles from "./StatusMessage.module.css";

/**
 * A centred result screen: an icon in a circle, a title, a short message
 * and one button. From the Figma "Password Reset Successful" screen;
 * also used for "Check your email".
 *
 * icon: "check" | "mail"
 */
export default function StatusMessage({
  icon = "check",
  title,
  children,
  actionLabel,
  actionHref,
}) {
  return (
    <section className={styles.status}>
      <div className={styles.icon} aria-hidden="true">
        {icon === "mail" ? <MailIcon /> : <CheckIcon />}
      </div>

      <h1 className={styles.title}>{title}</h1>
      <div className={styles.message}>{children}</div>

      {actionHref && (
        <div className={styles.action}>
          <Button href={actionHref} fullWidth>
            {actionLabel}
          </Button>
        </div>
      )}
    </section>
  );
}

// 28 x 20 tick, measured from Figma
function CheckIcon() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      <path
        d="M2 10l8 8L26 2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
      <rect
        x="1.5"
        y="1.5"
        width="27"
        height="21"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M3 4l12 9 12-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
