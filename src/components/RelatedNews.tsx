import { Newspaper } from "lucide-react";
import type { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";

export function RelatedNews({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold tracking-tight">Related News</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
