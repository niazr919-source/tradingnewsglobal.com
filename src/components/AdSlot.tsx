"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT; // e.g. "ca-pub-1234567890123456"

/**
 * Reusable ad unit.
 * - When NEXT_PUBLIC_ADSENSE_CLIENT is set, renders a real Google AdSense unit.
 * - Otherwise renders a labeled placeholder so you can see where ads will appear.
 *
 * Get `slot` from your AdSense dashboard after creating an ad unit.
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

  useEffect(() => {
    if (!AD_CLIENT || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* AdSense script not ready yet */
    }
  }, []);

  if (!AD_CLIENT) {
    return (
      <div
        className={cn(
          "flex min-h-24 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-xs font-medium uppercase tracking-wide text-muted-foreground",
          className
        )}
      >
        {label} — ad space
      </div>
    );
  }

  return (
    <div className={className}>
      <span className="mb-1 block text-center text-[10px] uppercase tracking-wide text-muted-foreground">
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
    </div>
  );
}
