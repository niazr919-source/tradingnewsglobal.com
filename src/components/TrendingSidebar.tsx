import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { getTrendingPosts } from "@/lib/posts";
import { categoryList } from "@/lib/categories";
import { PostCard } from "./PostCard";

export function RiskWarning({ compact = false }: { compact?: boolean }) {
  return (
    <section className="rounded-lg border border-border border-l-[3px] border-l-down bg-down/5 p-4">
      <div className="flex items-center gap-2 text-down">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em]">Risk warning</h2>
      </div>
      <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
        Trading cryptocurrencies, forex and leveraged derivatives involves substantial risk of loss and is
        not suitable for every investor. Our content is journalism and education — never personalised
        financial advice.
        {!compact && (
          <>
            {" "}
            <Link href="/disclaimer" className="font-medium text-foreground underline underline-offset-2">
              Full disclaimer
            </Link>
            .
          </>
        )}
      </p>
    </section>
  );
}

/** Right rail: most-read list, section index and the standing risk notice. */
export function TrendingSidebar({ excludeSlug }: { excludeSlug?: string } = {}) {
  const trending = getTrendingPosts(6).filter((p) => p.slug !== excludeSlug).slice(0, 5);

  return (
    <aside className="space-y-8">
      <section>
        <h2 className="mb-4 border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Most read
        </h2>
        <ol className="space-y-4">
          {trending.map((post, i) => (
            <li key={post.slug} className="flex gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
              <span className="tabular w-6 shrink-0 text-lg font-semibold leading-none text-border-strong">
                {i + 1}
              </span>
              <PostCard post={post} variant="compact" className="flex-1" />
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-4 border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Sections
        </h2>
        <ul className="space-y-3">
          {categoryList.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/category/${cat.slug}`} className="group block">
                <span className="flex items-center gap-2 font-display text-[15px] font-semibold transition-colors group-hover:text-primary">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: cat.accent }} />
                  {cat.name}
                </span>
                <span className="mt-0.5 block pl-3.5 text-[12.5px] text-muted-foreground">
                  {cat.tagline}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RiskWarning />
    </aside>
  );
}
