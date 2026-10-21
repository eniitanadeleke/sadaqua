"use client";

import { useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import styles from "./CauseCard.module.css";

/**
 * Gold heart that saves a cause for later. Client component because it toggles.
 * Today it only remembers on this screen; the backend will store it later.
 */
export default function SaveButton({ causeTitle, size = 24 }) {
  const [saved, setSaved] = useState(false);
  const Icon = saved ? RiHeartFill : RiHeartLine;
  return (
    <button
      type="button"
      className={styles.save}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${causeTitle} from saved` : `Save ${causeTitle}`}
      onClick={() => setSaved((value) => !value)}
    >
      <Icon size={size} aria-hidden="true" />
    </button>
  );
}
