import { getAllPosts } from "@/lib/posts";
import { categories } from "@/lib/categories";
import { siteConfig, absoluteUrl } from "@/lib/site";

// Rendered to a static file at build time, like robots.txt and sitemap.xml.
export const dynamic = "force-static";

/** Escape the five characters that are not legal as raw text in XML. */
function xml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed.
 *
 * Feed readers, news aggregators and syndication partners all consume this, and
 * it gives crawlers a second, date-ordered discovery path alongside the sitemap.
 */
export function GET() {
  const posts = getAllPosts().slice(0, 30);
  const home = absoluteUrl("/");
  const self = `${siteConfig.url}/feed.xml`;
  const updated = posts[0] ? new Date(posts[0].date) : new Date();

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const cat = categories[post.category];
      return `    <item>
      <title>${xml(post.title)}</title>
      <link>${xml(url)}</link>
      <guid isPermaLink="true">${xml(url)}</guid>
      <description>${xml(post.description)}</description>
      <category>${xml(cat.name)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(siteConfig.name)}</title>
    <link>${xml(home)}</link>
    <description>${xml(siteConfig.description)}</description>
    <language>en</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
    <atom:link href="${xml(self)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
