"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "cookie-consent";

/**
 * GDPR-style cookie consent banner. Stores the user's choice in localStorage.
 * When "accepted", it sets `window.__cookieConsent = true` so ad/analytics code
 * can check consent before loading personalized content.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem(STORAGE_KEY);
      if (!choice) setVisible(true);
      if (choice === "accepted") window.__cookieConsent = true;
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    window.__cookieConsent = value === "accepted";
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] p-4">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-2xl sm:flex-row sm:items-center">
        <Cookie className="h-6 w-6 shrink-0 text-primary" />
        <p className="flex-1 text-sm text-muted-foreground">
          We use cookies to improve your experience, analyze traffic, and serve personalized ads. See
          our{" "}
          <Link href="/privacy" className="font-medium text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
