"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
  RiShieldCheckLine,
} from "react-icons/ri";
import SadaqahIcon from "@/components/icons/SadaqahIcon";
import Button from "@/components/ui/Button";
import { DONATION_TYPES } from "@/lib/api/donations";
import SecureNote from "./SecureNote";
import styles from "./DonationFlow.module.css";

/**
 * "Choose an option": Sadaqah (this cause) or General donation (Sadaqua's general fund).
 * Nothing is picked at first, so Continue starts disabled (Figma: Donation - Unselected).
 */
export default function ChooseDonation({ causeId }) {
  const router = useRouter();
  const [choice, setChoice] = useState(null);

  function handleContinue() {
    if (choice === "sadaqah") router.push(`/giver/donate/${causeId}/amount`);
    if (choice === "general")
      router.push(`/giver/donate/general?from=${causeId}`);
  }

  return (
    <>
      <h3 id="choose-option" className={styles.sectionTitle}>
        Choose an option
      </h3>

      <div
        className={styles.options}
        role="radiogroup"
        aria-labelledby="choose-option"
      >
        {Object.values(DONATION_TYPES).map((type) => {
          const selected = choice === type.key;
          const Mark = selected
            ? RiCheckboxCircleFill
            : RiCheckboxBlankCircleLine;
          return (
            <button
              key={type.key}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`${styles.option} ${selected ? styles.optionSelected : ""}`}
              onClick={() => setChoice(type.key)}
            >
              <span className={styles.optionCircle} aria-hidden="true">
                {type.key === "sadaqah" ? (
                  <SadaqahIcon />
                ) : (
                  <span className={styles.generalIcon} />
                )}
              </span>
              <span className={styles.optionText}>
                <span className={styles.optionTitle}>{type.label}</span>
                <span className={styles.optionDescription}>
                  {type.description}
                </span>
              </span>
              <Mark className={styles.optionMark} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className={styles.infoBox}>
        <RiShieldCheckLine className={styles.infoIcon} aria-hidden="true" />
        <p>
          Every donation is secure and transparent.
          <br />
          We ensure it reaches those in need.
        </p>
      </div>

      <Button
        fullWidth
        disabled={!choice}
        onClick={handleContinue}
        className={styles.continue}
      >
        Continue
      </Button>
      <SecureNote />
    </>
  );
}
