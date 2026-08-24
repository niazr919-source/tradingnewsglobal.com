export type CategorySlug = "crypto" | "forex" | "markets" | "trading-education";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  /** Short label used in the nav bar. */
  navLabel: string;
  /** One-line summary used on cards and in nav dropdowns. */
  tagline: string;
  description: string;
  /** <=155 chars, for the meta description. The long form stays on the page. */
  metaDescription: string;
  /** Tailwind classes for the category accent badge. */
  badgeClass: string;
  accent: string;
  keywords: string[];
  /** Shown as a standing notice at the top of the category archive. */
  notice?: string;
}

export const categories: Record<CategorySlug, Category> = {
  crypto: {
    slug: "crypto",
    name: "Cryptocurrency",
    shortName: "Crypto",
    navLabel: "Crypto",
    tagline: "Bitcoin, Ethereum, stablecoins and tokenized assets.",
    description:
      "Bitcoin, Ethereum, stablecoins, DeFi and tokenized real-world assets — explainers, market context and on-chain analysis written for people who want to understand how digital assets actually work.",
    metaDescription:
      "Bitcoin, Ethereum, stablecoins, DeFi and tokenized assets — explainers and analysis for people who want to understand how crypto actually works.",
    badgeClass: "bg-amber-500/12 text-amber-700 dark:text-amber-400 ring-amber-500/25",
    accent: "#e08b1f",
    keywords: ["Bitcoin", "Ethereum", "stablecoins", "tokenized RWAs", "DeFi", "crypto ETFs"],
  },
  forex: {
    slug: "forex",
    name: "Forex & Currencies",
    shortName: "Forex",
    navLabel: "Forex",
    tagline: "Major pairs, central banks and the macro that moves them.",
    description:
      "Currency markets explained: how central bank policy, interest rate differentials and economic data drive EUR/USD, GBP/USD and the other major pairs.",
    metaDescription:
      "How central bank policy, interest rate differentials and economic data drive EUR/USD, GBP/USD and the other major currency pairs.",
    badgeClass: "bg-teal-500/12 text-teal-700 dark:text-teal-400 ring-teal-500/25",
    accent: "#2f7d6b",
    keywords: ["EUR/USD", "GBP/USD", "Federal Reserve", "central banks", "interest rates", "currency markets"],
  },
  markets: {
    slug: "markets",
    name: "Markets & Economy",
    shortName: "Markets",
    navLabel: "Markets",
    tagline: "Commodities, rates, inflation and the wider economy.",
    description:
      "Gold, oil, bonds, inflation and the economic releases that set the tone across every asset class — background and context for readers following global markets.",
    metaDescription:
      "Gold, oil, bond yields, inflation and the economic releases that set the tone across every asset class. Context for following global markets.",
    badgeClass: "bg-violet-500/12 text-violet-700 dark:text-violet-400 ring-violet-500/25",
    accent: "#5b52c9",
    keywords: ["gold price", "inflation", "bond yields", "commodities", "economic calendar", "recession"],
  },
  "trading-education": {
    slug: "trading-education",
    name: "Trading Education",
    shortName: "Education",
    navLabel: "Education",
    tagline: "Risk, psychology and how markets really work.",
    description:
      "Plain-language education on risk management, position sizing, trading psychology and the mechanics of leveraged and short-duration products — including a frank look at why most retail traders lose money.",
    metaDescription:
      "Plain-language education on risk management, position sizing, trading psychology and why the large majority of retail traders lose money.",
    badgeClass: "bg-rose-500/12 text-rose-700 dark:text-rose-400 ring-rose-500/25",
    accent: "#c2455a",
    keywords: ["risk management", "position sizing", "trading psychology", "leverage", "retail trading losses"],
    notice:
      "Educational content only. Nothing in this section is a recommendation to trade any product, and several instruments discussed here — including leveraged CFDs and binary options — lose money for the large majority of retail investors.",
  },
};

export const categoryList = Object.values(categories);

export function getCategory(slug: string): Category | undefined {
  return categories[slug as CategorySlug];
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return slug in categories;
}
