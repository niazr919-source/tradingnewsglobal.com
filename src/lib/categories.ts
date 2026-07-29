export type CategorySlug = "crypto" | "forex" | "binary-trading";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  /** Tailwind classes for the category accent badge. */
  badgeClass: string;
  accent: string;
  keywords: string[];
}

export const categories: Record<CategorySlug, Category> = {
  crypto: {
    slug: "crypto",
    name: "Cryptocurrency",
    shortName: "Crypto",
    description:
      "Bitcoin, Ethereum, altcoins, DeFi and tokenized real-world assets — the latest crypto market news, on-chain data and analysis.",
    badgeClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 ring-amber-500/30",
    accent: "#f59e0b",
    keywords: ["Bitcoin", "Ethereum", "Tokenized RWAs", "AI crypto tokens", "DeFi", "altcoins"],
  },
  forex: {
    slug: "forex",
    name: "Forex Trading",
    shortName: "Forex",
    description:
      "Currency markets, central bank policy and macro analysis — EUR/USD, GBP/USD and major pair forecasts for active FX traders.",
    badgeClass: "bg-sky-500/15 text-sky-600 dark:text-sky-400 ring-sky-500/30",
    accent: "#0ea5e9",
    keywords: ["EUR/USD", "GBP/USD", "Federal Reserve Interest Rates", "central banks", "macro"],
  },
  "binary-trading": {
    slug: "binary-trading",
    name: "Binary Trading",
    shortName: "Binary Trading",
    description:
      "High-risk, short-duration binary options education — risk management, volatility tactics and 5-minute strategies. For educational purposes only.",
    badgeClass: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 ring-fuchsia-500/30",
    accent: "#d946ef",
    keywords: ["5-Minute Binary Strategies", "risk management", "volatility", "options expiry"],
  },
};

export const categoryList = Object.values(categories);

export function getCategory(slug: string): Category | undefined {
  return categories[slug as CategorySlug];
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return slug in categories;
}
