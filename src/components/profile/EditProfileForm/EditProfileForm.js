"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  RiArrowDownSLine,
  RiLock2Line,
  RiShieldCheckLine,
} from "react-icons/ri";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { NAME_DISPLAY_OPTIONS } from "@/lib/nameDisplay";
import styles from "./EditProfileForm.module.css";

/**
 * Name and phone can be changed here; the email can only be changed by support
 * (Figma: Giver Edit Profile). Saving goes back to the Profile screen.
 * As in Figma, the boxes start empty and show the current details in grey;
 * a box left empty keeps its current value.
 *
 * profile:     { fullName, email, countryCode, phone, nameDisplay? }
 * saveProfile: server action that saves the changes and returns { error }
 * profileHref: the Profile screen (where Save and Cancel go back to)
 * showNameDisplay: recipients choose how their name appears on requests
 * secureText:  the line under "Your information is secure"
 */
export default function EditProfileForm({
  profile,
  saveProfile,
  profileHref = "/giver/profile",
  showNameDisplay = false,
  secureText = "We use your information only to communicate with you about your donations and account.",
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameDisplay, setNameDisplay] = useState(
    profile.nameDisplay ?? "first",
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState({ field: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setError({ field: "", message: "" });
    setSaving(true);
    const { error: message } = await saveProfile({
      fullName: fullName.trim() || profile.fullName,
      phone: phone.trim() || profile.phone,
      ...(showNameDisplay && { nameDisplay }),
    });
    if (message) {
      setError({ field: message.includes("name") ? "name" : "phone", message });
      setSaving(false);
      return;
    }
    router.push(profileHref);
    router.refresh();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input
        name="fullName"
        label="Name"
        autoComplete="name"
        placeholder={profile.fullName}
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        error={error.field === "name" ? error.message : undefined}
        className={styles.field}
      />

      {/* Email: read-only, changed only through support */}
      <div className={`${styles.field} ${styles.emailField}`}>
        <p className={styles.label} id="email-label">
          Email
        </p>
        <p className={styles.emailBox} aria-labelledby="email-label">
          Please contact support if you want to change your email address
        </p>
      </div>

      {/* Phone: country code (Nigeria) + number */}
      <div className={`${styles.field} ${styles.phoneField}`}>
        <label className={styles.label} htmlFor="phone">
          Phone
        </label>
        <div className={styles.phoneRow}>
          <label className={styles.country}>
            <span className={styles.hidden}>Country code</span>
            <span className={styles.flag} aria-hidden="true" />
            <select
              className={styles.countrySelect}
              defaultValue={profile.countryCode}
            >
              <option value="+234">+234</option>
            </select>
            <RiArrowDownSLine className={styles.chevron} aria-hidden="true" />
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder={profile.phone}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            error={error.field === "phone" ? error.message : undefined}
            className={styles.number}
          />
        </div>
      </div>

      {showNameDisplay && (
        <>
          <fieldset className={styles.nameDisplay} id="name-display">
            <legend className={styles.label}>
              Name display <span className={styles.required}>*</span>
            </legend>
            {NAME_DISPLAY_OPTIONS.map((option) => (
              <label key={option.key} className={styles.option}>
                <input
                  type="radio"
                  name="nameDisplay"
                  value={option.key}
                  checked={nameDisplay === option.key}
                  onChange={() => setNameDisplay(option.key)}
                  className={styles.radio}
                />
                {option.label}
              </label>
            ))}
          </fieldset>
          <p className={styles.choiceNote}>
            <RiLock2Line className={styles.choiceIcon} aria-hidden="true" />
            Your choice will be respected wherever your request appears
            publicly.
          </p>
        </>
      )}

      <div className={styles.secure}>
        <RiShieldCheckLine className={styles.secureIcon} aria-hidden="true" />
        <div>
          <p className={styles.secureTitle}>Your information is secure</p>
          <p className={styles.secureText}>{secureText}</p>
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        loading={saving}
        loadingText="Saving"
        className={styles.save}
      >
        Save changes
      </Button>
      <Button
        href={profileHref}
        variant="outlined"
        fullWidth
        className={styles.cancel}
      >
        Cancel
      </Button>
    </form>
  );
}
