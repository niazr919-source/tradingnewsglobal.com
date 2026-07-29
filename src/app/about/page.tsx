import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Trading News Global is an independent financial news platform covering cryptocurrency, forex and binary trading markets.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">About Trading News Global</h1>
      <div className="prose prose-slate dark:prose-invert mt-6 max-w-none">
        <p>
          Trading News Global is an independent digital newsroom covering the fast-moving worlds of
          cryptocurrency, foreign exchange (forex) and binary options trading. We publish breaking
          news, market analysis and educational strategy content for active traders and curious
          newcomers alike.
        </p>
        <h2>What we cover</h2>
        <ul>
          <li>
            <strong>Cryptocurrency</strong> — Bitcoin, Ethereum, DeFi, and tokenized real-world assets.
          </li>
          <li>
            <strong>Forex</strong> — major currency pairs, central bank policy and macro trends.
          </li>
          <li>
            <strong>Binary trading</strong> — risk management and short-duration strategy education.
          </li>
        </ul>
        <h2>Editorial independence</h2>
        <p>
          Our content is produced for informational and educational purposes only and does not
          constitute financial advice. Trading involves substantial risk of loss.
        </p>
      </div>
    </div>
  );
}
