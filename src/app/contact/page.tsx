import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Mail, Megaphone, PenLine, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SocialLinks } from "@/components/SocialLinks";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Reach the ${siteConfig.name} newsroom — news tips, corrections, privacy requests and advertising enquiries, with a named address for each.`,
  alternates: { canonical: "/contact" },
};

const desks = [
  {
    icon: PenLine,
    title: "Newsroom",
    email: siteConfig.email.editorial,
    blurb: "Story tips, questions about an article, syndication and general enquiries.",
  },
  {
    icon: AlertCircle,
    title: "Corrections",
    email: siteConfig.email.corrections,
    blurb: "Spotted an error? Send the article link and the specific claim. Every report gets a reply.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy",
    email: siteConfig.email.privacy,
    blurb: "Data access, deletion and other requests under GDPR or CCPA.",
  },
  {
    icon: Megaphone,
    title: "Advertising",
    email: siteConfig.email.advertising,
    blurb: "Display advertising enquiries. Note that we do not sell editorial coverage.",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.publisher,
      url: absoluteUrl("/"),
      contactPoint: desks.map((d) => ({
        "@type": "ContactPoint",
        contactType: d.title,
        email: d.email,
        availableLanguage: ["English"],
      })),
    },
  };

  return (
    <PageShell
      title="Contact us"
      intro="Every desk below is a monitored address that reaches a person. We aim to reply within two working days."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="not-prose grid gap-4 sm:grid-cols-2">
        {desks.map((desk) => (
          <div key={desk.email} className="rounded-lg border border-border bg-surface p-5">
            <desk.icon className="h-5 w-5 text-primary" aria-hidden />
            <h2 className="mt-3 font-display text-[17px] font-semibold">{desk.title}</h2>
            <a
              href={`mailto:${desk.email}`}
              className="mt-1 block break-all text-[13.5px] font-medium text-primary hover:underline"
            >
              {desk.email}
            </a>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{desk.blurb}</p>
          </div>
        ))}
      </div>

      <h2>Send us a message</h2>
      <p>
        This site is served as static files with no backend, so the form below composes an email in your
        own mail client rather than posting anywhere. Nothing you type is transmitted to us until you
        press send in your mail app.
      </p>
      <ContactForm />

      <h2>What we cannot help with</h2>
      <p>
        We are a publisher, not a broker or an adviser. We cannot recommend an asset, review your
        portfolio, tell you whether to enter a trade, or help you recover funds from an exchange or
        platform. Requests of that kind will get a polite decline. Please read our{" "}
        <Link href="/disclaimer">risk disclaimer</Link>.
      </p>
      <p>
        If someone is using our name to sell signals, courses or a trading account, we want to know —
        send the details to{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a>. We publish
        nothing of the sort.
      </p>

      <h2>Elsewhere</h2>
      <p>We post article links and nothing else on these accounts:</p>
      <div className="not-prose">
        <SocialLinks />
      </div>

      <h2>Postal enquiries</h2>
      <p>
        For legal or formal correspondence, write to us first at{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>
          <Mail className="inline h-4 w-4 align-text-bottom" /> {siteConfig.email.editorial}
        </a>{" "}
        and we will provide a postal address for service.
      </p>
    </PageShell>
  );
}
