import Image from "next/image";
import styles from "./Logo.module.css";

/**
 * Sadaqua logo: the orange mark, the SADAQUA wordmark and the tagline.
 *
 * size: "lg" (Welcome screen) | "md" (sign up, log in and other auth screens)
 *       | "sm" (app header: mark on the left, words on the right)
 */
const MARK_WIDTH = { lg: 98, md: 52, sm: 40 };

export default function Logo({ size = "lg", className = "" }) {
  const width = MARK_WIDTH[size];
  // The source image is 115 x 113, so keep that shape.
  const height = Math.round((width * 113) / 115);

  return (
    <div className={`${styles.logo} ${styles[size]} ${className}`}>
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={width}
        height={height}
        loading="eager"
      />
      <div className={styles.words}>
        <p className={styles.wordmark}>SADAQUA</p>
        <p className={styles.tagline}>The Place for Help</p>
      </div>
    </div>
  );
}
