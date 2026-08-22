import type { CategorySlug } from "./categories";

/**
 * The masthead.
 *
 * Google's quality guidelines (and AdSense review) weigh "who wrote this and why
 * should I trust them" heavily on financial topics. Every article byline must
 * resolve to an entry here, and every entry gets its own /authors/<slug> page
 * that is linked from the article and included in sitemap.xml.
 *
 * ⚠️ Before you go live: replace these with the real people writing for the site.
 * A byline that does not correspond to a real, contactable person is a liability
 * on a finance site, not an asset.
 */
export interface Author {
  slug: string;
  name: string;
  role: string;
  /** One-line summary used under the byline. */
  short: string;
  /** Full bio for the author page and article footer. */
  bio: string;
  /** Topics this author covers — surfaced as "Areas of focus". */
  expertise: string[];
  beats: CategorySlug[];
  email: string;
  /** Optional public profiles. Empty entries are simply not rendered. */
  links?: { label: string; href: string }[];
}

export const authors: Author[] = [
  {
    slug: "maya-chen",
    name: "Maya Chen",
    role: "Digital Assets Editor",
    short: "Covers crypto markets, stablecoins and tokenization.",
    bio: "Maya writes Trading News Global's cryptocurrency coverage, with a focus on the plumbing most reporting skips: how stablecoins actually hold a peg, what custody arrangements sit behind an ETF, and where tokenized real-world assets are genuinely being used. She reads the filings and prospectuses so readers do not have to, and is consistently sceptical of yield that has no obvious source.",
    expertise: ["Bitcoin and Ethereum", "Stablecoins and depegs", "Spot crypto ETFs", "Tokenized real-world assets", "Crypto custody and self-custody", "DeFi mechanics"],
    beats: ["crypto"],
    email: "maya.chen@tradingnewsglobal.com",
  },
  {
    slug: "daniel-okoro",
    name: "Daniel Okoro",
    role: "Currencies & Macro Editor",
    short: "Covers central banks, interest rates and the major FX pairs.",
    bio: "Daniel handles Trading News Global's foreign exchange and macroeconomic coverage. His work explains the causal chain most FX commentary asserts but never demonstrates — how a change in rate expectations feeds through to bond yields, and from there into a currency pair. He writes primarily for readers who want to understand why a market moved rather than be told what to do next.",
    expertise: ["Federal Reserve and ECB policy", "Interest rate differentials", "EUR/USD and GBP/USD", "Economic data releases", "Currency intervention", "Carry and funding currencies"],
    beats: ["forex", "markets"],
    email: "daniel.okoro@tradingnewsglobal.com",
  },
  {
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Trading Education Editor",
    short: "Covers risk, position sizing and why most retail traders lose.",
    bio: "Priya edits Trading News Global's education section. Her remit is deliberately unglamorous: expectancy, position sizing, cost drag, and the documented statistics on retail trading outcomes. She writes about high-risk products — leveraged CFDs, short-duration binary options — specifically so readers understand the mathematics working against them before they risk money, and the section carries no broker referrals of any kind.",
    expertise: ["Risk management and position sizing", "Trading psychology", "Leverage and margin", "Regulatory disclosures and retail loss data", "Costs, spreads and slippage", "Demo accounts and practice"],
    beats: ["trading-education"],
    email: "priya.nair@tradingnewsglobal.com",
  },
  {
    slug: "elena-marchetti",
    name: "Elena Marchetti",
    role: "Commodities & Markets Writer",
    short: "Covers gold, energy, inflation and the economic calendar.",
    bio: "Elena writes Trading News Global's commodities and cross-asset coverage — gold and the real-yield relationship, energy markets, inflation prints and the releases that reset expectations across every asset class at once. She has a particular interest in the gap between a headline economic number and what the underlying series actually shows.",
    expertise: ["Gold and precious metals", "Real yields and inflation", "Energy markets", "Economic calendar releases", "Bond market signals", "Cross-asset correlation"],
    beats: ["markets"],
    email: "elena.marchetti@tradingnewsglobal.com",
  },
];

const bySlug = new Map(authors.map((a) => [a.slug, a]));
const byName = new Map(authors.map((a) => [a.name.toLowerCase(), a]));

export function getAuthorBySlug(slug: string): Author | undefined {
  return bySlug.get(slug);
}

/** Resolve an article's `author:` frontmatter string to a masthead entry. */
export function getAuthorByName(name: string): Author | undefined {
  return byName.get(name.trim().toLowerCase());
}

export function authorSlug(name: string): string | undefined {
  return getAuthorByName(name)?.slug;
}
