import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getAllPosts, getFeaturedPosts, getPostsByCategory } from "@/lib/posts";
import { categoryList } from "@/lib/categories";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { HeroSection } from "@/components/HeroSection";
import { PostCard } from "@/components/PostCard";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import { AdSlot } from "@/components/AdSlot";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = getFeaturedPosts(3);
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const latest = getAllPosts().filter((p) => !featuredSlugs.has(p.slug));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Latest from ${siteConfig.name}`,
    itemListElement: getAllPosts()
      .slice(0, 10)
      .map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/blog/${post.slug}`),
        name: post.title,
      })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <HeroSection posts={featured} />

      <hr className="my-10 border-border lg:my-12" />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Main column */}
        <div className="lg:col-span-8">
          <SectionHeading title="Latest" href="/archive" linkLabel="All articles" />
          <div className="mt-5 divide-y divide-border">
            {latest.slice(0, 6).map((post, i) => (
              <div key={post.slug} className="py-6 first:pt-0">
                <PostCard post={post} variant="river" priority={i === 0} />
              </div>
            ))}
          </div>

          <AdSlot label="Advertisement" className="my-8" />

          {/* One strip per section */}
          {categoryList.map((cat) => {
            const posts = getPostsByCategory(cat.slug).slice(0, 3);
            if (posts.length === 0) return null;
            return (
              <section key={cat.slug} className="mt-12">
                <SectionHeading
                  title={cat.name}
                  eyebrow={cat.tagline}
                  accent={cat.accent}
                  href={`/category/${cat.slug}`}
                  linkLabel={`More ${cat.shortName.toLowerCase()}`}
                />
                <div className="mt-5 grid gap-7 sm:grid-cols-3">
                  {posts.map((post) => (
                    <PostCard key={post.slug} post={post} showExcerpt={false} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Right rail */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-20 space-y-8">
            <TrendingSidebar />
            <AdSlot label="Advertisement" className="min-h-60" />
          </div>
        </div>
      </div>

      {/* Explainer block — tells a reviewer (and a reader) what this site is */}
      <section className="mt-16 rounded-xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
          What {siteConfig.name} is for
        </h2>
        <div className="mt-4 grid gap-6 text-[14.5px] leading-relaxed text-muted-foreground sm:grid-cols-3">
          <p>
            Financial coverage aimed at people who want to <strong className="text-foreground">understand
            the mechanism</strong>, not receive a signal. Every explainer sets out how something actually
            works before it discusses what it might mean.
          </p>
          <p>
            We publish <strong className="text-foreground">no trading signals, no broker referrals and no
            affiliate links</strong>. Where a product loses money for most retail traders, we say so and
            cite the regulator&apos;s own figures.
          </p>
          <p>
            Every article carries a named writer, a publication date and its sources. Read our{" "}
            <Link href="/editorial-policy" className="font-medium text-foreground underline underline-offset-2">
              editorial policy
            </Link>{" "}
            for how we correct mistakes.
          </p>
        </div>
        <Link
          href="/about"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          About the newsroom <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
