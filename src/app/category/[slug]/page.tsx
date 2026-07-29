import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories, categoryList, getCategory, isCategorySlug } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import { absoluteUrl } from "@/lib/site";

const PAGE_SIZE = 6;

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
    description: cat.description,
    keywords: cat.keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description: cat.description,
      images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: cat.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cat.description,
      images: ["/og-default.svg"],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  if (!isCategorySlug(slug)) notFound();
  const cat = categories[slug];

  const all = getPostsByCategory(slug);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const posts = all.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Category header */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-card p-8"
        style={{
          background: `radial-gradient(120% 120% at 0% 0%, ${cat.accent}22 0%, transparent 55%)`,
        }}
      >
        <nav className="mb-3 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{" "}
          / <span className="text-foreground">{cat.name}</span>
        </nav>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{cat.name}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{cat.description}</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {posts.length === 0 ? (
            <p className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
              No articles in this category yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <PaginationLink
                slug={slug}
                page={page - 1}
                disabled={page <= 1}
                direction="prev"
              />
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <PaginationLink
                slug={slug}
                page={page + 1}
                disabled={page >= totalPages}
                direction="next"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <TrendingSidebar />
        </div>
      </div>
    </div>
  );
}

function PaginationLink({
  slug,
  page,
  disabled,
  direction,
}: {
  slug: string;
  page: number;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  const base =
    "inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors";
  if (disabled) {
    return (
      <span className={`${base} cursor-not-allowed text-muted-foreground opacity-50`}>
        {direction === "prev" ? (
          <>
            <ChevronLeft className="h-4 w-4" /> Previous
          </>
        ) : (
          <>
            Next <ChevronRight className="h-4 w-4" />
          </>
        )}
      </span>
    );
  }
  return (
    <Link href={`/category/${slug}?page=${page}`} className={`${base} hover:border-primary/40 hover:text-primary`}>
      {direction === "prev" ? (
        <>
          <ChevronLeft className="h-4 w-4" /> Previous
        </>
      ) : (
        <>
          Next <ChevronRight className="h-4 w-4" />
        </>
      )}
    </Link>
  );
}
