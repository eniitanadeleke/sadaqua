import styles from "./ReportChart.module.css";

// The two y-axis scales in the Figma. The ticks are evenly spaced, so a value
// is placed between the two ticks around it (on a log scale between them).
export const USER_TICKS = [
  1000000, 500000, 100000, 50000, 10000, 5000, 1000, 500,
];
export const AMOUNT_TICKS = [1e9, 5e8, 1e8, 5e7, 1e7, 1e6, 5e5, 1e5];

const SHORT = (n) => {
  if (n >= 1e9) return `${n / 1e9}b`;
  if (n >= 1e6) return `${n / 1e6}m`;
  if (n >= 1e3) return `${n / 1e3}k`;
  return String(n);
};

// Card is 558 x 338 (Figma). Positions below are inside the card.
const GRID_TOP = 92; // first horizontal line
const GRID_STEP = 20;
const GRID_BOTTOM = GRID_TOP + GRID_STEP * 7; // last horizontal line
const COLUMN_STEP = 74;
const GRID_RIGHT = 534;
const LABEL_TOP = 244; // dates under the chart

// "wide": the long numbers of Registered user; "narrow": 1b / 500m ...
const LAYOUT = {
  wide: { labelRight: 67.7, gridLeft: 72, firstColumn: 89 },
  narrow: { labelRight: 52.6, gridLeft: 57, firstColumn: 74 },
};

/** Where a value sits on the y axis (ticks run from the top down) */
function yFor(value, ticks) {
  const logs = ticks.map(Math.log);
  const v = Math.log(Math.max(value, 1));
  if (v >= logs[0]) return GRID_TOP;
  for (let i = 0; i < ticks.length - 1; i += 1) {
    if (v <= logs[i] && v >= logs[i + 1]) {
      return (
        GRID_TOP + GRID_STEP * (i + (logs[i] - v) / (logs[i] - logs[i + 1]))
      );
    }
  }
  // Below the last tick: keep going at the last step's rate, down to the dates
  const last = ticks.length - 1;
  const extra = (logs[last] - v) / (logs[last - 1] - logs[last]);
  return Math.min(GRID_BOTTOM + GRID_STEP * extra, GRID_BOTTOM + 8);
}

/**
 * One chart card on Reports (Figma: Registered user, Donations, Causes,
 * Disbursements). Drawn as plain SVG so it matches the design exactly.
 *
 * kind:     "line" | "bar"
 * color:    the line or bar colour
 * ticks:    USER_TICKS | AMOUNT_TICKS
 * layout:   "wide" | "narrow" (room for the y labels)
 * labels:   the seven dates under the chart
 * values:   one number per date (empty when there is no data yet)
 * dateSize: 12 or 10 (px) for the dates
 * footer:   what sits at the bottom right (totals, legend)
 */
export default function ReportChart({
  title,
  subtitle,
  kind,
  color,
  ticks,
  layout = "narrow",
  labels,
  values,
  dateSize = 10,
  footer,
}) {
  const { labelRight, gridLeft, firstColumn } = LAYOUT[layout];
  const xs = labels.map((_, i) => firstColumn + COLUMN_STEP * i);
  const points = values.map((value, i) => [xs[i], yFor(value, ticks)]);
  const tickLabels =
    ticks === USER_TICKS ? ticks.map(String) : ticks.map(SHORT);

  return (
    <section className={styles.card} aria-label={title}>
      <svg
        className={styles.svg}
        viewBox="0 0 558 338"
        preserveAspectRatio="xMinYMin meet"
        role="img"
        aria-label={`${title} chart`}
      >
        {tickLabels.map((label, i) => (
          <g key={label}>
            <text
              x={labelRight}
              y={GRID_TOP - 7 + GRID_STEP * i + 8.8}
              textAnchor="end"
              className={styles.tick}
            >
              {label}
            </text>
            <line
              x1={gridLeft}
              x2={GRID_RIGHT}
              y1={GRID_TOP + GRID_STEP * i}
              y2={GRID_TOP + GRID_STEP * i}
              className={styles.grid}
            />
          </g>
        ))}

        {xs.map((x, i) => (
          <g key={labels[i]}>
            <line
              x1={x}
              x2={x}
              y1={GRID_TOP}
              y2={GRID_BOTTOM + 8}
              className={styles.grid}
            />
            <text
              x={x}
              y={LABEL_TOP + dateSize * 0.88}
              textAnchor="middle"
              className={styles.date}
              style={{ fontSize: dateSize }}
            >
              {labels[i]}
            </text>
          </g>
        ))}

        {kind === "bar" &&
          points.map(([x, y]) => (
            <rect
              key={x}
              x={x - 4}
              y={y}
              width="8"
              height={GRID_BOTTOM - y}
              fill={color}
            />
          ))}

        {kind === "line" && points.length > 0 && (
          <>
            <polyline
              points={points.map(([x, y]) => `${x},${y}`).join(" ")}
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {points.map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="4" fill={color} />
            ))}
          </>
        )}
      </svg>

      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.footer}>{footer}</div>
    </section>
  );
}

/** "Total registered / 1820" style block under a chart */
export function ChartTotal({ label, value, strong = false }) {
  return (
    <div className={styles.total}>
      <p className={styles.totalLabel}>{label}</p>
      <p className={`${styles.totalValue} ${strong ? styles.strong : ""}`}>
        {value}
      </p>
    </div>
  );
}

/** Coloured square + name + number (Figma: Causes legend) */
export function ChartLegend({ items }) {
  return (
    <ul className={styles.legend}>
      {items.map(({ label, value, color }) => (
        <li key={label} className={styles.legendRow}>
          <span
            className={styles.swatch}
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          <span className={styles.legendLabel}>{label}</span>
          <span className={styles.legendValue}>{value}</span>
        </li>
      ))}
    </ul>
  );
}
