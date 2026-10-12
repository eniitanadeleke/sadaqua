"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MdFilterList, MdKeyboardArrowDown } from "react-icons/md";
import { TbMapPin } from "react-icons/tb";
import Button from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/categories";
import { URGENCY_OPTIONS, causesHref } from "@/lib/causeFilters";
import styles from "./CauseFilters.module.css";

/**
 * The "Filter" button and the sheet it opens (Figma: Browse causes - Filter).
 * Choices are a draft until "Apply filters" puts them in the address.
 *
 * filters:   the filters now in the address
 * areas:     ["FCT", "Kaduna", ...] for the Areas dropdown
 * localCity: the giver's city, for "Local causes (Abuja)"
 */
export default function CauseFilters({ filters, areas, localCity }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);
  const sheetRef = useRef(null);
  const buttonRef = useRef(null);

  function openSheet() {
    setDraft(filters); // start from what is applied now
    setOpen(true);
  }

  function closeSheet() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function apply() {
    setOpen(false);
    router.push(causesHref({ ...filters, ...draft }), { scroll: false });
  }

  // While open: move focus into the sheet, close on Escape
  useEffect(() => {
    if (!open) return undefined;
    sheetRef.current?.focus();
    function onKey(event) {
      if (event.key === "Escape") closeSheet();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const set = (name) => (event) => setDraft((d) => ({ ...d, [name]: event.target.value }));

  const categoryOptions = [{ value: "all", label: "All" }, ...CATEGORIES.map((c) => ({ value: c.key, label: c.label }))];
  const scopeOptions = [
    { value: "all", label: "All" },
    { value: "local", label: `Local causes (${localCity})` },
    { value: "other", label: "Other causes" },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openSheet}
      >
        <MdFilterList className={styles.triggerIcon} aria-hidden="true" />
        Filter
      </button>

      {open && (
        <>
          <div className={styles.backdrop} onClick={closeSheet} aria-hidden="true" />
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filter causes"
            tabIndex={-1}
            className={styles.sheet}
          >
            <span className={styles.handle} aria-hidden="true" />

            <Choices legend="Category" name="category" options={categoryOptions} value={draft.category} onChange={set("category")} layout="grid" />
            <Choices legend="Urgency" name="urgency" options={URGENCY_OPTIONS} value={draft.urgency} onChange={set("urgency")} layout="grid" />

            <label className={styles.legend} htmlFor="filter-area">
              Areas
            </label>
            <div className={styles.selectBox}>
              <TbMapPin className={styles.pin} aria-hidden="true" />
              <select id="filter-area" value={draft.area} onChange={set("area")} className={styles.select}>
                <option value="all">All areas</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown className={styles.chevron} aria-hidden="true" />
            </div>

            <Choices legend="Location scope" name="scope" options={scopeOptions} value={draft.scope} onChange={set("scope")} layout="row" />

            <div className={styles.actions}>
              <Button fullWidth onClick={apply}>
                Apply filters
              </Button>
              <Button variant="outlined" fullWidth onClick={closeSheet} className={styles.close}>
                Close
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

/** A group of pill-shaped radio buttons */
function Choices({ legend, name, options, value, onChange, layout }) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={layout === "grid" ? styles.grid : styles.row}>
        {options.map((option) => (
          <label key={option.value} className={styles.choice}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className={styles.radio}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
