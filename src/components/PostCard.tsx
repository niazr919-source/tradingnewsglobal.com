import Link from "next/link";
import { Clock } from "lucide-react";
import type { Post } from "@/lib/posts";
import { CategoryBadge } from "./CategoryBadge";
import { PostCover } from "./PostCover";
import { PostDate } from "./PostDate";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact" | "river" | "minimal";
  className?: string;
  priority?: boolean;
  showExcerpt?: boolean;
}

export function PostCard({
  post,
  variant = "default",
  className,
  priority,
  showExcerpt = true,
}: PostCardProps) {
  const href = `/blog/${post.slug}`;

  /* Sidebar / related list item — thumbnail beside a tight headline */
  if (variant === "compact") {
    return (
      <article className={cn("group flex gap-3", className)}>
        <PostCover post={post} className="h-16 w-[4.5rem] shrink-0 rounded-md" sizes="72px" />
        <div className="min-w-0">
          <CategoryBadge category={post.category} className="mb-1" />
          <h3 className="font-display text-[15px] font-semibold leading-[1.25]">
            <Link href={href} className="transition-colors group-hover:text-primary">
              {post.title}
            </Link>
          </h3>
          <PostMeta post={post} className="mt-1" hideAuthor />
        </div>
      </article>
    );
  }

  /* Headline-only list item, no image */
  if (variant === "minimal") {
    return (
      <article className={cn("group", className)}>
        <CategoryBadge category={post.category} className="mb-1.5" />
        <h3 className="font-display text-[17px] font-semibold leading-[1.28]">
          <Link href={href} className="transition-colors group-hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <PostMeta post={post} className="mt-1.5" />
      </article>
    );
  }

  /* The "river": wide row used down the main column of archives */
  if (variant === "river") {
    return (
      <article className={cn("group grid gap-4 sm:grid-cols-[1fr_13rem]", className)}>
        <div className="min-w-0 order-2 sm:order-1">
          <CategoryBadge category={post.category} className="mb-2" />
          <h3 className="font-display text-xl font-semibold leading-[1.24] sm:text-[22px]">
            <Link href={href} className="transition-colors group-hover:text-primary">
              {post.title}
            </Link>
          </h3>
          {showExcerpt && (
            <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          )}
          <PostMeta post={post} className="mt-3" />
        </div>
        <Link href={href} className="order-1 sm:order-2" tabIndex={-1} aria-hidden>
          <PostCover
            post={post}
            priority={priority}
            className="aspect-[16/10] w-full rounded-lg sm:aspect-[4/3]"
            sizes="(min-width: 640px) 208px, 100vw"
          />
        </Link>
      </article>
    );
  }

  /* Default grid card */
  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={href} tabIndex={-1} aria-hidden>
        <PostCover
          post={post}
          className="aspect-[16/10] w-full rounded-lg"
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-3">
        <CategoryBadge category={post.category} className="mb-1.5 self-start" />
        <h3 className="font-display text-[17px] font-semibold leading-[1.26]">
          <Link href={href} className="transition-colors group-hover:text-primary">
            {post.title}
          </Link>
        </h3>
        {showExcerpt && (
          <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        )}
        <PostMeta post={post} className="mt-auto pt-3" />
      </div>
    </article>
  );
}

export function PostMeta({
  post,
  className,
  hideAuthor = false,
}: {
  post: Post;
  className?: string;
  hideAuthor?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] text-muted-foreground", className)}>
      {!hideAuthor && (
        <>
          <Link
            href="/newsroom"
            className="font-medium text-foreground/75 transition-colors hover:text-primary"
          >
            {post.author}
          </Link>
          <span aria-hidden>·</span>
        </>
      )}
      <PostDate date={post.date} />
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {post.readingTime} min
      </span>
    </div>
  );
}
