import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "./site";
import { categories } from "./categories";
import type { Post } from "./posts";

/** Default OpenGraph image path served from /public (SVG placeholder). */
const DEFAULT_OG = "/og-default.svg";

function ogImage(image?: string) {
  const src = image || DEFAULT_OG;
  return src.startsWith("http") ? src : absoluteUrl(src);
}

/** Build full page metadata for a single article. */
export function buildArticleMetadata(post: Post): Metadata {
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const cat = categories[post.category];
  const title = `${post.title} | ${siteConfig.name}`;

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords, ...cat.keywords],
    authors: [{ name: post.author }],
    category: cat.name,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description: post.description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      section: cat.name,
      tags: post.tags,
      images: [{ url: ogImage(post.image), width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      creator: siteConfig.twitter,
      title,
      description: post.description,
      images: [ogImage(post.image)],
    },
  };
}

/** NewsArticle JSON-LD structured data for an article page. */
export function buildArticleJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.description,
    image: [ogImage(post.image)],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    articleSection: categories[post.category].name,
    keywords: [...post.keywords, ...post.tags].join(", "),
    wordCount: post.content.trim().split(/\s+/).length,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.svg"),
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

/** Breadcrumb JSON-LD for an article. */
export function buildBreadcrumbJsonLd(post: Post) {
  const cat = categories[post.category];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: cat.name, item: absoluteUrl(`/category/${cat.slug}`) },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };
}
