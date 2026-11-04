"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiHeadphoneLine,
  RiQuestionLine,
  RiWhatsappLine,
} from "react-icons/ri";
import Button from "@/components/ui/Button";
import { FAQS, HOW_IT_WORKS, whatsappHref } from "@/lib/support";
import styles from "./HelpSupport.module.css";

/**
 * Help & Support, shared by givers and recipients (Figma: Help & Support,
 * FAQ 1, How it works). The tabs start on the person's own side.
 *
 * role:       "giver" | "recipient"
 * contactHref: the Contact us page for this role
 *
 * Address endings open a part directly: #faq, #contact, #how-it-works
 * (#how-it-works also switches to the person's own tab).
 */
export default function HelpSupport({ role, contactHref }) {
  const own = role === "recipient" ? "recipient" : "giver";
  const [faqTab, setFaqTab] = useState(own);
  const [howTab, setHowTab] = useState(own === "recipient" ? "help" : "give");
  const [open, setOpen] = useState(null); // the question that is showing its answer

  // Scroll to #faq / #contact / #how-it-works after the page has drawn
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  const how = HOW_IT_WORKS[howTab];

  return (
    <>
      <section
        className={`${styles.card} ${styles.first}`}
        id="faq"
        aria-labelledby="faq-title"
      >
        <div className={styles.cardHead}>
          <RiQuestionLine className={styles.headIcon} aria-hidden="true" />
          <div>
            <h2 id="faq-title" className={styles.headTitle}>
              FAQs
            </h2>
            <p className={styles.headText}>Find answers to common questions.</p>
          </div>
        </div>

        <Tabs
          label="Questions for"
          tabs={[
            { key: "giver", label: "For Givers" },
            { key: "recipient", label: "For Recipient" },
          ]}
          active={faqTab}
          onChange={(key) => {
            setFaqTab(key);
            setOpen(null);
          }}
          className={styles.faqTabs}
        />

        <ul className={styles.faqs}>
          {FAQS[faqTab].map(({ question, answer }, i) => {
            const isOpen = open === i;
            const id = `faq-${faqTab}-${i}`;
            return (
              <li key={question} className={styles.faq}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{question}</span>
                  <RiArrowDownSLine
                    className={`${styles.chevron} ${isOpen ? styles.up : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p id={id} className={styles.answer}>
                    {answer}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <Link href={contactHref} className={styles.linkCard} id="contact">
        <RiHeadphoneLine className={styles.headIcon} aria-hidden="true" />
        <span className={styles.linkText}>
          <span className={styles.headTitle}>Contact us</span>
          <span className={`${styles.headText} ${styles.oneLine}`}>
            Need more help? Reach out to our support team.
          </span>
        </span>
        <RiArrowRightSLine className={styles.arrow} aria-hidden="true" />
      </Link>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.linkCard} ${styles.whatsapp}`}
      >
        <RiWhatsappLine className={styles.headIcon} aria-hidden="true" />
        <span className={styles.linkText}>
          <span className={styles.headTitle}>WhatsApp</span>
          <span className={styles.headText}>
            Chat with us directly on WhatsApp.
          </span>
        </span>
        <RiArrowRightSLine className={styles.arrow} aria-hidden="true" />
      </a>

      <section
        className={`${styles.card} ${styles.how}`}
        id="how-it-works"
        aria-labelledby="how-title"
      >
        <h2 id="how-title" className={styles.howTitle}>
          How Sadaqua Works
        </h2>
        <p className={styles.howText}>
          Giving support or requesting help should be simple, transparent and
          dignified.
        </p>

        <Tabs
          label="How it works for"
          tabs={[
            { key: "give", label: HOW_IT_WORKS.give.tab },
            { key: "help", label: HOW_IT_WORKS.help.tab },
          ]}
          active={howTab}
          onChange={setHowTab}
          className={styles.howTabs}
        />

        <div className={styles.stepsBox}>
          <ol className={styles.steps}>
            {how.steps.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.number} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Button href={how.action.href} size="medium" className={styles.cta}>
            {how.action.label}
          </Button>
        </div>
      </section>
    </>
  );
}

/** Two pill buttons; the chosen one is green (same look as the request tabs) */
function Tabs({ label, tabs, active, onChange, className = "" }) {
  return (
    <div
      className={`${styles.tabs} ${className}`}
      role="tablist"
      aria-label={label}
    >
      {tabs.map((tab) => {
        const selected = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`${styles.tab} ${selected ? styles.active : ""}`}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
