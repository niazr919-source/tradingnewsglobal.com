"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * Ad unit.
 *
 * Renders a real AdSense unit only when BOTH the publisher ID and a specific ad
 * `slot` are available. An <ins> tag carrying a publisher ID but no slot cannot
 * be filled and is invalid markup, so without a slot this falls back to the
 * neutral placeholder instead.
 *
 * That means display units stay dormant until you create ad units in the
 * AdSense dashboard and pass their IDs here. Auto ads are unaffected — they run
 * from the script in <head> and need no slot.
 *
 * Every unit is labelled "Advertisement", which AdSense policy requires so ads
 * are never mistaken for editorial content.
 */
export function AdSlot({
  slot,
  format = "auto",
  className,
  label = "Advertisement",
}: {
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}) {
  const pushed = useRef(false);
  const isLive = Boolean(AD_CLIENT && slot);

  useEffect(() => {
    if (!isLive || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* script not ready */
    }
  }, [isLive]);

  if (!isLive) {
    return (
      <div
        aria-hidden
        className={cn(
          "flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70",
          className
        )}
      >
        {label}
      </div>
    );
  }

  return (
    <aside className={className} aria-label={label}>
      <span className="mb-1 block text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
