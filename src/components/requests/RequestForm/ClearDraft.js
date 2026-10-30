"use client";

import { useEffect } from "react";
import { useRequestDraft } from "./RequestDraftProvider";

/** Empties the Help request draft once the request has been sent */
export default function ClearDraft() {
  const { clear, ready } = useRequestDraft();
  useEffect(() => {
    if (ready) clear();
    // clear is a new function on every render; run once the draft has loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);
  return null;
}
