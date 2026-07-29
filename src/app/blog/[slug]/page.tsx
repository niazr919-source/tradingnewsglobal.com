import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Clock, Tag } from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { categories } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";
import {
  buildArticleMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Markdown } from "@/components/Markdown";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButtons } from "@/components/ShareButtons";
import { AuthorBox } from "@/components/AuthorBox";
import { RelatedNews } from "@/components/RelatedNews";
import { AdSlot } from "@/components/AdSlot";
import { PostCover } from "@/components/PostCover";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildArticleMetadata(post);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = categories[post.category];
  const related = getRelatedPosts(post, 3);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const articleJsonLd = buildArticleJsonLd(post);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(post);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link href={`/category/${cat.slug}`} className="hover:text-primary">
          {cat.name}
        </Link>{" "}
        / <span className="text-foreground">{post.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Main column */}
        <div className="min-w-0">
          <header>
            <CategoryBadge category={post.category} className="mb-3" />
            <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{post.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-y border-border py-3">
              <ShareButtons url={url} title={post.title} />
            </div>
          </header>

          {/* Hero cover */}
          <PostCover
            post={post}
            priority
            className="mt-6 aspect-[16/9] w-full rounded-xl sm:aspect-[2/1]"
            sizes="(min-width: 1024px) 800px, 100vw"
          />

          {/* Mobile TOC */}
          <div className="mt-6 lg:hidden">
            <TableOfContents content={post.content} />
          </div>

          {/* Article body */}
          <div className="mt-8">
            <Markdown>{post.content}</Markdown>
          </div>

          {/* In-article ad */}
          <AdSlot label="Advertisement" className="my-8" />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Author */}
          <div className="mt-8">
            <AuthorBox post={post} />
          </div>

          <RelatedNews posts={related} />
        </div>

        {/* Sticky sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-6">
            <TableOfContents content={post.content} />
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide">Share this article</h2>
              <ShareButtons url={url} title={post.title} />
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
