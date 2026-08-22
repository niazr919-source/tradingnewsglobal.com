/**
 * Global site configuration. Used across metadata, SEO helpers, sitemap and UI.
 *
 * NEXT_PUBLIC_SITE_URL is set in `.env.production` and must match the live domain
 * exactly (no trailing slash) — canonical tags, OpenGraph, JSON-LD and sitemap.xml
 * all derive from it.
 */
export const siteConfig = {
  name: "Trading News Global",
  shortName: "TNG",
  title: "Trading News Global — Crypto, Forex & Market Analysis",
  tagline: "Markets, explained without the hype.",
  description:
    "Trading News Global publishes independent explainers and analysis on cryptocurrency, forex and global markets — written in plain language, with the risks stated up front.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://tradingnewsglobal.com").replace(/\/+$/, ""),
  locale: "en_US",
  language: "en",
  twitter: "@tradingnewsglb",
  publisher: "Trading News Global",
  foundedYear: 2026,

  /** Real, monitored addresses. AdSense review expects a reachable contact route. */
  email: {
    editorial: "editor@tradingnewsglobal.com",
    corrections: "corrections@tradingnewsglobal.com",
    privacy: "privacy@tradingnewsglobal.com",
    advertising: "advertising@tradingnewsglobal.com",
  },

  keywords: [
    "cryptocurrency news",
    "forex trading explained",
    "market analysis",
    "Bitcoin",
    "Ethereum",
    "EUR/USD",
    "stablecoins",
    "tokenized real world assets",
    "trading risk management",
    "financial education",
  ],

  /** Replace with your real profile links before launch. */
  social: [
    { platform: "facebook", label: "Facebook", href: "https://facebook.com/tradingnewsglobal" },
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/tradingnewsglobal" },
    { platform: "pinterest", label: "Pinterest", href: "https://pinterest.com/tradingnewsglobal" },
    { platform: "telegram", label: "Telegram", href: "https://t.me/tradingnewsglobal" },
    { platform: "whatsapp", label: "WhatsApp", href: "https://wa.me/10000000000" },
  ],
} as const;

export type SocialPlatform = (typeof siteConfig.social)[number]["platform"];

/**
 * Build an absolute URL from a site-relative path.
 *
 * The export uses `trailingSlash: true`, so every page URL ends in `/`. Canonical
 * tags, sitemap entries and JSON-LD must match that exactly or Google sees two
 * URLs for one page. File paths (anything with an extension) are left alone.
 */
export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const isFile = /\.[a-z0-9]+$/i.test(clean);
  const normalized = isFile || clean.endsWith("/") ? clean : `${clean}/`;
  return `${siteConfig.url}${normalized}`;
}
