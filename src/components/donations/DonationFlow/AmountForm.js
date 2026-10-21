"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { checkDonationAmount, PRESET_AMOUNTS } from "@/lib/api/donations";
import { formatNaira, percentRaised } from "@/lib/format";
import BusyButton from "./BusyButton";
import SecureNote from "./SecureNote";
import styles from "./DonationFlow.module.css";

const toNumber = (text) => Number(text.replace(/\D/g, "").slice(0, 10)) || 0;
const withCommas = (amount) => (amount ? amount.toLocaleString("en-NG") : "");

/**
 * "Your contribution": type an amount or tap a quick amount, then Continue.
 * While the amount is checked the screen shows the Figma "processing" state,
 * then it goes to the Review screen.
 *
 * fund:       { raised, goal } shown under the chips (the cause, or the general fund)
 * reviewPath: the Review screen link without the amount (the amount is added on Continue)
 */
export default function AmountForm({ fund, initialAmount = 0, reviewPath }) {
  const router = useRouter();
  const [amount, setAmount] = useState(initialAmount);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const percent = percentRaised(fund.raised, fund.goal);
  const stillNeeded = Math.max(0, fund.goal - fund.raised);

  async function handleContinue() {
    setError("");
    setProcessing(true);
    try {
      await checkDonationAmount({ amount });
      router.push(`${reviewPath}&amount=${amount}`);
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  }

  return (
    <div className={processing ? styles.processing : undefined}>
      <h3 className={styles.sectionTitle}>
        <label htmlFor="amount">Your contribution</label>
      </h3>

      <div
        className={`${styles.amountField} ${amount ? styles.amountFieldFilled : ""}`}
      >
        <span className={styles.naira} aria-hidden="true">
          {"₦"}
        </span>
        <input
          id="amount"
          className={styles.amountInput}
          inputMode="numeric"
          autoComplete="off"
          placeholder="Enter Amount"
          value={withCommas(amount)}
          onChange={(event) => setAmount(toNumber(event.target.value))}
          disabled={processing}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? "amount-error" : undefined}
        />
      </div>

      <div className={styles.chips} role="group" aria-label="Quick amounts">
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`${styles.chip} ${amount === preset ? styles.chipSelected : ""}`}
            aria-pressed={amount === preset}
            onClick={() => setAmount(preset)}
            disabled={processing}
          >
            {formatNaira(preset)}
          </button>
        ))}
      </div>

      <div className={styles.fundRow}>
        <p>
          <strong>{formatNaira(fund.raised)}</strong> raised of{" "}
          {formatNaira(fund.goal)}
        </p>
        <p className={styles.fundPercent}>{percent}%</p>
      </div>
      <ProgressBar
        value={percent}
        label={`${percent}% raised`}
        className={styles.fundBar}
      />

      <p className={styles.stillNeeded}>
        <RiErrorWarningLine aria-hidden="true" />
        {formatNaira(stillNeeded)} still needed
      </p>

      <p className={styles.feeNote}>
        A processing fee will be charge at the point of payment.
      </p>

      <div className={styles.goalNote}>
        <RiErrorWarningLine className={styles.goalIcon} aria-hidden="true" />
        <p>
          Please note if the goal is not met the partial amount still goes to
          the beneficiary, and any surplus goes to the general fund or the next
          similar need.
        </p>
      </div>

      {processing ? (
        <BusyButton label="Processing" className={styles.continueAfterNote} />
      ) : (
        <Button
          fullWidth
          disabled={!amount}
          onClick={handleContinue}
          className={styles.continueAfterNote}
        >
          Continue
        </Button>
      )}
      {error && (
        <p id="amount-error" className={styles.payError} role="alert">
          {error}
        </p>
      )}
      <SecureNote />
    </div>
  );
}
