"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Instrument {
  symbol: string;
  price: number;
  decimals: number;
  prefix?: string;
}

const INITIAL: Instrument[] = [
  { symbol: "BTC/USD", price: 68432.1, decimals: 1, prefix: "$" },
  { symbol: "ETH/USD", price: 3781.44, decimals: 2, prefix: "$" },
  { symbol: "EUR/USD", price: 1.0874, decimals: 4 },
  { symbol: "GBP/USD", price: 1.2731, decimals: 4 },
  { symbol: "GOLD", price: 2398.6, decimals: 1, prefix: "$" },
];

interface Tick extends Instrument {
  change: number; // percent vs previous tick
}

function seedTicks(): Tick[] {
  return INITIAL.map((i) => ({ ...i, change: 0 }));
}

/** Dummy "real-time" feed: random-walks each instrument on an interval. */
export function TickerBar() {
  const [ticks, setTicks] = useState<Tick[]>(seedTicks);

  useEffect(() => {
    const id = setInterval(() => {
      setTicks((prev) =>
        prev.map((t) => {
          const drift = (Math.random() - 0.5) * (t.price * 0.0015);
          const next = Math.max(0.0001, t.price + drift);
          return { ...t, change: ((next - t.price) / t.price) * 100, price: next };
        })
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // Duplicate the list so the marquee can loop seamlessly.
  const items = [...ticks, ...ticks];

  return (
    <div className="w-full overflow-hidden border-b border-border bg-card/80 backdrop-blur">
      <div className="flex ticker-track w-max animate-ticker">
        {items.map((t, idx) => {
          const up = t.change >= 0;
          return (
            <div key={`${t.symbol}-${idx}`} className="flex items-center gap-2 whitespace-nowrap px-5 py-1.5 text-xs">
              <span className="font-semibold text-foreground">{t.symbol}</span>
              <span className="font-mono text-muted-foreground">
                {t.prefix ?? ""}
                {t.price.toLocaleString(undefined, {
                  minimumFractionDigits: t.decimals,
                  maximumFractionDigits: t.decimals,
                })}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-mono font-medium",
                  up ? "text-up" : "text-down"
                )}
              >
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {up ? "+" : ""}
                {t.change.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
