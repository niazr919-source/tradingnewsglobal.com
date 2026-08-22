import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { newsroom, desks } from "@/lib/newsroom";
import { categories } from "@/lib/categories";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The newsroom",
  description: `Who produces ${siteConfig.name}, what each desk covers, the standards the work is held to, and how to reach us with a correction.`,
  alternates: { canonical: "/newsroom" },
};

export default function NewsroomPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `The ${siteConfig.name} newsroom`,
    url: absoluteUrl("/newsroom"),
    mainEntity: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.publisher,
      url: absoluteUrl("/"),
      email: newsroom.email,
      description: newsroom.bio,
      publishingPrinciples: absoluteUrl("/editorial-policy"),
      correctionsPolicy: absoluteUrl("/editorial-policy"),
      knowsAbout: desks.flatMap((d) => d.focus),
    },
  };

  return (
    <PageShell
      title="The newsroom"
      intro={`Articles on ${siteConfig.name} are published under the newsroom byline. This page sets out what each desk covers, the standards the work is held to, and how to reach a person about it.`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h2>How we publish</h2>
      <p>{newsroom.bio}</p>
      <p>
        We publish under a single masthead rather than assigning individual bylines. That is a
        deliberate choice, and a common one for small independent publications: it means
        accountability sits with the publication rather than being diffused across names, and every
        article is held to the same standard rather than to whoever wrote it. Responsibility for
        everything here — including the errors — belongs to {siteConfig.name}.
      </p>

      <h2>What we will not publish</h2>
      <ul>
        <li>
          <strong>No trading signals or price calls.</strong> No entries, exits or targets.
        </li>
        <li>
          <strong>No affiliate links and no broker referrals.</strong> We earn nothing when a reader
          opens a trading account. Our only revenue is third-party display advertising.
        </li>
        <li>
          <strong>No sponsored or paid articles.</strong> Nobody can buy a place in our coverage.
        </li>
        <li>
          <strong>No guaranteed-returns framing</strong>, and no describing any strategy as safe,
          passive income or a way to replace a salary.
        </li>
      </ul>

      <h2>The desks</h2>
      <div className="not-prose mt-6 space-y-8">
        {desks.map((desk) => {
          const cat = categories[desk.slug];
          const count = getPostsByCategory(desk.slug).length;
          return (
            <section key={desk.slug} className="border-t border-border pt-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-xl font-semibold tracking-[-0.015em]">
                  <span
                    className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                    style={{ background: cat.accent }}
                    aria-hidden
                  />
                  {desk.title}
                </h3>
                <Link
                  href={`/category/${desk.slug}`}
                  className="text-[13px] font-semibold text-primary hover:underline"
                >
                  {cat.name} · {count} {count === 1 ? "article" : "articles"}
                </Link>
              </div>

              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                {desk.remit}
              </p>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Areas of focus
              </p>
              <ul className="mt-2 grid gap-x-6 gap-y-1.5 text-[13.5px] text-muted-foreground sm:grid-cols-2">
                {desk.focus.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <h2>Standards</h2>
      <ul>
        <li>
          <strong>Primary sources.</strong> We work from regulator publications, central bank
          statements, statistical releases and official documentation. Where an article rests on
          external facts, those sources are listed at the foot of it so you can check them yourself.
        </li>
        <li>
          <strong>Numbers are checked against the original.</strong> Not against another article
          quoting it.
        </li>
        <li>
          <strong>Uncertainty is stated.</strong> Where a claim is contested or the evidence is thin,
          the article says so rather than picking the tidier version.
        </li>
        <li>
          <strong>Risk goes in the body.</strong> Where a product loses money for most retail
          traders, we say so in the text and cite the regulator&apos;s own figures — not in small
          print at the bottom.
        </li>
      </ul>

      <h2>Corrections</h2>
      <p>
        We correct errors in public rather than quietly editing them away. Factual corrections are
        noted at the foot of the article, and substantial ones at the top. Articles that have been
        materially revised show an updated date alongside the original publication date.
      </p>
      <p>
        If you have found an error, tell us. Send the article link and the specific claim to{" "}
        <a href={`mailto:${newsroom.correctionsEmail}`}>{newsroom.correctionsEmail}</a>. Every
        substantiated report gets a reply. The full process is set out in our{" "}
        <Link href="/editorial-policy">editorial policy</Link>.
      </p>

      <h2>Contact</h2>
      <p className="not-prose mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
        <a
          href={`mailto:${newsroom.email}`}
          className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
        >
          <Mail className="h-4 w-4" />
          {newsroom.email}
        </a>
        <Link href="/contact" className="text-muted-foreground hover:text-foreground">
          All contact routes →
        </Link>
      </p>

      <p className="mt-8 text-[13px] text-muted-foreground">
        {siteConfig.name} currently publishes {posts.length} articles across {desks.length} desks.
      </p>
    </PageShell>
  );
}
