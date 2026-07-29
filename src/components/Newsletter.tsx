"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

/** Client-side newsletter signup (demo — logs instead of hitting a backend). */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Wire this up to your ESP (Mailchimp, ConvertKit, Resend, …).
    console.info("Newsletter signup:", email);
    setDone(true);
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <p className="text-sm font-semibold">Get the Trading News Global daily brief</p>
      <p className="text-xs text-muted-foreground">
        Market-moving crypto, forex and binary news in your inbox. No spam.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        <button
          type="submit"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {done ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          {done ? "Joined" : "Join"}
        </button>
      </div>
      {done && <p className="text-xs text-up">Thanks — you&apos;re on the list.</p>}
    </form>
  );
}
