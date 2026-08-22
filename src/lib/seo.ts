import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "./site";
import { categories } from "./categories";
import { newsroom } from "./newsroom";
import type { Post } from "./posts";

/** Default OpenGraph image path served from /public. */
const DEFAULT_OG = "/og-default.svg";

function ogImage(image?: string) {
  const src = image || DEFAULT_OG;
  return src.startsWith("http") ? src : `${siteConfig.url}${src}`;
}

/** Build full page metadata for a single article. */
export function buildArticleMetadata(post: Post): Metadata {
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const cat = categories[post.category];
  const title = `${post.title} | ${siteConfig.name}`;
  const cover = ogImage(post.cover ?? post.image);

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords, ...cat.keywords],
    authors: [{ name: post.author, url: absoluteUrl("/newsroom") }],
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
      images: [{ url: cover, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [cover],
    },
  };
}

/**
 * Article structured data.
 *
 * Uses `Article` rather than `NewsArticle` for evergreen explainers — Google
 * treats NewsArticle as time-sensitive reporting, and mislabelling every
 * explainer as breaking news is the kind of mismatch that costs rich results.
 */
export function buildArticleJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const cat = categories[post.category];
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.slice(0, 110),
    description: post.description,
    image: [ogImage(post.cover ?? post.image)],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    articleSection: cat.name,
    keywords: [...post.keywords, ...post.tags].join(", "),
    wordCount: post.wordCount,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    // Published under the masthead, so the author IS the organisation. Naming a
    // Person here who does not exist would be structured data that lies.
    author: {
      "@type": "Organization",
      name: post.author,
      url: absoluteUrl("/newsroom"),
      email: newsroom.email,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.publisher,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.svg") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(post.sources.length > 0 && {
      citation: post.sources.map((s) => ({
        "@type": "CreativeWork",
        name: s.label,
        url: s.href,
      })),
    }),
  };
}

/** Breadcrumb JSON-LD for an article. */
export function buildBreadcrumbJsonLd(post: Post) {
  const cat = categories[post.category];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: cat.name, item: absoluteUrl(`/category/${cat.slug}`) },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };
}

/** FAQPage JSON-LD — only emitted when the article actually shows an FAQ block. */
export function buildFaqJsonLd(post: Post) {
  if (post.faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
