"use client";

import { useState } from "react";
import {
  RiCheckLine,
  RiFacebookFill,
  RiInstagramLine,
  RiLink,
  RiTwitterXFill,
  RiWhatsappLine,
} from "react-icons/ri";
import styles from "./CauseDetails.module.css";

/**
 * "Share this causes" card with five round buttons (Figma: Cause details).
 * A client component because it reads the page address and copies the link.
 */
export default function ShareCause({ title }) {
  const [copied, setCopied] = useState(false);

  function shareUrl(kind) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${title} - support this cause on Sadaqua`);
    return {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://x.com/intent/post?text=${text}&url=${url}`,
      instagram: "https://www.instagram.com/",
    }[kind];
  }

  function open(kind) {
    window.open(shareUrl(kind), "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: nothing to do, the address bar still has the link
    }
  }

  return (
    <section className={styles.share} aria-labelledby="share-cause">
      <h2 id="share-cause" className={styles.shareTitle}>
        Share this causes
      </h2>
      <p className={styles.shareText}>Help us reach more people in need.</p>
      <div className={styles.shareButtons}>
        <button type="button" className={`${styles.shareButton} ${styles.whatsapp}`} onClick={() => open("whatsapp")} aria-label="Share on WhatsApp">
          <RiWhatsappLine aria-hidden="true" />
        </button>
        <button type="button" className={`${styles.shareButton} ${styles.facebook}`} onClick={() => open("facebook")} aria-label="Share on Facebook">
          <RiFacebookFill aria-hidden="true" />
        </button>
        <button type="button" className={`${styles.shareButton} ${styles.x}`} onClick={() => open("x")} aria-label="Share on X">
          <RiTwitterXFill aria-hidden="true" />
        </button>
        <button type="button" className={`${styles.shareButton} ${styles.instagram}`} onClick={() => open("instagram")} aria-label="Open Instagram">
          <RiInstagramLine aria-hidden="true" />
        </button>
        <button type="button" className={`${styles.shareButton} ${styles.copy}`} onClick={copyLink} aria-label={copied ? "Link copied" : "Copy link"}>
          {copied ? <RiCheckLine aria-hidden="true" /> : <RiLink aria-hidden="true" />}
        </button>
      </div>
    </section>
  );
}
