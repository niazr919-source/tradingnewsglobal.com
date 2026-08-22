import Link from "next/link";
import type { Post } from "@/lib/posts";
import { CategoryBadge } from "./CategoryBadge";
import { PostCover } from "./PostCover";
import { PostMeta } from "./PostCard";

/**
 * Front-page lead: one dominant story with a cover, two supporting stories
 * stacked beside it. Deliberately typographic rather than image-heavy — this is
 * a publication, not a card wall.
 */
export function HeroSection({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const [lead, ...rest] = posts;
  const subs = rest.slice(0, 2);

  return (
    <section aria-label="Top stories" className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Lead */}
      <article className="group lg:col-span-8">
        <Link href={`/blog/${lead.slug}`} tabIndex={-1} aria-hidden>
          <PostCover
            post={lead}
            priority
            className="aspect-[16/9] w-full rounded-xl"
            sizes="(min-width: 1024px) 62vw, 100vw"
          />
        </Link>
        <div className="mt-4">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <CategoryBadge category={lead.category} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              Top story
            </span>
          </div>
          <h2 className="font-display text-[28px] font-semibold leading-[1.14] tracking-[-0.02em] sm:text-[38px]">
            <Link href={`/blog/${lead.slug}`} className="transition-colors group-hover:text-primary">
              {lead.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">
            {lead.description}
          </p>
          <PostMeta post={lead} className="mt-4" />
        </div>
      </article>

      {/* Supporting */}
      <div className="lg:col-span-4">
        <h2 className="mb-4 border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Also this week
        </h2>
        <div className="divide-y divide-border">
          {subs.map((post) => (
            <div key={post.slug} className="py-4 first:pt-0 last:pb-0">
              <ArticleTeaser post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleTeaser({ post }: { post: Post }) {
  return (
    <article className="group">
      <CategoryBadge category={post.category} className="mb-2" />
      <h3 className="font-display text-[19px] font-semibold leading-[1.22]">
        <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-primary">
          {post.title}
        </Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
        {post.description}
      </p>
      <PostMeta post={post} className="mt-2.5" />
    </article>
  );
}
