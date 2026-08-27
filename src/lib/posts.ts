import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CategorySlug, isCategorySlug } from "./categories";
import { newsroom } from "./newsroom";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostSource {
  label: string;
  href: string;
}

export interface PostFaq {
  q: string;
  a: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  /** Shorter title for the <title> tag; falls back to `title`. */
  seoTitle?: string;
  /** Shorter meta description; falls back to `description`. */
  seoDescription?: string;
  category: CategorySlug;
  /** Byline. Defaults to the newsroom masthead. */
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
  wordCount: number;
  /** External references shown at the foot of the article. */
  sources: PostSource[];
  /** Rendered as an FAQ block and as FAQPage JSON-LD. */
  faq: PostFaq[];
  /** Answer-first summary shown above the article and used as schema abstract. */
  takeaways: string[];
  content: string; // raw markdown/mdx body
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function calcReadingTime(words: number): number {
  return Math.max(1, Math.round(words / 200));
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v));
  if (typeof value === "string") return value.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function toSources(value: unknown): PostSource[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const { label, href } = item as Record<string, unknown>;
      if (!label || !href) return null;
      return { label: String(label), href: String(href) };
    })
    .filter((s): s is PostSource => s !== null);
}

function toFaq(value: unknown): PostFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const { q, a } = item as Record<string, unknown>;
      if (!q || !a) return null;
      return { q: String(q), a: String(a) };
    })
    .filter((f): f is PostFaq => f !== null);
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

  const authorName = String(data.author ?? newsroom.byline).trim() || newsroom.byline;
  const words = countWords(content);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
    category,
    author: authorName,
    authorRole: String(data.authorRole ?? newsroom.role),
    authorBio: String(data.authorBio ?? newsroom.bio),
    date: new Date(data.date ?? Date.now()).toISOString(),
    updated: data.updated ? new Date(data.updated).toISOString() : undefined,
    tags: toStringArray(data.tags),
    keywords: toStringArray(data.keywords).length ? toStringArray(data.keywords) : toStringArray(data.tags),
    image: data.image ? String(data.image) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
    featured: Boolean(data.featured),
    trending: Boolean(data.trending),
    readingTime: calcReadingTime(words),
    wordCount: words,
    sources: toSources(data.sources),
    faq: toFaq(data.faq),
    takeaways: toStringArray(data.takeaways),
    content,
  };
}

let cache: Post[] | null = null;

// Only memoize in production builds. In dev the cache would hide edits to MDX
// files until the server restarted.
const shouldCache = process.env.NODE_ENV === "production";

/** All posts sorted newest first. Memoized at build time. */
export function getAllPosts(): Post[] {
  if (shouldCache && cache) return cache;
  if (!fs.existsSync(POSTS_DIR)) return [];
  cache = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map(parseFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return cache;
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
  const pool = featured.length >= limit ? featured : [...featured, ...all.filter((p) => !p.featured)];
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
