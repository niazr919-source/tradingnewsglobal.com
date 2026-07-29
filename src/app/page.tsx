import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, getFeaturedPosts, getPostsByCategory } from "@/lib/posts";
import { categoryList } from "@/lib/categories";
import { HeroSection } from "@/components/HeroSection";
import { PostCard } from "@/components/PostCard";
import { TabbedFeed, type FeedTab } from "@/components/TabbedFeed";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import { AdSlot } from "@/components/AdSlot";

export default function Home() {
  const featured = getFeaturedPosts(3);
  const latest = getAllPosts();

  const feedGrid = (posts: typeof latest) => (
    <div className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );

  const tabs: FeedTab[] = [
    { slug: "latest", label: "Latest", content: feedGrid(latest.slice(0, 8)) },
    ...categoryList.map((cat) => ({
      slug: cat.slug,
      label: cat.shortName,
      content: feedGrid(getPostsByCategory(cat.slug)),
    })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <HeroSection posts={featured} />

      {/* Category cards */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {categoryList.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg hover:shadow-black/5"
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(120% 120% at 100% 0%, ${cat.accent}22 0%, transparent 60%)`,
              }}
            />
            <div className="relative">
              <h3 className="text-lg font-bold tracking-tight">{cat.name}</h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{cat.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Feed + sidebar */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-5 text-xl font-bold tracking-tight">Newsroom</h2>
          <TabbedFeed tabs={tabs} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <AdSlot label="Sponsored" className="min-h-60" />
          <TrendingSidebar />
        </div>
      </div>
    </div>
  );
}
