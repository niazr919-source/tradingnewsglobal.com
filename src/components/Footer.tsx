import Link from "next/link";
import { Activity } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { categoryList } from "@/lib/categories";
import { Newsletter } from "./Newsletter";
import { SocialLinks } from "./SocialLinks";

const siteLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Risk Disclaimer", href: "/disclaimer" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Activity className="h-5 w-5" />
              </span>
              <span className="text-xl">
                Trading News <span className="text-primary">Global</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{siteConfig.description}</p>
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold">Follow us</p>
              <SocialLinks />
            </div>
            <div className="mt-6 max-w-sm rounded-xl border border-border bg-background p-4">
              <Newsletter />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide">Categories</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {categoryList.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide">Trading News Global</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk disclaimer */}
        <div className="mt-10 rounded-xl border border-down/30 bg-down/5 p-4">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <strong className="text-down">Risk Disclaimer:</strong> Trading and investing in
            cryptocurrencies, foreign exchange (forex) and binary options carries a high level of risk
            and may not be suitable for all investors. Leveraged and short-duration products can result
            in the loss of your entire capital. Trading News Global publishes news and educational content only and
            does not provide personalized investment, financial, legal or tax advice. Always conduct your
            own research and consult a licensed professional before trading.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.publisher}. All rights reserved.
          </p>
          <p>Built with Next.js · For educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
