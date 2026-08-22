import Link from "next/link";
import { Mail } from "lucide-react";
import type { Post } from "@/lib/posts";
import { getAuthorByName } from "@/lib/authors";
import { AuthorAvatar } from "./AuthorAvatar";

/** Author credit at the foot of an article, linking through to the full profile. */
export function AuthorBox({ post }: { post: Post }) {
  const masthead = getAuthorByName(post.author);

  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5">
      <AuthorAvatar name={post.author} className="h-14 w-14 shrink-0 text-lg" />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Written by
        </p>
        <p className="mt-1 font-display text-lg font-semibold">
          {masthead ? (
            <Link href={`/authors/${masthead.slug}`} className="hover:text-primary">
              {post.author}
            </Link>
          ) : (
            post.author
          )}
        </p>
        <p className="text-[13px] font-medium text-primary">{post.authorRole}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{post.authorBio}</p>
        {masthead && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px]">
            <Link href={`/authors/${masthead.slug}`} className="font-semibold text-primary hover:underline">
              More from this writer
            </Link>
            <a
              href={`mailto:${masthead.email}`}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5" />
              {masthead.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
