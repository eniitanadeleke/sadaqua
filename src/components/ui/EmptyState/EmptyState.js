import Image from "next/image";
import Button from "@/components/ui/Button";
import styles from "./EmptyState.module.css";

/**
 * Picture, title, short message and one button, centred.
 * Used for "No causes found" and "Couldn't load causes" (and later empty lists).
 *
 * image: { src, width, height } drawn inside a 100px-tall space
 */
export default function EmptyState({ image, title, children, actionLabel, actionHref, role }) {
  return (
    <section className={styles.empty} role={role}>
      {image && (
        <div className={styles.picture}>
          <Image src={image.src} alt="" width={image.width} height={image.height} />
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.message}>{children}</div>
      {actionHref && (
        <Button href={actionHref} className={styles.button}>
          {actionLabel}
        </Button>
      )}
    </section>
  );
}
