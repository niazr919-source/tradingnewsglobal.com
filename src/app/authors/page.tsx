import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { authors } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/posts";
import { categories } from "@/lib/categories";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our writers",
  description: `The people who write for ${siteConfig.name} — who they are, what they cover and how to reach them.`,
  alternates: { canonical: "/authors" },
};

export default function AuthorsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Our writers" }]} />

      <header className="mt-4 border-b border-border pb-6">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.025em]">Our writers</h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Every article on {siteConfig.name} carries a named byline. These are the people behind them,
          what they cover, and how to contact them directly with a correction or a question.
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {authors.map((author) => {
          const count = getPostsByAuthor(author.slug).length;
          return (
            <article
              key={author.slug}
              className="flex flex-col gap-5 border-b border-border pb-10 last:border-0 sm:flex-row"
            >
              <AuthorAvatar name={author.name} className="h-20 w-20 shrink-0 text-2xl" />
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                  <Link href={`/authors/${author.slug}`} className="hover:text-primary">
                    {author.name}
                  </Link>
                </h2>
                <p className="mt-0.5 text-sm font-medium text-primary">{author.role}</p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{author.bio}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {author.beats.map((beat) => (
                    <Link
                      key={beat}
                      href={`/category/${beat}`}
                      className="rounded-full border border-border px-2.5 py-0.5 text-[11.5px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {categories[beat].name}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
                  <Link href={`/authors/${author.slug}`} className="font-semibold text-primary hover:underline">
                    Read {count} {count === 1 ? "article" : "articles"}
                  </Link>
                  <a
                    href={`mailto:${author.email}`}
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {author.email}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
