import Image from "next/image";
import styles from "./Logo.module.css";

/**
 * Sadaqua logo: the green mark (the designer's own image, taken from the Figma file), the gold SADAQUA wordmark and the
 * deep green tagline (colours from the updated Figma).
 *
 * size: "lg" (Welcome screen) | "md" (sign up, log in and other auth screens)
 *       | "sm" (app header: mark on the left, words on the right)
 */

// Size of the mark's box in px, as placed in Figma (the image has a little
// transparent space around the circle, exactly like the designer's file).
const MARK_SIZE = { lg: 102, md: 56, sm: 40 };

export default function Logo({ size = "lg", className = "" }) {
  const width = MARK_SIZE[size];
  const height = width;

  return (
    <div className={`${styles.logo} ${styles[size]} ${className}`}>
      <Image
        src="/images/logo-mark.webp"
        alt=""
        width={width}
        height={height}
        className={styles.mark}
        style={{ width, height }}
        loading="eager"
        unoptimized
      />
      <div className={styles.words}>
        <p className={styles.wordmark}>SADAQUA</p>
        <p className={styles.tagline}>The Place for Help</p>
      </div>
    </div>
  );
}
