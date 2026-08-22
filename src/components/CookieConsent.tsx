"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "tng-consent-v1";

type Choice = "accepted" | "essential";

declare global {
  interface Window {
    __cookieConsent?: boolean;
    dataLayer?: unknown[];
    openCookieSettings?: () => void;
  }
}

/**
 * Consent banner wired to Google Consent Mode v2 defaults.
 *
 * Consent is denied until the reader opts in, which is the correct default for
 * UK/EU visitors and keeps personalised ads off for anyone who declines.
 *
 * ⚠️ This is a baseline, not a certified CMP. Google requires a Consent
 * Management Platform from its certified list before you may serve ads to
 * visitors in the EEA or UK. Enable "Privacy & messaging" in your AdSense
 * account once approved, and it will take over from this banner.
 */
function pushConsent(granted: boolean) {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
  window.__cookieConsent = granted;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // localStorage does not exist on the server, so the banner's visibility can
    // only be resolved after mount.
    try {
      const choice = localStorage.getItem(STORAGE_KEY) as Choice | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!choice) setVisible(true);
      else pushConsent(choice === "accepted");
    } catch {
      setVisible(true);
    }
  }, []);

  // Let the cookie policy page reopen this banner.
  useEffect(() => {
    window.openCookieSettings = () => setVisible(true);
    return () => {
      delete window.openCookieSettings;
    };
  }, []);

  const decide = useCallback((choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* private mode — the choice just will not persist */
    }
    pushConsent(choice === "accepted");
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-2xl sm:flex-row sm:items-center">
        <Cookie className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        <p className="flex-1 text-[13px] leading-relaxed text-muted-foreground">
          We use essential cookies to run the site. With your permission we also allow advertising
          cookies, including Google&apos;s, which may be used to personalise the ads you see. You can
          change this at any time on our{" "}
          <Link href="/cookies" className="font-medium text-primary hover:underline">
            cookie policy
          </Link>{" "}
          page.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("essential")}
            className="rounded-md border border-border px-3.5 py-2 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-md bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
