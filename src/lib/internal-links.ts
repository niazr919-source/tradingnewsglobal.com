/**
 * Contextual internal linking.
 *
 * Links inside article prose are worth considerably more than links in a
 * "related posts" module: they pass topical context, they help crawlers
 * discover deep pages, and readers actually follow them. The audit found zero
 * in-body links across all 35 articles, which left every page an island.
 *
 * Rather than hand-editing every file, this maps distinctive phrases to the
 * article that explains them and links the FIRST occurrence only, once per
 * target, capped per article. Phrases are deliberately multi-word and specific
 * — linking every instance of "leverage" would read as spam and dilute the
 * signal rather than concentrate it.
 *
 * To add an article: add its slug and two or three phrases nobody else owns.
 */
export interface LinkTarget {
  slug: string;
  phrases: string[];
}

export const linkTargets: LinkTarget[] = [
  // ---- trading education ----
  {
    slug: "why-most-retail-traders-lose-money",
    phrases: ["most retail traders lose", "retail accounts that lost money", "retail loss"],
  },
  {
    slug: "risk-management-framework-for-short-term-traders",
    phrases: ["position sizing", "risk per trade", "drawdown limit"],
  },
  {
    slug: "trading-psychology-managing-emotions",
    phrases: ["disposition effect", "loss aversion", "revenge trading"],
  },
  {
    slug: "common-trading-mistakes-beginners-make",
    phrases: ["overtrading", "beginner mistakes"],
  },
  {
    slug: "5-minute-binary-options-risk-management-strategy",
    phrases: ["negative expectancy", "expectancy per trade"],
  },
  {
    slug: "binary-options-explained-how-they-work",
    phrases: ["binary options", "all-or-nothing"],
  },
  {
    slug: "why-demo-accounts-matter-practice-trading",
    phrases: ["demo account", "practice account"],
  },
  {
    slug: "candlestick-charts-basics-for-beginners",
    phrases: ["candlestick", "chart pattern"],
  },

  {
    slug: "market-limit-and-stop-orders-explained",
    phrases: ["stop-loss", "limit order", "market order", "trailing stop"],
  },
  {
    slug: "what-is-a-cfd-and-why-regulators-restrict-them",
    phrases: ["contracts for difference", "CFD", "leveraged derivative"],
  },
  {
    slug: "bid-ask-spread-and-slippage-explained",
    phrases: ["slippage", "bid-ask spread"],
  },

  // ---- forex ----
  {
    slug: "forex-leverage-and-margin-explained",
    phrases: ["margin call", "leverage caps", "retail leverage", "liquidation threshold"],
  },
  {
    slug: "what-is-a-pip-forex-lot-sizes-explained",
    phrases: ["pip value", "lot size", "standard lot"],
  },
  {
    slug: "how-federal-reserve-rate-decisions-move-forex",
    phrases: ["dot plot", "FOMC", "rate expectations"],
  },
  {
    slug: "eur-usd-explained-what-drives-the-pair",
    phrases: ["EUR/USD", "two-year yield spread"],
  },
  {
    slug: "gbp-usd-what-drives-the-pound-dollar-pair",
    phrases: ["GBP/USD", "sterling"],
  },
  {
    slug: "carry-trade-explained-usd-jpy",
    phrases: ["carry trade", "funding currency", "interest rate differential"],
  },
  {
    slug: "us-dollar-index-dxy-explained",
    phrases: ["dollar index", "DXY", "trade-weighted"],
  },
  {
    slug: "how-central-banks-intervene-in-currency-markets",
    phrases: ["currency intervention", "verbal intervention", "foreign reserves", "reserve currency"],
  },
  {
    slug: "eur-usd-forecast-federal-reserve-rate-decisions",
    phrases: ["scenario map", "policy divergence"],
  },

  {
    slug: "how-currency-pegs-work-and-why-they-break",
    phrases: ["currency peg", "impossible trinity", "fixed exchange rate"],
  },

  // ---- markets ----
  {
    slug: "bond-yields-explained-why-they-drive-everything",
    phrases: ["real yields", "yield curve", "bond yields", "term premium", "government bond"],
  },
  {
    slug: "how-inflation-data-moves-markets",
    phrases: ["core inflation", "CPI release", "base effects", "expected inflation", "headline inflation"],
  },
  {
    slug: "what-moves-the-price-of-oil",
    phrases: ["contango", "backwardation", "OPEC", "energy prices", "crude"],
  },
  {
    slug: "what-moves-the-price-of-gold",
    phrases: ["price of gold", "inflation hedge", "precious metal"],
  },
  {
    slug: "how-to-read-an-economic-calendar",
    phrases: ["economic calendar", "consensus forecast"],
  },
  {
    slug: "bull-vs-bear-markets-explained",
    phrases: ["bear market", "bull market", "recovery arithmetic"],
  },

  {
    slug: "how-etfs-work-explained",
    phrases: ["exchange-traded fund", "expense ratio", "tracking error"],
  },
  {
    slug: "what-is-quantitative-easing-explained",
    phrases: ["quantitative easing", "central bank balance sheet", "asset purchase"],
  },

  // ---- crypto ----
  {
    slug: "what-are-stablecoins-and-how-do-they-work",
    phrases: ["stablecoin", "depeg", "fiat-backed"],
  },
  {
    slug: "bitcoin-spot-etfs-explained-how-they-work",
    phrases: ["spot ETF", "spot Bitcoin ETF"],
  },
  {
    slug: "bitcoin-halving-explained",
    phrases: ["the halving", "block subsidy", "block reward", "mining difficulty", "hashrate"],
  },
  {
    slug: "proof-of-work-vs-proof-of-stake-explained",
    phrases: ["proof of stake", "proof of work", "51% attack"],
  },
  {
    slug: "ethereum-staking-explained-yields-and-risks",
    phrases: ["liquid staking", "staking yield", "slashing"],
  },
  {
    slug: "what-is-defi-decentralized-finance-explained",
    phrases: ["impermanent loss", "automated market maker", "liquidity pool", "smart contract"],
  },
  {
    slug: "how-to-store-crypto-safely-hot-vs-cold-wallets",
    phrases: ["seed phrase", "hardware wallet", "self-custody", "private key", "cold storage"],
  },
  {
    slug: "how-to-spot-crypto-scams-protect-yourself",
    phrases: ["rug pull", "pig butchering", "recovery scam", "phishing", "social engineering"],
  },
  {
    slug: "crypto-tax-basics-what-beginners-need-to-know",
    phrases: ["cost basis", "taxable event"],
  },
  {
    slug: "market-cap-vs-volume-reading-crypto-metrics",
    phrases: ["wash trading", "fully diluted valuation", "order book depth", "circulating supply", "market capitalisation"],
  },
  {
    slug: "what-are-tokenized-real-world-assets-rwa-guide",
    phrases: ["tokenized real-world assets", "tokenization", "tokenized", "settlement speed"],
  },
  {
    slug: "ai-crypto-tokens-surge-rwa-tokenization",
    phrases: ["narrative rotation", "sector rotation"],
  },
  {
    slug: "what-moves-the-price-of-bitcoin",
    phrases: ["global liquidity", "marginal buyer", "price of Bitcoin"],
  },
  {
    slug: "how-to-read-a-crypto-whitepaper",
    phrases: ["whitepaper", "token distribution"],
  },
];

