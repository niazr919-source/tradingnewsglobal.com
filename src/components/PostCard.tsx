import Link from "next/link";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import type { Post } from "@/lib/posts";
import { CategoryBadge } from "./CategoryBadge";
import { PostCover } from "./PostCover";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
  priority?: boolean;
}

export function PostCard({ post, variant = "default", className, priority }: PostCardProps) {
  const href = `/blog/${post.slug}`;

  if (variant === "compact") {
    return (
      <article className={cn("group flex gap-3", className)}>
        <PostCover post={post} className="h-16 w-20 shrink-0 rounded-lg" sizes="80px" />
        <div className="min-w-0">
          <CategoryBadge category={post.category} className="mb-1" />
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
            <Link href={href} className="transition-colors group-hover:text-primary">
              {post.title}
            </Link>
          </h3>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article
        className={cn(
          "group flex flex-col overflow-hidden rounded-xl border border-border bg-card sm:flex-row",
          className
        )}
      >
        <PostCover
          post={post}
          className="h-40 w-full sm:h-auto sm:w-48 sm:shrink-0"
          sizes="(min-width: 640px) 192px, 100vw"
        />
        <div className="flex flex-1 flex-col p-4">
          <CategoryBadge category={post.category} className="mb-2 self-start" />
          <h3 className="text-lg font-semibold leading-snug">
            <Link href={href} className="transition-colors group-hover:text-primary">
              {post.title}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
          <PostMeta post={post} className="mt-auto pt-3" />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-black/5",
        className
      )}
    >
      <PostCover post={post} className="aspect-[16/9] w-full" priority={priority} />
      <div className="flex flex-1 flex-col p-4">
        <CategoryBadge category={post.category} className="mb-2 self-start" />
        <h3 className="text-base font-semibold leading-snug">
          <Link href={href} className="transition-colors group-hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
        <PostMeta post={post} className="mt-auto pt-3" />
      </div>
    </article>
  );
}

export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}>
      <span className="font-medium text-foreground/80">{post.author}</span>
      <span aria-hidden>•</span>
      <time dateTime={post.date}>{format(new Date(post.date), "MMM d, yyyy")}</time>
      <span aria-hidden>•</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {post.readingTime} min
      </span>
    </div>
  );
}
