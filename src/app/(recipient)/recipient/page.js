import Image from "next/image";
import { RiFileTextLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import IconEmptyState from "@/components/ui/IconEmptyState";
import SectionHeader from "@/components/ui/SectionHeader";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileScreen from "@/components/layout/MobileScreen";
import RequestCard from "@/components/requests/RequestCard";
import HelpfulLinks from "@/components/recipient/HelpfulLinks";
import PrivacyNotice from "@/components/recipient/PrivacyNotice";
import { getMyRequests, getRecipientSummary } from "@/lib/api/recipient";
import { RECIPIENT_MENU } from "@/lib/navigation";
import styles from "./page.module.css";

export const metadata = { title: "Home | Sadaqua" };

const REQUEST_HELP = "/recipient/request-help";

// Server component.
// /recipient shows a recipient with no requests yet (Figma: Recipient Home - Empty State).
// /recipient?preview=demo shows the sample request (Figma: Recipient Home).
export default async function RecipientHomePage({ searchParams }) {
  const { preview } = await searchParams;
  const [recipient, requests] = await Promise.all([
    getRecipientSummary(),
    getMyRequests({ demo: preview === "demo" }),
  ]);
  const latest = requests[0];

  return (
    <MobileScreen top="flush">
      <MobileHeader
        homeHref="/recipient"
        profileHref="/recipient/profile"
        menuItems={RECIPIENT_MENU}
        nav="bottom"
      />

      <section className={styles.hero}>
        <p className={styles.greeting}>
          Assalamu alaikum, {recipient.firstName}
        </p>
        <h1 className={styles.heading}>Need help?</h1>
        <p className={styles.tagline}>
          Tell us what you need and
          <br />
          we’ll guide you through the
          <br />
          process.
        </p>
        <Button href={REQUEST_HELP} size="medium" className={styles.heroButton}>
          Request help
        </Button>
        <Image
          src="/images/request-hands.webp"
          alt=""
          width={181}
          height={181}
          className={styles.hands}
          loading="eager"
        />
      </section>

      <section
        className={`${styles.section} ${latest ? "" : styles.emptySection}`}
        aria-labelledby="your-request"
      >
        <SectionHeader
          id="your-request"
          title="Your request"
          actionHref="/recipient/requests"
        />
        {latest ? (
          <div className={styles.requestBody}>
            <RequestCard request={latest} />
          </div>
        ) : (
          <IconEmptyState
            icon={<RiFileTextLine className={styles.emptyIcon} />}
            tone="mint"
            title={
              <>
                You haven’t submitted
                <br />a request yet.
              </>
            }
            actionLabel="Request help"
            actionHref={REQUEST_HELP}
            className={styles.empty}
          >
            <p>
              When you need help you can submit your
              <br />
              request and track it progress here.
            </p>
          </IconEmptyState>
        )}
      </section>

      <section className={styles.section} aria-labelledby="helpful-information">
        <SectionHeader id="helpful-information" title="Helpful information" />
        <div className={styles.helpBody}>
          <HelpfulLinks />
        </div>
      </section>

      <PrivacyNotice className={styles.privacy} />
    </MobileScreen>
  );
}
