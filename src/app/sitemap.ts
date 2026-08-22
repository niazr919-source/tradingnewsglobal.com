import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { categoryList } from "@/lib/categories";
import { authors } from "@/lib/authors";
import { absoluteUrl } from "@/lib/site";

// Required by `output: "export"` — emits a static sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newest = posts[0] ? new Date(posts[0].date) : new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: newest, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/archive"), lastModified: newest, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/authors"), lastModified: newest, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/about"), lastModified: newest, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/editorial-policy"), lastModified: newest, changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/contact"), lastModified: newest, changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), lastModified: newest, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/cookies"), lastModified: newest, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: newest, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/disclaimer"), lastModified: newest, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categoryList.map((cat) => ({
    url: absoluteUrl(`/category/${cat.slug}`),
    lastModified: newest,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authors.map((a) => ({
    url: absoluteUrl(`/authors/${a.slug}`),
    lastModified: newest,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...authorRoutes, ...postRoutes];
}
