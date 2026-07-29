import type { Post } from "@/lib/posts";

/** Author bio card shown at the foot of an article. */
export function AuthorBox({ post }: { post: Post }) {
  const initials = post.author
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
        {initials}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Written by
        </p>
        <p className="text-base font-bold">{post.author}</p>
        <p className="text-sm font-medium text-primary">{post.authorRole}</p>
        <p className="mt-2 text-sm text-muted-foreground">{post.authorBio}</p>
      </div>
    </div>
  );
}
