import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Risk Disclaimer",
  description: `Important risk disclosure regarding trading and the educational content published on ${siteConfig.name}.`,
  alternates: { canonical: "/disclaimer" },
};

const LAST_UPDATED = "July 26, 2026";

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Risk Disclaimer</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-down/30 bg-down/5 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-down" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Trading cryptocurrencies, foreign exchange (forex), and binary options carries a high level
          of risk and may not be suitable for everyone. You can lose some or all of your invested
          capital. Never trade with money you cannot afford to lose.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert mt-6 max-w-none">
        <h2>Educational content only</h2>
        <p>
          All content published on {siteConfig.name} is for general informational and educational
          purposes only. Nothing on this Site constitutes financial, investment, legal, or tax advice,
          a recommendation, or a solicitation to buy or sell any financial instrument.
        </p>

        <h2>No investment advice</h2>
        <p>
          We are not licensed financial advisors. Any decisions you make based on information found on
          this Site are made at your own risk. You should conduct your own research and consult an
          independent, licensed professional before making any trading or investment decision.
        </p>

        <h2>High-risk instruments</h2>
        <p>
          Binary options and leveraged products are complex, high-risk instruments. In many
          jurisdictions they are restricted or prohibited for retail investors. It is your
          responsibility to ensure that any activity you undertake is legal in your country of
          residence.
        </p>

        <h2>Accuracy and third parties</h2>
        <p>
          Market data, prices, and figures shown on this Site (including any ticker displays) may be
          delayed, simulated, or for illustration only, and should not be relied upon for trading.
          We do not guarantee the accuracy, completeness, or timeliness of any content, and are not
          responsible for third-party websites or advertisements.
        </p>

        <h2>No liability</h2>
        <p>
          {siteConfig.publisher} accepts no liability for any loss or damage, including without
          limitation any loss of profit, arising directly or indirectly from the use of or reliance on
          any content published on this Site.
        </p>
      </div>
    </div>
  );
}
