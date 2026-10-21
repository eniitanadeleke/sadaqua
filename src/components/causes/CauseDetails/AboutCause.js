"use client";

import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import styles from "./CauseDetails.module.css";

/**
 * "About this cause": a short summary with "Read more", which opens the full story
 * and the list of what the fundraiser pays for (Figma: Cause details-1).
 */
export default function AboutCause({ summary, story, provides }) {
  const [open, setOpen] = useState(false);
  return (
    <section className={styles.about} aria-labelledby="about-cause">
      <h2 id="about-cause" className={styles.heading}>
        About this cause
      </h2>

      {open ? (
        <div id="cause-story">
          {story.map((paragraph, index) => (
            <p key={index} className={styles.story}>
              {paragraph}
            </p>
          ))}
          {provides.length > 0 && (
            <>
              <h3 className={styles.providesTitle}>This fundraiser will provide</h3>
              <ol className={styles.provides}>
                {provides.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      ) : (
        <>
          <p className={styles.summary}>{summary}</p>
          <button
            type="button"
            className={styles.readMore}
            aria-expanded={false}
            aria-controls="cause-story"
            onClick={() => setOpen(true)}
          >
            Read more <RiArrowDownSLine aria-hidden="true" />
          </button>
        </>
      )}
    </section>
  );
}
