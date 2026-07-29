import Link from "next/link";
import { format } from "date-fns";
import { Clock, Flame } from "lucide-react";
import type { Post } from "@/lib/posts";
import { CategoryBadge } from "./CategoryBadge";
import { PostCover } from "./PostCover";

/** Breaking-news hero: 1 large featured post + up to 2 stacked sub-features. */
export function HeroSection({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const [lead, ...rest] = posts;
  const subs = rest.slice(0, 2);

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {/* Lead story */}
      <article className="group relative col-span-1 flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-6 lg:col-span-2 lg:min-h-[420px]">
        <PostCover
          post={lead}
          overlay
          priority
          className="absolute inset-0"
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-down px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-inset ring-white/20">
              <Flame className="h-3 w-3" /> Breaking
            </span>
            <CategoryBadge category={lead.category} asLink={false} />
          </div>
          <h2 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            <Link href={`/blog/${lead.slug}`} className="transition-opacity hover:opacity-90">
              {lead.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">{lead.description}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-white/75">
            <span className="font-medium">{lead.author}</span>
            <span aria-hidden>•</span>
            <time dateTime={lead.date}>{format(new Date(lead.date), "MMM d, yyyy")}</time>
            <span aria-hidden>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {lead.readingTime} min read
            </span>
          </div>
        </div>
      </article>

      {/* Stacked sub-features */}
      <div className="grid grid-cols-1 gap-4">
        {subs.map((post) => (
          <article
            key={post.slug}
            className="group relative flex min-h-[150px] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-5"
          >
            <PostCover post={post} overlay className="absolute inset-0" sizes="(min-width: 1024px) 33vw, 100vw" />
            <div className="relative">
              <CategoryBadge category={post.category} asLink={false} className="mb-2" />
              <h3 className="text-lg font-semibold leading-snug text-white">
                <Link href={`/blog/${post.slug}`} className="transition-opacity hover:opacity-90">
                  {post.title}
                </Link>
              </h3>
              <div className="mt-2 flex items-center gap-2 text-xs text-white/75">
                <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
                <span aria-hidden>•</span>
                <span>{post.readingTime} min</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
