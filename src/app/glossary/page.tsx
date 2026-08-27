import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { glossary, glossaryByLetter, termSlug } from "@/lib/glossary";
import { categories } from "@/lib/categories";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Glossary of trading and market terms",
  description: `Plain-English definitions of ${glossary.length} crypto, forex and market terms — what each one means, and why it matters.`,
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const byLetter = glossaryByLetter();
  const letters = [...byLetter.keys()];

  // DefinedTermSet is the schema type for exactly this: a glossary of terms.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: `${siteConfig.name} glossary`,
    description: "Definitions of cryptocurrency, foreign exchange and market terms.",
    url: absoluteUrl("/glossary"),
    inLanguage: siteConfig.language,
    hasDefinedTerm: glossary.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      url: `${absoluteUrl("/glossary")}#${termSlug(t.term)}`,
      ...(t.also?.length ? { alternateName: t.also } : {}),
    })),
  };

  return (
    <PageShell
      title="Glossary"
      intro={`Plain-English definitions of ${glossary.length} terms used across crypto, currencies and markets. Where an article explains something in full, the entry links to it.`}
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Letter navigation */}
      <nav aria-label="Jump to letter" className="not-prose sticky top-16 z-20 -mx-2 mb-8 rounded-lg border border-border bg-background/92 px-2 py-2.5 backdrop-blur">
        <ul className="flex flex-wrap gap-1">
          {letters.map((l) => (
            <li key={l}>
              <a
                href={`#letter-${l}`}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-[12.5px] font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="not-prose space-y-10">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-28">
            <h2 className="mb-4 flex items-center gap-3 font-display text-2xl font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background">
                {letter}
              </span>
            </h2>

            <dl className="divide-y divide-border border-t border-border">
              {byLetter.get(letter)!.map((t) => {
                const cat = categories[t.category];
                return (
                  <div key={t.term} id={termSlug(t.term)} className="scroll-mt-28 py-5">
                    <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-[19px] font-semibold">{t.term}</span>
                      {t.also?.length ? (
                        <span className="text-[13px] text-muted-foreground">
                          also: {t.also.join(", ")}
                        </span>
                      ) : null}
                      <Link
                        href={`/category/${t.category}`}
                        className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] transition-opacity hover:opacity-70"
                        style={{ color: cat.accent }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: cat.accent }}
                          aria-hidden
                        />
                        {cat.shortName}
                      </Link>
                    </dt>
                    <dd className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {t.definition}
                      {t.article && (
                        <>
                          {" "}
                          <Link
                            href={`/blog/${t.article}`}
                            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                          >
                            Read more <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </section>
        ))}
      </div>

      <h2 className="mt-14">Missing a term?</h2>
      <p>
        If something you have run into is not here, tell us and we will add it. Email{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a> with the term
        and where you encountered it.
      </p>
    </PageShell>
  );
}
