import type { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";

export function RelatedNews({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-14">
      <h2 className="border-b border-border pb-2.5 font-display text-xl font-semibold tracking-[-0.015em]">
        Related reading
      </h2>
      <div className="mt-6 grid gap-7 sm:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} showExcerpt={false} />
        ))}
      </div>
    </section>
  );
}
