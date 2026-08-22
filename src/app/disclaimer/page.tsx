import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

const UPDATED = "2026-08-22";

export const metadata: Metadata = {
  title: "Risk disclaimer",
  description: `${siteConfig.name} publishes journalism and education, not financial advice. Read the full risk warning covering crypto, forex, leverage and binary options.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <PageShell
      title="Risk disclaimer"
      intro="Read this before acting on anything you find on this website."
      updated={UPDATED}
    >
      <div className="not-prose mb-8 flex gap-3 rounded-lg border border-border border-l-[3px] border-l-down bg-down/5 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-down" aria-hidden />
        <p className="text-[14.5px] leading-relaxed">
          <strong>
            Trading and investing carry a high risk of losing money. Most retail traders lose.
          </strong>{" "}
          Nothing on {siteConfig.name} is a recommendation to buy, sell or hold any asset, and nothing
          here takes account of your personal circumstances.
        </p>
      </div>

      <h2>We are not your financial adviser</h2>
      <p>
        {siteConfig.name} is a publisher. We are not a broker, dealer, exchange, fund manager, investment
        adviser or financial planner, and we are not authorised or regulated by any financial services
        regulator. Nothing on this website constitutes personalised investment, financial, legal,
        accounting or tax advice.
      </p>
      <p>
        Our articles are general information and education. They cannot take into account your income,
        your existing holdings, your obligations, your tax position, your time horizon or your tolerance
        for loss — all of which determine whether any particular decision is sensible for you. Before
        making a financial decision, seek advice from a professional who is licensed in your jurisdiction
        and who knows your circumstances.
      </p>

      <h2>You can lose money — including more than you deposit</h2>
      <ul>
        <li>
          <strong>Cryptocurrency</strong> is highly volatile, largely unregulated in many jurisdictions,
          and can fall very sharply and very quickly. Assets held on an exchange can be lost if that
          exchange fails, is hacked or freezes withdrawals. Self-custodied assets can be lost permanently
          if you lose your keys. Some tokens have gone to zero.
        </li>
        <li>
          <strong>Foreign exchange</strong> is usually traded with leverage. Leverage multiplies losses
          as much as gains, and a small adverse move can wipe out an account. In some jurisdictions and
          account types, losses can exceed your deposit.
        </li>
        <li>
          <strong>Contracts for difference and other leveraged derivatives</strong> are complex
          instruments. Providers regulated in the EU and UK are required to publish the share of their
          retail accounts that lose money; those figures have consistently sat in the region of 70–80%.
        </li>
        <li>
          <strong>Binary options</strong> are high-risk, all-or-nothing products with a negative expected
          return by design. They are banned from sale to retail investors in the United Kingdom and
          restricted or prohibited in the European Union, Australia and elsewhere. We cover them so
          readers understand why regulators took that view — not to encourage anyone to trade them.
        </li>
        <li>
          <strong>Commodities, indices and bonds</strong> carry market, liquidity, currency and, where
          leverage is used, amplified risk.
        </li>
      </ul>

      <h2>Past performance means nothing about the future</h2>
      <p>
        Any historical data, chart, backtest, case study or example on this site describes what happened
        before. It is not a prediction, a promise or an indication of what will happen next. Markets
        change, and strategies that worked in one regime routinely fail in another.
      </p>

      <h2>No signals, no tips, no guaranteed returns</h2>
      <p>
        We do not publish trading signals, entry and exit calls, managed accounts, copy-trading, or
        &ldquo;guaranteed&rdquo; anything. If you see such a claim attributed to {siteConfig.name}
        anywhere — on social media, in a messaging app, or in an advertisement — it is not from us.
        Please report it to{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a>.
      </p>

      <h2>Accuracy and timeliness</h2>
      <p>
        We work to be accurate and we correct mistakes openly under our{" "}
        <Link href="/editorial-policy">editorial policy</Link>. Even so, market information dates quickly,
        figures change, and errors happen. Content is provided &ldquo;as is&rdquo; with no warranty of
        accuracy, completeness or fitness for any purpose. Always verify a figure against a primary
        source before you act on it.
      </p>
      <p>
        Price data displayed on this site is indicative, delayed and provided by third parties. It is for
        general information only and must not be used for trading decisions or valuation.
      </p>

      <h2>Third-party links</h2>
      <p>
        We link to regulators, exchanges, data providers and other publications so you can check our
        work. We do not control those sites and are not responsible for their content, accuracy or
        practices. A link is not an endorsement.
      </p>

      <h2>No advertising relationship with the editorial</h2>
      <p>
        This site carries third-party advertising, which may include advertisements for financial
        products. Those advertisements are selected by the ad network, not by our newsroom. Their
        appearance is not a recommendation, endorsement or vetting by {siteConfig.name}. We publish no
        affiliate links and no broker referral arrangements — see our{" "}
        <Link href="/editorial-policy">editorial policy</Link>.
      </p>

      <h2>Jurisdiction and eligibility</h2>
      <p>
        Financial products are regulated differently around the world. Some products described on this
        site may be illegal, restricted or unavailable where you live. It is your responsibility to
        establish whether a product is lawful and appropriate for you before engaging with it.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.name}, its owners, writers and contributors
        accept no liability for any loss or damage — including trading losses, lost profits or
        consequential loss — arising from your use of, or reliance on, anything published on this
        website.
      </p>

      <h2>Getting help</h2>
      <p>
        If trading is affecting your finances, your relationships or your wellbeing, treat that seriously.
        The behavioural pattern of chasing losses is well documented and is not a discipline problem you
        can simply try harder at. Support services for gambling and financial harm exist in most
        countries and can help with trading too.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this disclaimer:{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a>
      </p>
    </PageShell>
  );
}
