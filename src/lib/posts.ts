import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CategorySlug, isCategorySlug } from "./categories";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface Post {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  author: string;
  authorRole: string;
  authorBio: string;
  date: string; // ISO string
  updated?: string;
  tags: string[];
  keywords: string[];
  image?: string;
  cover?: string;
  featured: boolean;
  trending: boolean;
  readingTime: number; // minutes
  content: string; // raw markdown/mdx body
}

function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v));
  if (typeof value === "string") return value.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function parseFile(fileName: string): Post | null {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const category = String(data.category ?? "");
  if (!isCategorySlug(category)) {
    // Skip content with an unknown category rather than crash the build.
    return null;
  }

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    category,
    author: String(data.author ?? "Trading News Global Newsroom"),
    authorRole: String(data.authorRole ?? "Markets Desk"),
    authorBio: String(
      data.authorBio ??
        "Part of the Trading News Global editorial team covering global markets, macro trends and trading strategy."
    ),
    date: new Date(data.date ?? Date.now()).toISOString(),
    updated: data.updated ? new Date(data.updated).toISOString() : undefined,
    tags: toStringArray(data.tags),
    keywords: toStringArray(data.keywords).length ? toStringArray(data.keywords) : toStringArray(data.tags),
    image: data.image ? String(data.image) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    featured: Boolean(data.featured),
    trending: Boolean(data.trending),
    readingTime: calcReadingTime(content),
    content,
  };
}

/** All posts sorted newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map(parseFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPosts(limit = 3): Post[] {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured);
  const pool = featured.length >= limit ? featured : all;
  return pool.slice(0, limit);
}

export function getTrendingPosts(limit = 5): Post[] {
  const all = getAllPosts();
  const trending = all.filter((p) => p.trending);
  return (trending.length ? trending : all).slice(0, limit);
}

/** Posts related by shared category / tags, excluding the current post. */
export function getRelatedPosts(current: Post, limit = 3): Post[] {
  const scored = getAllPosts()
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      let score = p.category === current.category ? 2 : 0;
      score += p.tags.filter((t) => current.tags.includes(t)).length;
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score || +new Date(b.post.date) - +new Date(a.post.date));
  return scored.slice(0, limit).map((s) => s.post);
}

/** Aggregate tag frequency across all posts (for trending keyword clouds). */
export function getAllTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
