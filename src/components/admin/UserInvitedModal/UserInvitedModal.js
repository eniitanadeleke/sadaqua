import { RiCheckLine } from "react-icons/ri";
import AdminModal from "@/components/admin/AdminModal";
import Button from "@/components/ui/Button";
import styles from "./UserInvitedModal.module.css";

/** "Invitation sent" (Figma: Add Users-1). name: the invited person's first name */
export default function UserInvitedModal({ name, closeHref }) {
  return (
    <AdminModal closeHref={closeHref} className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        <RiCheckLine />
      </span>
      <h2 className={styles.title}>Invitation sent</h2>
      <p className={styles.text}>
        {name} will receive an email with instructions to join the Sadaqua
        organisation workspace.
      </p>
      <Button href={closeHref} fullWidth className={styles.button}>
        Return to Request
      </Button>
    </AdminModal>
  );
}
