import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.brand}>
          <h1>SADAQUA</h1>
          <p>The Place for Help</p>
        </div>

        <div className={styles.content}>
          <h2>
            Give with purpose.
            <span>Receive help with dignity.</span>
          </h2>

          <p className={styles.description}>
            A trusted place to give and ask for help in times of need.
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/register?role=giver" className={styles.primaryCard}>
            <strong>I want to give</strong>
            <span>Find verified causes and make a contribution.</span>
          </Link>

          <Link
            href="/register?role=recipient"
            className={styles.secondaryCard}
          >
            <strong>I need help</strong>
            <span>Request support and track your request.</span>
          </Link>
        </div>
      </section>
    </main>
  );
}