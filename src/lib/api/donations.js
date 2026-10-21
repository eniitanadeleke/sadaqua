// Service layer for the donation flow. Screens call these; today they use mock
// values, later they will call the backend (which also talks to Paystack).
// Only the inside of each function changes.

const FAKE_DELAY_MS = 300;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** The quick-pick amounts under "Your contribution" (Figma: 100k, 50k, 20k, 10k) */
export const PRESET_AMOUNTS = [100000, 50000, 20000, 10000];

/** The two ways to give (Figma: "Choose an option") */
export const DONATION_TYPES = {
  sadaqah: {
    key: "sadaqah",
    label: "Sadaqah",
    description: "Voluntary giving to support this cause.",
  },
  general: {
    key: "general",
    label: "General donation",
    description: "Support Sadaqua’s broader assistance efforts.",
  },
};

/**
 * Sadaqua's general fund: how much is raised towards its current target.
 * Later: return fetch("/api/general-fund")
 */
export async function getGeneralFund() {
  await wait(FAKE_DELAY_MS);
  return { raised: 180000, goal: 300000 };
}

/**
 * What the giver will pay: the donation plus the processing fee.
 * The backend decides the fee; the mock uses 2.9% (Figma: N2,900 on N100,000).
 * Later: return fetch(`/api/donations/quote?amount=${amount}`)
 */
export async function getDonationQuote(amount) {
  await wait(FAKE_DELAY_MS);
  const fee = Math.round(amount * 0.029);
  return { amount, fee, total: amount + fee };
}

/**
 * Checks the amount before the Review screen (Figma: the "Processing" state).
 * Later: the backend can refuse an amount (e.g. too small) and send a message back.
 */
export async function checkDonationAmount({ amount }) {
  await wait(800);
  if (!amount || amount < 1) throw new Error("Please enter an amount");
  return { ok: true };
}

/**
 * Starts the payment (Figma: "Preparing payment"). The backend will create the
 * donation and return the Paystack checkout link; the giver is sent there.
 * Until Paystack is connected, it goes straight to the success screen.
 * Later: return fetch("/api/donations", { method: "POST", body: ... })
 */
export async function startPayment({ type, causeId, amount }) {
  await wait(1500);
  const reference = `SADA-${Date.now().toString(36).toUpperCase()}`;
  const params = new URLSearchParams({
    ref: reference,
    type,
    amount: String(amount),
  });
  if (causeId) params.set("cause", causeId);
  return { reference, checkoutUrl: `/giver/donate/success?${params}` };
}
