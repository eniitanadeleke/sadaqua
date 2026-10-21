"use client";

import { useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import styles from "./CauseDetails.module.css";

/**
 * Gold heart with "Save cause" beside it. A client component because it toggles.
 * Today it only remembers on this screen; the backend will store it later.
 */
export default function SaveCauseButton() {
  const [saved, setSaved] = useState(false);
  const Icon = saved ? RiHeartFill : RiHeartLine;
  return (
    <button type="button" className={styles.saveCause} aria-pressed={saved} onClick={() => setSaved((v) => !v)}>
      <Icon className={styles.saveIcon} aria-hidden="true" />
      {saved ? "Saved" : "Save cause"}
    </button>
  );
}
