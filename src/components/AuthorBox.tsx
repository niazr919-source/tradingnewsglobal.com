import Link from "next/link";
import { Mail } from "lucide-react";
import type { Post } from "@/lib/posts";
import { newsroom } from "@/lib/newsroom";
import { editor, getPerson } from "@/lib/people";
import { Wordmark } from "./Wordmark";

/**
 * Author and editor credit at the foot of an article.
 *
 * Both are named, both have a profile page, and both have an address that
 * reaches them. That is what makes a byline checkable rather than decorative.
 */
export function AuthorBox({ post }: { post: Post }) {
  const author = getPerson(post.author);
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Written by
      </p>
      {author ? (
        <>
          <Link
            href={`/newsroom/${author.slug}`}
            className="mt-2 block font-display text-lg font-semibold hover:text-primary"
          >
            {author.name}
          </Link>
          <p className="text-[12.5px] text-muted-foreground">{author.role}</p>
        </>
      ) : (
        <Wordmark className="mt-2 text-lg" />
      )}
      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{post.authorBio}</p>
      <p className="mt-3 border-t border-border pt-3 text-[13px] text-muted-foreground">
        Edited by{" "}
        <Link href={`/newsroom/${editor.slug}`} className="font-medium text-primary hover:underline">
          {editor.name}
        </Link>
        , who reads every article against the{" "}
        <Link href="/editorial-policy" className="hover:text-foreground">
          editorial policy
        </Link>{" "}
        before it is published.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]">
        <Link href="/newsroom" className="font-semibold text-primary hover:underline">
          About the newsroom
        </Link>
        <Link href="/editorial-policy" className="text-muted-foreground hover:text-foreground">
          Editorial policy
        </Link>
        <a
          href={`mailto:${newsroom.correctionsEmail}`}
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <Mail className="h-3.5 w-3.5" />
          Report a correction
        </a>
      </div>
    </div>
  );
}
