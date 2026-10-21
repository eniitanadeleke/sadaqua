// Links back into the donation flow, built from the details Paystack returns
// with the giver (type, cause, amount). Used by the failed and cancelled screens.

export function donationLinks({ type, cause, amount } = {}) {
  const general = type === "general";
  const value = Number(amount) > 0 ? String(Number(amount)) : "";

  // Without a cause we cannot go back into a Sadaqah flow, so start again from Browse
  if (!general && !cause) {
    return { reviewHref: "/giver/causes", amountHref: "/giver/causes" };
  }

  const amountQuery = value ? `?amount=${value}` : "";
  const amountHref = general
    ? `/giver/donate/general${amountQuery}`
    : `/giver/donate/${encodeURIComponent(cause)}/amount${amountQuery}`;

  if (!value) return { reviewHref: amountHref, amountHref };

  const reviewQuery = new URLSearchParams({
    type: general ? "general" : "sadaqah",
    ...(!general && { cause }),
    amount: value,
  });
  return { reviewHref: `/giver/donate/review?${reviewQuery}`, amountHref };
}
