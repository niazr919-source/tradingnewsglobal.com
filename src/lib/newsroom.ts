import type { CategorySlug } from "./categories";
import { siteConfig } from "./site";

/**
 * The masthead.
 *
 * Articles are published under the publication's own byline rather than under
 * individual names. This is a normal and long-standing convention for small
 * independent outlets, and it is honest: it claims exactly as much as is true.
 *
 * Google's quality guidance asks who is responsible for the content and how a
 * reader can reach them. A publication byline backed by a named contact route,
 * a stated corrections process and a coverage remit answers that. Invented
 * individual writers with invented credentials would not.
 *
 * When real named contributors join, add them here with their own pages and set
 * `author:` in that article's frontmatter to their name.
 */
export const newsroom = {
  /** The byline printed on every article. */
  byline: `${siteConfig.name} Editorial Team`,
  /** Shorter form used in tight spaces. */
  shortByline: "Editorial Team",
  role: "Newsroom",
  short: "Independent coverage of crypto, currencies and global markets.",
  bio: `${siteConfig.name} is an independent publication. Our articles are researched, written and edited in-house against the standards set out in our editorial policy, and published under the newsroom byline rather than individual names. Responsibility for everything on this site sits with the publication, and every article carries a route to correct it.`,
  email: siteConfig.email.editorial,
  correctionsEmail: siteConfig.email.corrections,
} as const;

/** What each desk covers. Descriptive of the work, not of any person. */
export interface Desk {
  slug: CategorySlug;
  title: string;
  remit: string;
  focus: string[];
}

export const desks: Desk[] = [
  {
    slug: "crypto",
    title: "Digital assets",
    remit:
      "Covers the mechanics most crypto reporting skips: how a stablecoin actually holds a peg, what custody sits behind an exchange-traded product, and where tokenized real-world assets are genuinely being used rather than merely announced.",
    focus: [
      "Bitcoin and Ethereum",
      "Stablecoins and depegs",
      "Spot crypto ETFs",
      "Tokenized real-world assets",
      "Custody and self-custody",
      "DeFi mechanics and failure modes",
    ],
  },
  {
    slug: "forex",
    title: "Currencies and macro",
    remit:
      "Explains the causal chain most currency commentary asserts but never demonstrates — how a shift in rate expectations reaches bond yields, and how that reaches an exchange rate.",
    focus: [
      "Federal Reserve and ECB policy",
      "Interest rate differentials",
      "EUR/USD and GBP/USD",
      "Economic data releases",
      "Central bank intervention",
      "Carry and funding currencies",
    ],
  },
  {
    slug: "markets",
    title: "Commodities and economy",
    remit:
      "Cross-asset coverage: gold and the real-yield relationship, energy markets, inflation releases, and the gap between a headline economic number and what the underlying series shows.",
    focus: [
      "Gold and precious metals",
      "Real yields and inflation",
      "Energy markets",
      "The economic calendar",
      "Bond market signals",
      "Cross-asset correlation",
    ],
  },
  {
    slug: "trading-education",
    title: "Trading education",
    remit:
      "Deliberately unglamorous: expectancy, position sizing, cost drag and the documented statistics on retail trading outcomes. High-risk products are covered so readers understand the mathematics working against them before they risk money. This section carries no broker referrals of any kind.",
    focus: [
      "Risk management and position sizing",
      "Trading psychology",
      "Leverage and margin",
      "Regulatory retail loss data",
      "Costs, spreads and slippage",
      "Practice accounts and their limits",
    ],
  },
];
