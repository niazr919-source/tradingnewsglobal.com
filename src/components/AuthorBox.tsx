import Link from "next/link";
import { Mail } from "lucide-react";
import type { Post } from "@/lib/posts";
import { newsroom } from "@/lib/newsroom";
import { Wordmark } from "./Wordmark";

/**
 * Publication credit at the foot of an article.
 *
 * Articles run under the masthead, so this credits the newsroom and points at
 * the pages that say who is accountable and how to correct the piece.
 */
export function AuthorBox({ post }: { post: Post }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Published by
      </p>
      <Wordmark className="mt-2 text-lg" />
      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{post.authorBio}</p>
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
