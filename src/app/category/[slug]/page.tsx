import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { categories, categoryList, getCategory, isCategorySlug } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return categoryList.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};

  const canonical = absoluteUrl(`/category/${cat.slug}`);
  const title = `${cat.name} News & Analysis`;
  return {
    title,
    description: cat.metaDescription,
    keywords: cat.keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${title} | ${siteConfig.name}`,
      description: cat.metaDescription,
      siteName: siteConfig.name,
      images: [{ url: "/og-default.png", width: 1200, height: 630, alt: cat.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cat.metaDescription,
      images: ["/og-default.png"],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isCategorySlug(slug)) notFound();

  const cat = categories[slug];
  const posts = getPostsByCategory(slug);
  const [lead, ...rest] = posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.name} — ${siteConfig.name}`,
    description: cat.description,
    url: absoluteUrl(`/category/${cat.slug}`),
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: absoluteUrl("/") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/blog/${p.slug}`),
        name: p.title,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: cat.name }]} />

      {/* Section masthead */}
      <header className="mt-4 border-b-2 pb-6" style={{ borderColor: cat.accent }}>
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: cat.accent }}
        >
          Section
        </p>
        <h1 className="mt-1.5 font-display text-4xl font-semibold tracking-[-0.025em] sm:text-5xl">
          {cat.name}
        </h1>
        <p className="mt-3 max-w-3xl text-[15.5px] leading-relaxed text-muted-foreground">
          {cat.description}
        </p>
        <p className="mt-3 text-[12.5px] text-muted-foreground">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
      </header>

      {/* Standing notice for the high-risk section */}
      {cat.notice && (
        <div className="mt-6 flex gap-3 rounded-lg border border-border border-l-[3px] border-l-down bg-down/5 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-down" />
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {cat.notice}{" "}
            <Link href="/disclaimer" className="font-medium text-foreground underline underline-offset-2">
              Read the full risk disclaimer
            </Link>
            .
          </p>
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          {posts.length === 0 ? (
            <p className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
              No articles in this section yet.
            </p>
          ) : (
            <>
              {/* Lead article gets the larger treatment */}
              <PostCard post={lead} priority className="mb-8" />
              <div className="divide-y divide-border border-t border-border">
                {rest.map((post) => (
                  <div key={post.slug} className="py-6">
                    <PostCard post={post} variant="river" />
                  </div>
                ))}
              </div>
            </>
          )}

          <AdSlot label="Advertisement" className="mt-10" />
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-20">
            <TrendingSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
