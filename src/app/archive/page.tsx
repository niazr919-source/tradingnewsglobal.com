import type { Metadata } from "next";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Article archive",
  description: `Every article published by ${siteConfig.name}, newest first — crypto, forex, markets and trading education.`,
  alternates: { canonical: "/archive" },
};

export default function ArchivePage() {
  const posts = getAllPosts();

  // Group by month so a long list stays scannable.
  const groups = new Map<string, typeof posts>();
  for (const post of posts) {
    const key = format(new Date(post.date), "MMMM yyyy");
    const bucket = groups.get(key);
    if (bucket) bucket.push(post);
    else groups.set(key, [post]);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Archive" }]} />

      <header className="mt-4 border-b border-border pb-6">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.025em]">Archive</h1>
        <p className="mt-2 text-[15px] text-muted-foreground">
          Everything we have published, newest first — {posts.length} articles.
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {[...groups.entries()].map(([month, monthPosts]) => (
          <section key={month}>
            <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {month}
            </h2>
            <div className="divide-y divide-border border-t border-border">
              {monthPosts.map((post) => (
                <div key={post.slug} className="py-5">
                  <PostCard post={post} variant="minimal" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