/** Split a line into segments, marking which are safe to rewrite. */
function segment(line: string): { text: string; safe: boolean }[] {
  const out: { text: string; safe: boolean }[] = [];
  // Existing markdown links, images and inline code are off limits.
  const protectedRe = /(!?\[[^\]]*\]\([^)]*\)|`[^`]*`|<[^>]+>)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = protectedRe.exec(line)) !== null) {
    if (m.index > last) out.push({ text: line.slice(last, m.index), safe: true });
    out.push({ text: m[0], safe: false });
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push({ text: line.slice(last), safe: true });
  return out;
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Insert contextual links into a markdown body.
 *
 * Skips headings, tables, blockquotes and fenced code so the linking never
 * lands somewhere that would break layout or read as keyword stuffing.
 */
export function addInternalLinks(markdown: string, currentSlug: string, max = 6): string {
  const candidates = linkTargets
    .filter((t) => t.slug !== currentSlug)
    .flatMap((t) => t.phrases.map((phrase) => ({ slug: t.slug, phrase })))
    // Longest phrase first, so "proof of stake" wins over a shorter overlap.
    .sort((a, b) => b.phrase.length - a.phrase.length);

  const usedSlugs = new Set<string>();
  let added = 0;

  const lines = markdown.split("\n");
  let inFence = false;

  for (let i = 0; i < lines.length; i++) {
    if (added >= max) break;

    const line = lines[i];

    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (!line.trim()) continue;
    if (/^\s*#/.test(line)) continue; // headings
    if (/^\s*\|/.test(line)) continue; // tables
    if (/^\s*>/.test(line)) continue; // pull quotes
    if (/^\s*\*[^*]/.test(line)) continue; // the closing italic disclaimer

    const parts = segment(line);

    for (const cand of candidates) {
      if (added >= max) break;
      if (usedSlugs.has(cand.slug)) continue;

      // Word-boundary match, case-insensitive, first safe segment only.
      // Tolerates a trailing plural, so "margin calls" matches "margin call".
      const re = new RegExp(`\\b(${escapeRe(cand.phrase)}s?)\\b`, "i");
      const idx = parts.findIndex((p) => p.safe && re.test(p.text));
      if (idx === -1) continue;

      parts[idx] = {
        safe: true,
        // Trailing slash matches the exported URL; without it every internal
        // link costs a 301 redirect hop.
        text: parts[idx].text.replace(re, `[$1](/blog/${cand.slug}/)`),
      };
      usedSlugs.add(cand.slug);
      added++;
    }

    lines[i] = parts.map((p) => p.text).join("");
  }

  return lines.join("\n");
}
