"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Newsletter signup.
 *
 * This is a static site with no backend, so the form opens a pre-filled email
 * rather than pretending to store an address. A form that shows "you are
 * subscribed" while doing nothing is a dark pattern and, on a site under
 * AdSense review, a straightforward misrepresentation.
 *
 * To make it a real list, point `action` at your provider (Mailchimp, Kit,
 * Buttondown all accept a plain HTML POST) and drop the mailto handler.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Newsletter signup");
    const body = encodeURIComponent(`Please add ${email} to the Trading News Global mailing list.`);
    window.location.href = `mailto:${siteConfig.email.editorial}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-border bg-card p-4">
      <p className="font-display text-[15px] font-semibold">The weekly brief</p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
        One email a week: what actually moved crypto, currencies and commodities, and why. No signals,
        no promotions.
      </p>
      <div className="mt-3 flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-[13px] outline-none transition-colors focus:border-primary"
        />
        <button
          type="submit"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-primary px-3.5 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Send className="h-3.5 w-3.5" />
          Join
        </button>
      </div>
      <p className="mt-2 text-[11.5px] text-muted-foreground">
        Opens your email client. We only use your address to send the brief.
      </p>
    </form>
  );
}
