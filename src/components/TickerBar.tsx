"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Market strip with REAL quotes.
 *
 * Deliberately not simulated: publishing invented numbers styled as live prices
 * is misleading on a finance site. Both sources are free, keyless and CORS-open,
 * so this works on static hosting with no backend:
 *   - CoinGecko        — crypto spot + 24h change
 *   - open.er-api.com  — daily FX reference rates (exchangerate-api free tier)
 *
 * If either request fails the strip renders nothing at all rather than showing
 * stale or fabricated data.
 */
interface Quote {
  symbol: string;
  price: number;
  decimals: number;
  prefix?: string;
  change?: number; // percent, 24h
}

const COINGECKO =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=usd&include_24hr_change=true";
// Frankfurter sends no Access-Control-Allow-Origin header, so it cannot be
// called from the browser. open.er-api.com does, and needs no API key.
const FX_RATES = "https://open.er-api.com/v6/latest/USD";

function fmt(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function TickerBar() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [asOf, setAsOf] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const next: Quote[] = [];

      // Crypto
      try {
        const res = await fetch(COINGECKO, { cache: "no-store" });
        if (res.ok) {
          const d = (await res.json()) as Record<string, { usd: number; usd_24h_change?: number }>;
          const map: [string, string, number][] = [
            ["bitcoin", "BTC/USD", 0],
            ["ethereum", "ETH/USD", 0],
            ["solana", "SOL/USD", 2],
            ["ripple", "XRP/USD", 4],
          ];
          for (const [id, symbol, decimals] of map) {
            const row = d[id];
            if (row?.usd != null) {
              next.push({ symbol, price: row.usd, decimals, prefix: "$", change: row.usd_24h_change });
            }
          }
        }
      } catch {
        /* leave crypto out */
      }

      // FX — rates are quoted against USD, so invert for EUR/USD and GBP/USD.
      try {
        const res = await fetch(FX_RATES, { cache: "no-store" });
        if (res.ok) {
          const d = (await res.json()) as {
            result?: string;
            rates?: Record<string, number>;
            time_last_update_utc?: string;
          };
          if (d.result === "success") {
            const r = d.rates ?? {};
            if (r.EUR) next.push({ symbol: "EUR/USD", price: 1 / r.EUR, decimals: 4 });
            if (r.GBP) next.push({ symbol: "GBP/USD", price: 1 / r.GBP, decimals: 4 });
            if (r.JPY) next.push({ symbol: "USD/JPY", price: r.JPY, decimals: 2 });
            if (r.CHF) next.push({ symbol: "USD/CHF", price: r.CHF, decimals: 4 });
            if (d.time_last_update_utc) setAsOf(d.time_last_update_utc);
          }
        }
      } catch {
        /* leave FX out */
      }

      if (!cancelled) setQuotes(next);
    }

    load();
    const id = setInterval(load, 120_000); // 2 min — well inside free-tier limits
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // No data → no strip. Never render placeholder prices.
  if (quotes.length === 0) return null;

  const items = [...quotes, ...quotes];

  return (
    <div className="w-full overflow-hidden border-b border-border bg-surface">
      <div className="flex items-center">
        <span className="hidden shrink-0 items-center gap-1.5 border-r border-border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-muted-foreground sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-up" />
          Markets
        </span>
        <div className="ticker-track flex w-max animate-ticker">
          {items.map((q, idx) => {
            const hasChange = typeof q.change === "number";
            const up = (q.change ?? 0) >= 0;
            return (
              <div
                key={`${q.symbol}-${idx}`}
                className="flex items-center gap-2 whitespace-nowrap px-4 py-1.5 text-[11.5px]"
              >
                <span className="font-semibold">{q.symbol}</span>
                <span className="tabular text-muted-foreground">
                  {q.prefix ?? ""}
                  {fmt(q.price, q.decimals)}
                </span>
                {hasChange && (
                  <span className={cn("tabular font-medium", up ? "text-up" : "text-down")}>
                    {up ? "▲" : "▼"} {Math.abs(q.change as number).toFixed(2)}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Attribution + staleness, so nobody mistakes this for a trading feed */}
      <p className="sr-only">
        Indicative market prices. Crypto data from CoinGecko; foreign exchange reference rates from
        exchangerate-api{asOf ? `, last updated ${asOf}` : ""}. Delayed and for information only — not
        for trading purposes.
      </p>
    </div>
  );
}
