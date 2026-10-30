import Link from "next/link";
import { RiCheckLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import { ClearDraft } from "@/components/requests/RequestForm";
import WhatHappensNext from "@/components/requests/WhatHappensNext";
import { RECIPIENT_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Request submitted | Sadaqua" };

// Figma: Request Submitted. Shown after "Submit request" on the Review step.
export default function RequestSubmittedPage() {
  return (
    <MobileScreen top="flush">
      <ClearDraft />
      <MobileHeader
        homeHref="/recipient"
        profileHref="/recipient/profile"
        menuItems={RECIPIENT_MENU}
      />

      <div className={styles.done}>
        <span className={styles.circle} aria-hidden="true">
          <RiCheckLine />
        </span>
        <h1 className={styles.title}>
          Your request has been
          <br />
          submitted!
        </h1>
        <p className={styles.text}>
          Our team will review your request.
          <br />
          You can track its progress from your account.
        </p>
      </div>

      <div className={styles.card}>
        <WhatHappensNext />
      </div>

      <Button href="/recipient/requests" fullWidth className={styles.track}>
        Track my request
      </Button>
      <Link href="/recipient" className={styles.home}>
        Back to home
      </Link>
    </MobileScreen>
  );
}
