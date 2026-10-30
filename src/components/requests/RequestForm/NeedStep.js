"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiArrowDownSLine, RiDashboardLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/categories";
import { parseNaira } from "@/lib/format";
import { useRequestDraft } from "./RequestDraftProvider";
import FieldError from "./FieldError";
import styles from "./RequestForm.module.css";

const withCommas = (amount) => (amount ? amount.toLocaleString("en-NG") : "");

/** Step 1 (Figma: Help Request - Need): category and amount */
export default function NeedStep() {
  const router = useRouter();
  const { draft, update } = useRequestDraft();
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!draft.category) next.category = "Please choose a category.";
    if (!draft.amount) next.amount = "Please enter the amount you need.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      router.push("/recipient/request-help/details");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="category" className={styles.label}>
        Category
      </label>
      <div className={styles.categoryRow}>
        <span className={styles.categoryIcon} aria-hidden="true">
          <RiDashboardLine />
        </span>
        <div
          className={`${styles.selectBox} ${styles.categorySelect} ${errors.category ? styles.invalid : ""}`}
        >
          <select
            id="category"
            className={`${styles.select} ${draft.category ? "" : styles.placeholder}`}
            value={draft.category}
            onChange={(event) => update({ category: event.target.value })}
            aria-invalid={errors.category ? "true" : undefined}
            aria-describedby={errors.category ? "category-error" : undefined}
          >
            <option value="">--Select a category--</option>
            {CATEGORIES.map((category) => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
          <RiArrowDownSLine className={styles.chevron} aria-hidden="true" />
        </div>
      </div>
      <FieldError id="category-error">{errors.category}</FieldError>

      <label htmlFor="amount" className={`${styles.label} ${styles.nextLabel}`}>
        How much help do you need?
      </label>
      <div
        className={`${styles.field} ${styles.amountField} ${errors.amount ? styles.invalid : ""}`}
      >
        <span className={styles.naira} aria-hidden="true">
          {"₦"}
        </span>
        <input
          id="amount"
          className={styles.input}
          inputMode="numeric"
          autoComplete="off"
          placeholder="Enter Amount"
          value={withCommas(draft.amount)}
          onChange={(event) =>
            update({ amount: parseNaira(event.target.value.slice(0, 15)) })
          }
          aria-invalid={errors.amount ? "true" : undefined}
          aria-describedby={
            errors.amount ? "amount-error amount-hint" : "amount-hint"
          }
        />
      </div>
      <p id="amount-hint" className={styles.hint}>
        Enter the amount you need.
      </p>
      <FieldError id="amount-error">{errors.amount}</FieldError>

      <Button type="submit" fullWidth className={styles.continueNeed}>
        Continue
      </Button>
    </form>
  );
}
