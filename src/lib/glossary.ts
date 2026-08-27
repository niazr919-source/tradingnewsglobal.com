import type { CategorySlug } from "./categories";

/**
 * Glossary of market terms.
 *
 * Definition queries ("what is contango", "what is slippage") are the lowest
 * competition, highest intent searches in this space, and the ones a young site
 * can realistically win. Each entry is a genuine definition rather than a stub,
 * and links to the article that explains it in full where one exists — which
 * also makes this page a hub distributing internal links across the site.
 */
export interface Term {
  term: string;
  /** Alternative spellings and acronyms, surfaced for search and filtering. */
  also?: string[];
  definition: string;
  category: CategorySlug;
  /** Slug of the article that covers this in depth, if there is one. */
  article?: string;
}

export const glossary: Term[] = [
  // ---------------------------------------------------------------- education
  {
    term: "Ask",
    also: ["Offer"],
    definition:
      "The lowest price a seller is currently willing to accept. You buy at the ask, which is why every position starts fractionally underwater — you have crossed the spread before the market has moved at all.",
    category: "trading-education",
    article: "bid-ask-spread-and-slippage-explained",
  },
  {
    term: "Bid",
    definition:
      "The highest price a buyer is currently willing to pay. You sell at the bid. The gap between bid and ask is the spread, and it is the first cost of any trade.",
    category: "trading-education",
    article: "bid-ask-spread-and-slippage-explained",
  },
  {
    term: "Bid-ask spread",
    also: ["Spread"],
    definition:
      "The difference between the highest price a buyer will pay and the lowest a seller will accept. It compensates market makers for standing ready to trade, and it widens exactly when you least want it to: during volatility, around news and in thin instruments.",
    category: "trading-education",
    article: "bid-ask-spread-and-slippage-explained",
  },
  {
    term: "Slippage",
    definition:
      "The difference between the price you expected and the price you received. It happens when the market moves between your order and its execution, or when your order is larger than the quantity available at the best price and fills through several levels.",
    category: "trading-education",
    article: "bid-ask-spread-and-slippage-explained",
  },
  {
    term: "Market order",
    definition:
      "An instruction to trade immediately at whatever price is available. It guarantees execution but not price. Use it when getting out matters more than the number.",
    category: "trading-education",
    article: "market-limit-and-stop-orders-explained",
  },
  {
    term: "Limit order",
    definition:
      "An instruction to trade only at a specified price or better. It guarantees price but not execution — the market may move away without ever filling you.",
    category: "trading-education",
    article: "market-limit-and-stop-orders-explained",
  },
  {
    term: "Stop-loss",
    also: ["Stop order"],
    definition:
      "A dormant order that becomes a market order once the price reaches your trigger level. It guarantees an attempt to exit, not a price — in a gap it can fill far beyond your stop. Position sizing caps your loss; a stop only caps your intention.",
    category: "trading-education",
    article: "market-limit-and-stop-orders-explained",
  },
  {
    term: "Stop-limit order",
    definition:
      "A stop that becomes a limit order rather than a market order when triggered. It protects against a terrible fill, but if the price gaps straight through your limit the order does not fill at all and you keep the position.",
    category: "trading-education",
    article: "market-limit-and-stop-orders-explained",
  },
  {
    term: "Trailing stop",
    definition:
      "A stop that follows the price at a fixed distance and never moves backwards. It automates letting a winner run while protecting accumulated gain, at the cost of a fixed guess about what counts as normal volatility.",
    category: "trading-education",
    article: "market-limit-and-stop-orders-explained",
  },
  {
    term: "Leverage",
    definition:
      "Controlling a position larger than the capital you commit. It does not improve your analysis; it shortens the distance between being wrong and being closed out. At 30:1, a 3.3% adverse move consumes your entire margin.",
    category: "trading-education",
    article: "forex-leverage-and-margin-explained",
  },
  {
    term: "Margin",
    definition:
      "The capital a broker holds as security against your open position. Required margin is what the position demands; free margin is what remains to absorb losses or open new positions.",
    category: "trading-education",
    article: "forex-leverage-and-margin-explained",
  },
  {
    term: "Margin call",
    definition:
      "A warning that your account equity has fallen toward the level required to keep positions open. Treating it as comfortable notice is a mistake — in fast markets, the margin call and the forced close-out can arrive together.",
    category: "trading-education",
    article: "forex-leverage-and-margin-explained",
  },
  {
    term: "Liquidation",
    also: ["Stop-out"],
    definition:
      "The automatic closing of positions by a broker once account equity falls below a threshold. Positions are closed at whatever price is available, which during a gap can be far worse than the threshold implied.",
    category: "trading-education",
    article: "forex-leverage-and-margin-explained",
  },
  {
    term: "Negative balance protection",
    definition:
      "A rule ensuring a retail client cannot lose more than the money in their account. Mandatory for retail clients in the EU, UK and Australia, and frequently absent at offshore brokers — which is the strongest single argument for using a locally regulated firm.",
    category: "trading-education",
    article: "what-is-a-cfd-and-why-regulators-restrict-them",
  },
  {
    term: "Expectancy",
    definition:
      "The average outcome per trade after costs: win rate times average win, minus loss rate times average loss, minus costs. If it is negative, no amount of discipline or position sizing repairs it — volume simply arrives at the loss faster.",
    category: "trading-education",
    article: "5-minute-binary-options-risk-management-strategy",
  },
  {
    term: "Position sizing",
    definition:
      "Deciding how large a trade to place based on how much you are willing to lose and how far away your stop sits. Risk is the fixed input; size is the output. Doing it the other way round is the most expensive habit in retail trading.",
    category: "trading-education",
    article: "risk-management-framework-for-short-term-traders",
  },
  {
    term: "Drawdown",
    definition:
      "The decline from a peak in account value to a subsequent trough. It matters more than most metrics because recovery is asymmetric: a 50% drawdown requires a 100% gain to undo.",
    category: "trading-education",
    article: "bull-vs-bear-markets-explained",
  },
  {
    term: "Disposition effect",
    definition:
      "The documented tendency to sell winning positions too early and hold losing ones too long. Realising a gain confirms you were right; realising a loss requires admitting you were wrong. The result is small gains and large losses.",
    category: "trading-education",
    article: "trading-psychology-managing-emotions",
  },
  {
    term: "Loss aversion",
    definition:
      "The finding from prospect theory that losses are felt roughly twice as intensely as equivalent gains. It is not a character flaw but a stable feature of human decision-making, and it drives most of the errors on a trading floor.",
    category: "trading-education",
    article: "trading-psychology-managing-emotions",
  },
  {
    term: "Revenge trading",
    definition:
      "Increasing position size or frequency after a loss in order to recover it quickly. The objective has quietly shifted from making good decisions to getting back to even, and it is the most common way an account is destroyed in a single session.",
    category: "trading-education",
    article: "trading-psychology-managing-emotions",
  },
  {
    term: "CFD",
    also: ["Contract for difference"],
    definition:
      "A contract with a broker to exchange the change in an asset's price without owning the asset. Leveraged, financed nightly, and the product behind the mandatory retail loss disclosures that sit between 70% and 80%.",
    category: "trading-education",
    article: "what-is-a-cfd-and-why-regulators-restrict-them",
  },
  {
    term: "Overnight financing",
    also: ["Swap", "Rollover"],
    definition:
      "Interest charged on the full notional value of a leveraged position for each night it is held — not on your margin. It is why leveraged products suit short holding periods and work steadily against long ones.",
    category: "trading-education",
    article: "what-is-a-cfd-and-why-regulators-restrict-them",
  },
  {
    term: "Binary option",
    definition:
      "An all-or-nothing bet on whether a price will be above or below a level at a set time. The payout on a win is smaller than the stake lost on a loss, making the expected return negative by construction. Banned for retail investors in the UK, EU and Australia.",
    category: "trading-education",
    article: "binary-options-explained-how-they-work",
  },
  {
    term: "Candlestick",
    definition:
      "A chart element encoding four prices for a period: open, high, low and close. The body spans open to close; the wicks reach the extremes. Useful for reading what happened; much weaker as a predictor than the pattern literature suggests.",
    category: "trading-education",
    article: "candlestick-charts-basics-for-beginners",
  },
  {
    term: "Doji",
    definition:
      "A candlestick whose open and close are almost identical, producing a very small body. It indicates that buyers and sellers finished the period roughly balanced. Often described as a reversal signal; on its own it mostly indicates indecision.",
    category: "trading-education",
    article: "candlestick-charts-basics-for-beginners",
  },
  {
    term: "Demo account",
    also: ["Paper trading"],
    definition:
      "A simulated trading account using fake money. It tests whether you can operate a platform and follow a process. It cannot test how you behave when the money is real, which is where most trading errors originate.",
    category: "trading-education",
    article: "why-demo-accounts-matter-practice-trading",
  },

  // -------------------------------------------------------------------- forex
  {
    term: "Pip",
    definition:
      "The standard smallest increment a currency pair is quoted in — the fourth decimal place for most pairs, the second for those quoted against the Japanese yen. Its cash value depends on position size and the quote currency.",
    category: "forex",
    article: "what-is-a-pip-forex-lot-sizes-explained",
  },
  {
    term: "Lot",
    definition:
      "A standardised quantity of the base currency. A standard lot is 100,000 units, a mini lot 10,000, a micro lot 1,000. Smaller denominations exist so position size can match intended risk rather than the reverse.",
    category: "forex",
    article: "what-is-a-pip-forex-lot-sizes-explained",
  },
  {
    term: "Base and quote currency",
    definition:
      "In EUR/USD, the euro is the base and the dollar the quote. The price says how many units of the quote currency one unit of the base will buy. Pip value is always denominated in the quote currency.",
    category: "forex",
    article: "eur-usd-explained-what-drives-the-pair",
  },
  {
    term: "Carry trade",
    definition:
      "Borrowing in a low interest rate currency and investing in a higher one, keeping the difference. Profitable in small increments for long periods, then losing a large share of it very quickly when the trade unwinds.",
    category: "forex",
    article: "carry-trade-explained-usd-jpy",
  },
  {
    term: "Funding currency",
    definition:
      "The currency borrowed in a carry trade, chosen because its interest rate is low. The Japanese yen and Swiss franc have historically filled this role, which is why the yen strengthens during market stress as positions are closed.",
    category: "forex",
    article: "carry-trade-explained-usd-jpy",
  },
  {
    term: "Interest rate differential",
    definition:
      "The gap between interest rates in two countries, best tracked through their two-year government bond yields. It is the single strongest driver of medium-term currency movement, because capital flows toward better risk-adjusted returns.",
    category: "forex",
    article: "how-federal-reserve-rate-decisions-move-forex",
  },
  {
    term: "DXY",
    also: ["US Dollar Index"],
    definition:
      "An index tracking the dollar against six currencies, weighted as US trade stood in 1973. The euro alone is close to 58% of it, so a DXY move is frequently a euro story rather than a dollar one.",
    category: "forex",
    article: "us-dollar-index-dxy-explained",
  },
  {
    term: "Currency peg",
    definition:
      "A commitment to hold an exchange rate at a fixed level, maintained by buying or selling the currency with foreign reserves. Defending against weakness is bounded by those reserves, which is why pegs break in one direction far more often than the other.",
    category: "forex",
    article: "how-currency-pegs-work-and-why-they-break",
  },
  {
    term: "Impossible trinity",
    also: ["Trilemma"],
    definition:
      "A country can have at most two of: a fixed exchange rate, free capital movement, and independent monetary policy. Pursuing all three fails, because defending the peg forces interest rates to whatever the peg requires.",
    category: "forex",
    article: "how-currency-pegs-work-and-why-they-break",
  },
  {
    term: "FX intervention",
    definition:
      "A central bank transacting in currency markets to influence its exchange rate. Weakening your own currency is unlimited because you can create it; strengthening it is bounded by finite, publicly reported reserves.",
    category: "forex",
    article: "how-central-banks-intervene-in-currency-markets",
  },
  {
    term: "Dot plot",
    definition:
      "A chart in the Federal Reserve's quarterly projections showing where each committee member expects the policy rate to be in coming years. Not a commitment, but the clearest available signal of the committee's collective thinking.",
    category: "forex",
    article: "how-federal-reserve-rate-decisions-move-forex",
  },
  {
    term: "Hawkish and dovish",
    definition:
      "Hawkish leans toward tighter policy and higher rates; dovish toward easier policy. Both are relative to what markets already expected, which is why a rate cut can be read as hawkish if it was smaller than priced.",
    category: "forex",
    article: "how-federal-reserve-rate-decisions-move-forex",
  },

  // ------------------------------------------------------------------ markets
  {
    term: "Bond yield",
    definition:
      "The annualised return from buying a bond at today's price and holding it to maturity. Because the cash flows are fixed, price and yield move inversely: when bond prices fall, yields rise, and they describe the same event.",
    category: "markets",
    article: "bond-yields-explained-why-they-drive-everything",
  },
  {
    term: "Real yield",
    definition:
      "A bond yield minus expected inflation — the return measured in purchasing power rather than currency. It is the single most useful number for understanding gold, and one of the most useful for equities.",
    category: "markets",
    article: "bond-yields-explained-why-they-drive-everything",
  },
  {
    term: "Yield curve",
    definition:
      "Bond yields plotted against maturity. Normally upward sloping. When short-term yields exceed long-term ones it is inverted, which historically preceded most US recessions — with variable and sometimes very long lags.",
    category: "markets",
    article: "bond-yields-explained-why-they-drive-everything",
  },
  {
    term: "Core inflation",
    definition:
      "Inflation excluding food and energy. Those categories are driven by supply shocks that monetary policy cannot influence, so core is a better read on the underlying price pressure a central bank can actually act on.",
    category: "markets",
    article: "how-inflation-data-moves-markets",
  },
  {
    term: "Base effects",
    definition:
      "Distortions in year-on-year inflation caused by an unusually high or low reading twelve months earlier. They can make inflation appear to improve or worsen for purely arithmetic reasons, with nothing happening now.",
    category: "markets",
    article: "how-inflation-data-moves-markets",
  },
  {
    term: "Quantitative easing",
    also: ["QE"],
    definition:
      "A central bank creating reserves to buy bonds, lowering long-term interest rates once short-term rates cannot fall further. It is an asset swap with the financial system, not money handed to households — which is why it raises asset prices far more reliably than consumer prices.",
    category: "markets",
    article: "what-is-quantitative-easing-explained",
  },
  {
    term: "Quantitative tightening",
    also: ["QT"],
    definition:
      "The reverse of QE: a central bank shrinking its balance sheet by letting bonds mature without reinvesting, or selling them. It returns supply to private markets and tends to push yields up quietly, without a headline rate decision.",
    category: "markets",
    article: "what-is-quantitative-easing-explained",
  },
  {
    term: "Contango",
    definition:
      "A futures curve where later-dated contracts cost more than nearer ones, usually signalling oversupply. It creates a persistent loss for funds that must roll contracts forward, which is why futures-based products lag the spot asset.",
    category: "markets",
    article: "what-moves-the-price-of-oil",
  },
  {
    term: "Backwardation",
    definition:
      "A futures curve where later-dated contracts cost less than nearer ones, usually signalling physical scarcity. Buyers are paying a premium for immediate delivery.",
    category: "markets",
    article: "what-moves-the-price-of-oil",
  },
  {
    term: "Brent and WTI",
    definition:
      "The two main crude oil benchmarks. Brent is a North Sea blend priced at sea and used for most internationally traded oil; West Texas Intermediate is a lighter US grade priced inland at Cushing, Oklahoma.",
    category: "markets",
    article: "what-moves-the-price-of-oil",
  },
  {
    term: "ETF",
    also: ["Exchange-traded fund"],
    definition:
      "A fund holding a basket of assets whose shares trade on an exchange like a single stock. An arbitrage mechanism run by authorised participants keeps its price close to the value of its holdings.",
    category: "markets",
    article: "how-etfs-work-explained",
  },
  {
    term: "Creation and redemption",
    definition:
      "The mechanism keeping an ETF's price aligned with its holdings. Large institutions exchange baskets of the underlying assets for ETF shares and back again, arbitraging away any gap for profit.",
    category: "markets",
    article: "how-etfs-work-explained",
  },
  {
    term: "Tracking error",
    definition:
      "The gap between an index fund's return and its index. It comes from fees, cash held between dividend receipt and reinvestment, rebalancing costs, sampling and withholding tax — each small, all compounding.",
    category: "markets",
    article: "how-etfs-work-explained",
  },
  {
    term: "Expense ratio",
    definition:
      "The annual percentage a fund deducts from assets to cover management. It applies to your whole balance every year regardless of performance, which is why it dominates long-term outcomes more than any single trade.",
    category: "markets",
    article: "how-etfs-work-explained",
  },
  {
    term: "Bear market",
    definition:
      "Conventionally a fall of 20% or more from a recent peak. The threshold is an arbitrary convention identifiable only in hindsight, which limits how useful it is for any decision you make today.",
    category: "markets",
    article: "bull-vs-bear-markets-explained",
  },
  {
    term: "Bull market",
    definition:
      "Conventionally a rise of 20% or more from a trough. Historically longer-lasting than bear markets and larger in magnitude, which is the central argument for remaining invested through cycles.",
    category: "markets",
    article: "bull-vs-bear-markets-explained",
  },

  // ------------------------------------------------------------------- crypto
  {
    term: "Stablecoin",
    definition:
      "A cryptocurrency designed to hold a steady value, usually one US dollar. Stability is a design goal rather than a property, and how the peg is maintained — reserves, overcollateralisation or algorithm — determines how it fails.",
    category: "crypto",
    article: "what-are-stablecoins-and-how-do-they-work",
  },
  {
    term: "Depeg",
    definition:
      "When a stablecoin trades away from its target value. Usually a liquidity event before it is a solvency one, and dangerous well beyond the token itself because stablecoins are widely used as collateral.",
    category: "crypto",
    article: "what-are-stablecoins-and-how-do-they-work",
  },
  {
    term: "Halving",
    definition:
      "The scheduled halving of Bitcoin's block reward every 210,000 blocks, roughly every four years. It reliably changes miner economics; its effect on price is a much weaker claim than commonly asserted.",
    category: "crypto",
    article: "bitcoin-halving-explained",
  },
  {
    term: "Proof of work",
    definition:
      "A consensus mechanism where participants compete to solve a computational puzzle, making it expensive to rewrite history. The energy consumed is the security budget, not incidental waste.",
    category: "crypto",
    article: "proof-of-work-vs-proof-of-stake-explained",
  },
  {
    term: "Proof of stake",
    definition:
      "A consensus mechanism where validators lock up capital as a bond instead of spending electricity. Misbehaviour is punished by destroying that stake, so an attacker who fails loses the asset they attacked with.",
    category: "crypto",
    article: "proof-of-work-vs-proof-of-stake-explained",
  },
  {
    term: "Slashing",
    definition:
      "The protocol destroying part of a validator's staked capital as a penalty for provable misbehaviour, such as signing conflicting blocks. Designed to be severe enough that attacking the network is irrational.",
    category: "crypto",
    article: "ethereum-staking-explained-yields-and-risks",
  },
  {
    term: "Liquid staking",
    definition:
      "Staking through a protocol that issues a tradable token representing your staked position. It solves the liquidity problem and creates a subtler one: that token is a claim on staked assets, not the asset, and has traded below par under stress.",
    category: "crypto",
    article: "ethereum-staking-explained-yields-and-risks",
  },
  {
    term: "Impermanent loss",
    definition:
      "The shortfall a liquidity provider suffers versus simply holding both assets. The automated market maker sells whichever asset is rising and buys whichever is falling, so the provider ends up with more of the loser.",
    category: "crypto",
    article: "what-is-defi-decentralized-finance-explained",
  },
  {
    term: "Automated market maker",
    also: ["AMM"],
    definition:
      "A decentralised exchange design where trades execute against a pool of two assets, with a formula setting the price from their ratio. It removes the need to match a buyer with a seller, and introduces impermanent loss.",
    category: "crypto",
    article: "what-is-defi-decentralized-finance-explained",
  },
  {
    term: "Oracle",
    definition:
      "A service supplying external data, usually prices, to a smart contract. Because blockchains cannot see outside themselves, oracles are a structural weak point: a protocol fed a false price behaves correctly on wrong input.",
    category: "crypto",
    article: "what-is-defi-decentralized-finance-explained",
  },
  {
    term: "Seed phrase",
    also: ["Recovery phrase"],
    definition:
      "A sequence of 12 or 24 words that mathematically generates every private key in a wallet. Anyone holding it controls the funds completely. It is not a password that can be reset; it is the asset in written form.",
    category: "crypto",
    article: "how-to-store-crypto-safely-hot-vs-cold-wallets",
  },
  {
    term: "Cold storage",
    definition:
      "Holding private keys on a device with no internet connection, almost always a hardware wallet. The key never touches an online computer, so malware on that computer cannot extract it.",
    category: "crypto",
    article: "how-to-store-crypto-safely-hot-vs-cold-wallets",
  },
  {
    term: "Rug pull",
    definition:
      "A fraud where a token's creators sell their holdings, remove liquidity, or disable selling after promoting the token. Checking whether liquidity is locked and whether the contract can block sales takes about two minutes.",
    category: "crypto",
    article: "how-to-spot-crypto-scams-protect-yourself",
  },
  {
    term: "Fully diluted valuation",
    also: ["FDV"],
    definition:
      "Total eventual token supply multiplied by the current price. When FDV is many times market capitalisation, a large quantity of supply is scheduled to enter circulation and will need buyers.",
    category: "crypto",
    article: "market-cap-vs-volume-reading-crypto-metrics",
  },
  {
    term: "Wash trading",
    definition:
      "Trading with yourself to manufacture the appearance of volume. Cheap on venues with low or rebated fees, and common because listing sites and traders use volume as a proxy for legitimacy.",
    category: "crypto",
    article: "market-cap-vs-volume-reading-crypto-metrics",
  },
  {
    term: "Tokenization",
    also: ["Tokenized real-world assets", "RWA"],
    definition:
      "Recording ownership of an asset — a bond, a fund, a property — on a blockchain. It improves settlement speed and access. It does not change what the asset earns or what it is worth.",
    category: "crypto",
    article: "what-are-tokenized-real-world-assets-rwa-guide",
  },
];

export const glossaryByLetter = () => {
  const map = new Map<string, Term[]>();
  for (const t of [...glossary].sort((a, b) => a.term.localeCompare(b.term))) {
    const letter = t.term[0].toUpperCase();
    const list = map.get(letter);
    if (list) list.push(t);
    else map.set(letter, [t]);
  }
  return map;
};

export function termSlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}
