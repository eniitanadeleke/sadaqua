import Image from "next/image";
import styles from "./CauseDetails.module.css";

// Sample faces until the backend sends real donor pictures
const FACES = ["/images/donors/donor-1.webp", "/images/donors/donor-2.webp", "/images/donors/donor-3.webp"];

/** White pill on the photo: three small faces and "12 donors" (Figma: Cause details). */
export default function DonorsChip({ count }) {
  if (!count) return null;
  return (
    <span className={styles.donors}>
      <span className={styles.faces} aria-hidden="true">
        {FACES.slice(0, Math.min(3, count)).map((src) => (
          <Image key={src} src={src} alt="" width={20} height={20} className={styles.face} />
        ))}
      </span>
      {count} {count === 1 ? "donor" : "donors"}
    </span>
  );
}
