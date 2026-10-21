"use client";

import Button from "@/components/ui/Button";
import { formatDateTime, formatNaira } from "@/lib/format";

/**
 * "Download receipt": saves a simple text receipt.
 * Later the backend will send a proper PDF receipt and this will download it.
 *
 * donation: { reference, paidAt, amount, fee, total, causeTitle }
 * variant: "large" (outlined full-width button) | "small" (Donation details)
 */
export default function ReceiptButton({
  donation,
  variant = "large",
  className = "",
}) {
  function handleDownload() {
    const lines = [
      "SADAQUA - Donation receipt",
      "",
      `Reference: ${donation.reference}`,
      `Date: ${formatDateTime(donation.paidAt)}`,
      `Given to: ${donation.causeTitle}`,
      `Donation: ${formatNaira(donation.amount)}`,
      `Processing fee: ${formatNaira(donation.fee)}`,
      `Total paid: ${formatNaira(donation.total)}`,
      "",
      "Thank you for your support.",
    ];
    const file = new Blob([lines.join("\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = `sadaqua-receipt-${donation.reference}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  if (variant === "large") {
    return (
      <Button
        variant="outlined"
        fullWidth
        onClick={handleDownload}
        className={className}
      >
        Download receipt
      </Button>
    );
  }
  return (
    <button type="button" className={className} onClick={handleDownload}>
      Download receipt
    </button>
  );
}
