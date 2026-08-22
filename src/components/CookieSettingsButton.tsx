"use client";

import { Cookie } from "lucide-react";

/** Reopens the consent banner, which registers `window.openCookieSettings`. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.openCookieSettings) {
          window.openCookieSettings();
        } else {
          // Consent was never recorded, or storage is blocked — clearing the key
          // makes the banner reappear on the next load.
          try {
            localStorage.removeItem("tng-consent-v1");
          } catch {
            /* ignore */
          }
          window.location.reload();
        }
      }}
      className="not-prose inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
    >
      <Cookie className="h-4 w-4" />
      Manage cookie preferences
    </button>
  );
}
