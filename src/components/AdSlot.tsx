"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const AD_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * Ad unit.
 *
 * - With NEXT_PUBLIC_ADSENSE_CLIENT set, renders a real AdSense unit.
 * - Without it, renders a quiet placeholder so layout is stable while the site
 *   is under review. Google explicitly does not require live ad code to approve
 *   a site, and shipping empty <ins> tags with no publisher ID is worse than
 *   shipping none at all.
 *
 * Every unit is labelled "Advertisement" — required by AdSense policy so ads are
 * never mistaken for editorial content.
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
      /* script not ready */
    }
  }, []);

  if (!AD_CLIENT) {
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
