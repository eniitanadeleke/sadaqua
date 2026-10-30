import { RiShieldCheckLine } from "react-icons/ri";
import BackHeader from "@/components/layout/BackHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import { RECIPIENT_MENU } from "@/lib/navigation";
import StepIndicator from "./StepIndicator";
import styles from "./RequestForm.module.css";

/**
 * The frame every Help request step shares: header, "Help request" back row,
 * "Your information is private", the 1-2-3-4 steps, and the step's title.
 */
export default function HelpRequestScreen({
  step,
  backHref,
  title,
  subtitle,
  children,
}) {
  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/recipient"
        profileHref="/recipient/profile"
        menuItems={RECIPIENT_MENU}
      />

      <BackHeader
        title="Help request"
        backHref={backHref}
        className={styles.backRow}
      />

      <p className={styles.private}>
        <RiShieldCheckLine className={styles.privateIcon} aria-hidden="true" />
        Your information is private
      </p>

      <StepIndicator current={step} />

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>

      {children}
    </MobileScreen>
  );
}
