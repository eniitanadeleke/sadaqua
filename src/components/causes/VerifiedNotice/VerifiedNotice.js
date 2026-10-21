import { RiShieldCheckFill } from "react-icons/ri";
import Button from "@/components/ui/Button";
import styles from "./VerifiedNotice.module.css";

/** Green note explaining that every cause is verified. */
export default function VerifiedNotice({ learnMoreHref = "/giver/support" }) {
  return (
    <aside className={styles.notice}>
      <span className={styles.circle} aria-hidden="true">
        <RiShieldCheckFill />
      </span>
      <div>
        <p className={styles.title}>Every cause is verified</p>
        <p className={styles.text}>
          We verify each cause to ensure transparency and that your support reaches those in need
        </p>
      </div>
      <Button href={learnMoreHref} variant="outlined" className={styles.button}>
        Learn how we verify
      </Button>
    </aside>
  );
}
