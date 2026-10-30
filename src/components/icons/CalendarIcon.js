// The small calendar beside "Submitted ..." (traced from Figma: Recipient Home).
// Remix has no calendar with this exact grid of dots. 14 x 14, current colour.
export default function CalendarIcon({ className = "", ...rest }) {
  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d="M9.92 2.33L12.25 2.33C12.4 2.33 12.55 2.39 12.66 2.5C12.77 2.61 12.83 2.76 12.83 2.91L12.83 12.25C12.83 12.4 12.77 12.55 12.66 12.66C12.55 12.77 12.4 12.83 12.25 12.83L1.75 12.83C1.59 12.83 1.45 12.77 1.34 12.66C1.23 12.55 1.17 12.4 1.17 12.25L1.17 2.91C1.17 2.76 1.23 2.61 1.34 2.5C1.45 2.39 1.59 2.33 1.75 2.33L4.08 2.33L4.08 1.16L5.25 1.16L5.25 2.33L8.75 2.33L8.75 1.16L9.92 1.16L9.92 2.33M11.67 7L2.33 7L2.33 11.66L11.67 11.66L11.67 7M8.75 3.5L5.25 3.5L5.25 4.66L4.08 4.66L4.08 3.5L2.33 3.5L2.33 5.83L11.67 5.83L11.67 3.5L9.92 3.5L9.92 4.66L8.75 4.66L8.75 3.5M3.5 8.16L4.67 8.16L4.67 9.33L3.5 9.33L3.5 8.16M6.42 8.16L7.58 8.16L7.58 9.33L6.42 9.33L6.42 8.16M9.33 8.16L10.5 8.16L10.5 9.33L9.33 9.33L9.33 8.16" />
    </svg>
  );
}
