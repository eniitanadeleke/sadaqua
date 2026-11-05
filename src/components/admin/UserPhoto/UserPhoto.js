import Image from "next/image";
import styles from "./UserPhoto.module.css";

/**
 * Round photo with a thin grey ring (Figma: Users list 40px, Manage user 96px).
 * Without a photo it shows the person's initials.
 */
export default function UserPhoto({ src, name, size = 40, className = "" }) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={`${styles.ring} ${className}`}
      style={{ width: size + 2, height: size + 2 }}
      aria-hidden="true"
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          className={styles.photo}
          unoptimized
        />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
    </span>
  );
}
