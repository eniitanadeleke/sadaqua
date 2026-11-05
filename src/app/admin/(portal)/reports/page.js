import {
  RiArrowLeftRightLine,
  RiArrowUpLine,
  RiGroupLine,
  RiHandHeartLine,
  RiHeartLine,
} from "react-icons/ri";
import AdminPageHeading from "@/components/admin/AdminPageHeading";
import ReportChart, {
  AMOUNT_TICKS,
  ChartLegend,
  ChartTotal,
  USER_TICKS,
} from "@/components/admin/ReportChart";
import ReportControls from "@/components/admin/ReportControls";
import ReportShareModal from "@/components/admin/ReportShareModal";
import ReportStats from "@/components/admin/ReportStats";
import { isAdminDemo } from "@/lib/api/admin/demo";
import {
  REPORT_PERIODS,
  defaultReportRange,
  formatShortRange,
  getReport,
} from "@/lib/api/admin/reports";
import { formatNaira } from "@/lib/format";
import styles from "./page.module.css";

export const metadata = { title: "Reports | Sadaqua admin" };

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Reports: numbers and charts for a date range, and "Share report" */
export default async function ReportsPage({ searchParams }) {
  const params = await searchParams;
  const demo = await isAdminDemo(params);

  const start = defaultReportRange({ demo });
  const period = REPORT_PERIODS.some((p) => p.value === params.period)
    ? params.period
    : start.period;
  const from = DATE.test(params.from ?? "") ? params.from : start.from;
  const to = DATE.test(params.to ?? "") ? params.to : start.to;
  const range = { from, to };

  const report = await getReport(range, { demo });
  const compareText = report.compareRange
    ? formatShortRange(report.compareRange)
    : null;
  const when =
    {
      today: "today",
      week: "this week",
      month: "this month",
      year: "this year",
    }[period] ?? "in this period";

  const { stats } = report;
  const closeHref = `/admin/reports?${new URLSearchParams({ period, from, to })}`;

  return (
    <>
      <AdminPageHeading
        title="Reports"
        subtitle="Manage people who have access to the organisation workspace."
      />

      <ReportControls period={period} from={from} to={to} />

      <ReportStats
        items={[
          {
            label: "Registered users",
            value: stats.users.value,
            icon: RiGroupLine,
            tone: "deep",
            change: stats.users.change,
            compareText,
          },
          {
            label: "Donations",
            value: stats.donations.value,
            icon: RiHandHeartLine,
            tone: "orange",
            change: stats.donations.change,
            compareText,
          },
          {
            label: "Causes",
            value: stats.causes.value,
            icon: RiHeartLine,
            tone: "green",
            change: stats.causes.change,
            compareText,
          },
          {
            label: "Disbursements",
            value: stats.disbursements.value,
            icon: RiArrowLeftRightLine,
            tone: "gold",
            change: stats.disbursements.change,
            compareText,
          },
        ]}
      />

      <div className={styles.charts}>
        <ReportChart
          title="Registered user"
          subtitle={`${report.users.newCount} new users ${when}`}
          kind="line"
          color="var(--color-secondary)"
          ticks={USER_TICKS}
          layout="wide"
          labels={report.users.labels}
          values={report.users.values}
          dateSize={12}
          footer={
            <>
              <ChartTotal
                label="Total registered"
                value={report.users.total}
                strong
              />
              <p className={styles.growth}>
                <RiArrowUpLine aria-hidden="true" />
                {report.users.newCount}
              </p>
            </>
          }
        />

        <ReportChart
          title="Donations"
          subtitle={`${report.donations.newCount} new donations ${when} | ${formatNaira(report.donations.amount)} received`}
          kind="bar"
          color="var(--color-secondary)"
          ticks={AMOUNT_TICKS}
          labels={report.donations.labels}
          values={report.donations.values}
          footer={
            <>
              <ChartTotal
                label="Total Donations"
                value={report.donations.newCount}
              />
              <ChartTotal
                label="Total Amount"
                value={formatNaira(report.donations.amount)}
              />
            </>
          }
        />

        <ReportChart
          title="Causes"
          subtitle={`${report.causes.newCount} new causes ${when} | ${report.causes.active} active | ${report.causes.fulfilled} fulfilled`}
          kind="bar"
          color="var(--color-accent)"
          ticks={AMOUNT_TICKS}
          labels={report.causes.labels}
          values={report.causes.values}
          footer={
            <>
              <ChartTotal label="Total Causes" value={report.causes.newCount} />
              <ChartLegend
                items={[
                  {
                    label: "Actiive",
                    value: report.causes.active,
                    color: "var(--color-accent)",
                  },
                  {
                    label: "Fulfilled",
                    value: report.causes.fulfilled,
                    color: "var(--color-primary)",
                  },
                ]}
              />
            </>
          }
        />

        <ReportChart
          title="Disbursements"
          subtitle={`${report.disbursements.newCount} new disbursements ${when} | ${formatNaira(report.disbursements.amount)} sent`}
          kind="line"
          color="var(--color-urgent)"
          ticks={AMOUNT_TICKS}
          labels={report.disbursements.labels}
          values={report.disbursements.values}
          footer={
            <>
              <ChartTotal
                label="Total Disbursements"
                value={report.disbursements.newCount}
              />
              <ChartTotal
                label="Total Amount"
                value={formatNaira(report.disbursements.amount)}
              />
            </>
          }
        />
      </div>

      {params.share && (
        <ReportShareModal report={report} range={range} closeHref={closeHref} />
      )}
    </>
  );
}
