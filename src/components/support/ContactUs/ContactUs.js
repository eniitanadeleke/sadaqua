"use client";

import { useState } from "react";
import {
  RiCheckboxCircleLine,
  RiMailLine,
  RiSendPlaneLine,
  RiWhatsappLine,
} from "react-icons/ri";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { sendSupportMessage } from "@/lib/api/support";
import { emailHref, whatsappHref } from "@/lib/support";
import { validateEmail } from "@/lib/validation";
import styles from "./ContactUs.module.css";

const MAX_CHARACTERS = 1000;

/**
 * Contact us (Figma: Help & Support-1): email, WhatsApp, or a message form.
 * role: "giver" | "recipient", sent with the message so support knows who wrote
 */
export default function ContactUs({ role }) {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function change(field) {
    return (event) => {
      setValues((v) => ({ ...v, [field]: event.target.value }));
      if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name";
    const emailError = validateEmail(values.email);
    if (emailError) next.email = emailError;
    if (!values.message.trim()) next.message = "Please write your message";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    try {
      await sendSupportMessage({ ...values, role });
      setSent(true);
      setValues({ name: "", email: "", message: "" });
    } catch (err) {
      setErrors({ form: err.message });
    }
    setSending(false);
  }

  return (
    <>
      <a href={emailHref()} className={styles.channel}>
        <RiMailLine className={styles.icon} aria-hidden="true" />
        <span className={styles.text}>
          <span className={styles.title}>Email us</span>
          <span className={styles.line}>
            Send us an email and we&apos;ll get back to you.
          </span>
        </span>
        <RiSendPlaneLine className={styles.send} aria-hidden="true" />
      </a>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.channel}
      >
        <RiWhatsappLine className={styles.icon} aria-hidden="true" />
        <span className={styles.text}>
          <span className={styles.title}>WhatsApp</span>
          <span className={styles.line}>
            Chat with us directly on WhatsApp.
          </span>
        </span>
        <RiSendPlaneLine className={styles.send} aria-hidden="true" />
      </a>

      <form className={styles.formWrap} onSubmit={handleSubmit} noValidate>
        <section className={styles.form} aria-labelledby="send-title">
          <h3 id="send-title" className={styles.formTitle}>
            Send a message
          </h3>

          <Input
            name="name"
            label="Name"
            required
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={change("name")}
            error={errors.name}
            className={styles.field}
          />
          <Input
            name="email"
            type="email"
            label="Email address"
            required
            autoComplete="email"
            placeholder="example@gmail.com"
            value={values.email}
            onChange={change("email")}
            error={errors.email}
            className={styles.field}
          />

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              Message <span className={styles.required}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className={`${styles.textarea} ${errors.message ? styles.invalid : ""}`}
              placeholder="Ask your questions....."
              maxLength={MAX_CHARACTERS}
              value={values.message}
              onChange={change("message")}
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby="message-count"
            />
            <p id="message-count" className={styles.counter} aria-live="polite">
              {values.message.length}/{MAX_CHARACTERS} Characters
            </p>
            {errors.message && (
              <p className={styles.error} role="alert">
                {errors.message}
              </p>
            )}
          </div>
        </section>

        {errors.form && (
          <p className={styles.error} role="alert">
            {errors.form}
          </p>
        )}
        {sent && (
          <p className={styles.sent} role="status">
            <RiCheckboxCircleLine aria-hidden="true" />
            Message sent. Our team will get back to you soon.
          </p>
        )}

        <Button
          type="submit"
          fullWidth
          loading={sending}
          loadingText="Sending"
          className={styles.submit}
        >
          Send message
        </Button>
      </form>
    </>
  );
}
