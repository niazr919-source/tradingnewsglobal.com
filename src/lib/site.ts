/**
 * Global site configuration. Used across metadata, SEO helpers, sitemap and UI.
 * Set NEXT_PUBLIC_SITE_URL in the environment (e.g. Vercel) for correct absolute URLs.
 */
export const siteConfig = {
  name: "Trading News Global",
  title: "Trading News Global — Crypto, Forex & Binary Trading News",
  description:
    "Trading News Global delivers breaking cryptocurrency, forex and binary trading news, market analysis, and actionable strategies for modern traders.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://tradingnewsglobal.example.com").replace(/\/$/, ""),
  locale: "en_US",
  twitter: "@tradingnewsglobal",
  publisher: "Trading News Global Media",
  keywords: [
    "cryptocurrency news",
    "forex trading",
    "binary options",
    "Tokenized RWAs",
    "Federal Reserve Interest Rates",
    "5-Minute Binary Strategies",
    "Bitcoin",
    "Ethereum",
    "EUR/USD forecast",
    "trading strategy",
  ],
  nav: [
    { label: "Crypto", href: "/category/crypto" },
    { label: "Forex", href: "/category/forex" },
    { label: "Binary Trading", href: "/category/binary-trading" },
  ],
  // ⬇️ Replace the placeholder URLs below with your real profile links.
  social: [
    { platform: "facebook", label: "Facebook", href: "https://facebook.com/tradingnewsglobal" },
    { platform: "instagram", label: "Instagram", href: "https://instagram.com/tradingnewsglobal" },
    { platform: "whatsapp", label: "WhatsApp", href: "https://wa.me/10000000000" },
    { platform: "pinterest", label: "Pinterest", href: "https://pinterest.com/tradingnewsglobal" },
    { platform: "telegram", label: "Telegram", href: "https://t.me/tradingnewsglobal" },
  ],
} as const;

export type SocialPlatform = (typeof siteConfig.social)[number]["platform"];

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? "" : "/"}${path}`;
}
