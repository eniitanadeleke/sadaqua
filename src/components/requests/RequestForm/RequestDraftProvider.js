"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Keeps the answers from the four Help request steps while the person moves
// between them (Need -> Details -> Verify -> Review).
// The answers are also kept in sessionStorage, so a refresh does not lose them;
// they are cleared once the request is sent, or when the tab is closed.
// The chosen file itself cannot be stored there, so after a refresh the
// person is asked to choose it again.

const STORAGE_KEY = "sadaqua-help-request";

export const EMPTY_DRAFT = {
  category: "",
  amount: 0,
  description: "",
  urgency: "",
  state: "",
  area: "",
  document: null, // { name, size, type } - the file details we can show
};

const DraftContext = createContext(null);

export default function RequestDraftProvider({ children }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [file, setFile] = useState(null); // the real File, for the upload
  const [ready, setReady] = useState(false);

  // Read any saved answers once, after the page has loaded in the browser.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- loading saved answers once
      if (saved) setDraft({ ...EMPTY_DRAFT, ...saved, document: null });
    } catch {
      // Storage blocked or broken: start with an empty form.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Not saved; the form still works for this visit.
    }
  }, [draft, ready]);

  const value = {
    draft,
    file,
    ready,
    update: (changes) => setDraft((current) => ({ ...current, ...changes })),
    setFile,
    clear: () => {
      setDraft(EMPTY_DRAFT);
      setFile(null);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // nothing to clear
      }
    },
  };

  return (
    <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
  );
}

/** The draft and helpers: { draft, file, ready, update, setFile, clear } */
export function useRequestDraft() {
  const value = useContext(DraftContext);
  if (!value) {
    throw new Error("useRequestDraft must be used inside RequestDraftProvider");
  }
  return value;
}

/** Which step the draft has reached: 1 Need, 2 Details, 3 Verify, 4 Review */
export function stepReached(draft) {
  if (!draft.category || !draft.amount) return 1;
  if (!draft.description || !draft.urgency) return 2;
  if (!draft.state || !draft.area || !draft.document) return 3;
  return 4;
}
