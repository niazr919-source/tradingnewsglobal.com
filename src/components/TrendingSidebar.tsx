import Link from "next/link";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { getTrendingPosts, getAllTags } from "@/lib/posts";
import { PostCard } from "./PostCard";

export function RiskWarning() {
  return (
    <div className="rounded-xl border border-down/30 bg-down/5 p-4">
      <div className="flex items-center gap-2 text-down">
        <AlertTriangle className="h-4 w-4" />
        <h3 className="text-sm font-bold uppercase tracking-wide">Trading Risk Warning</h3>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        Trading cryptocurrencies, forex and binary options involves substantial risk and may not be
        suitable for all investors. You can lose more than your initial deposit. Content on Trading News Global is
        educational and is not financial advice.
      </p>
    </div>
  );
}

export function TrendingSidebar() {
  const trending = getTrendingPosts(5);
  const tags = getAllTags().slice(0, 12);

  return (
    <aside className="space-y-6">
      <section className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Top Read</h2>
        </div>
        <ol className="space-y-4">
          {trending.map((post, i) => (
            <li key={post.slug} className="flex gap-3">
              <span className="text-lg font-black leading-none text-primary/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <PostCard post={post} variant="compact" className="flex-1" />
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide">Trending Keywords</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag }) => (
            <Link
              key={tag}
              href={`/?q=${encodeURIComponent(tag)}`}
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      <RiskWarning />
    </aside>
  );
}
