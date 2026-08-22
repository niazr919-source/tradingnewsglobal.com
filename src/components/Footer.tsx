import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { categoryList } from "@/lib/categories";
import { authors } from "@/lib/authors";
import { Newsletter } from "./Newsletter";
import { SocialLinks } from "./SocialLinks";
import { Wordmark } from "./Wordmark";

const aboutLinks = [
  { label: "About us", href: "/about" },
  { label: "Editorial policy", href: "/editorial-policy" },
  { label: "Our writers", href: "/authors" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookie policy", href: "/cookies" },
  { label: "Terms of service", href: "/terms" },
  { label: "Risk disclaimer", href: "/disclaimer" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Wordmark className="text-xl" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6 max-w-sm">
              <Newsletter />
            </div>
            <div className="mt-6">
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Follow
              </p>
              <SocialLinks />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Sections">
              {categoryList.map((cat) => (
                <FooterLink key={cat.slug} href={`/category/${cat.slug}`}>
                  {cat.name}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="About">
              {aboutLinks.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
              {authors.slice(0, 2).map((a) => (
                <FooterLink key={a.slug} href={`/authors/${a.slug}`}>
                  {a.name}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Legal">
              {legalLinks.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
              <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Standing risk disclosure — required reading on a trading site */}
        <div className="mt-12 rounded-lg border border-border border-l-[3px] border-l-down bg-down/5 p-4">
          <p className="text-[12.5px] font-semibold uppercase tracking-wide text-down">Risk warning</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
            Trading and investing in cryptocurrencies, foreign exchange and leveraged or short-duration
            derivatives carries a high level of risk and is not suitable for everyone. You can lose some or
            all of your capital, and with some products more than your initial deposit. Past performance
            never indicates future results. {siteConfig.name} publishes journalism and educational material
            only — we are not a broker, not an investment adviser, and nothing here is personalised
            investment, legal or tax advice. Seek advice from a licensed professional who knows your
            circumstances before you trade. Read the full{" "}
            <Link href="/disclaimer" className="font-medium text-foreground underline underline-offset-2">
              risk disclaimer
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground sm:flex-row">
          <p>
            © {siteConfig.foundedYear}–{year} {siteConfig.publisher}. All rights reserved.
          </p>
          <p>
            Editorial enquiries:{" "}
            <a
              href={`mailto:${siteConfig.email.editorial}`}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {siteConfig.email.editorial}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-3.5 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-muted-foreground transition-colors hover:text-primary">
        {children}
      </Link>
    </li>
  );
}
