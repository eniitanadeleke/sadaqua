import DotSpinner from "@/components/ui/DotSpinner";
import styles from "./DonationFlow.module.css";

/** Pale green bar with the dotted spinner ("Processing", "Preparing payment") */
export default function BusyButton({ label, className = "" }) {
  return (
    <div
      className={`${styles.busyButton} ${className}`}
      role="status"
      aria-live="polite"
    >
      <span>{label}</span>
      <DotSpinner />
    </div>
  );
}
