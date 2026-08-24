import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ExternalLink } from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { categories } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";
import { addInternalLinks } from "@/lib/internal-links";
import {
  buildArticleMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/seo";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Markdown } from "@/components/Markdown";
import { TableOfContents } from "@/components/TableOfContents";
import { ShareButtons } from "@/components/ShareButtons";
import { AuthorBox } from "@/components/AuthorBox";
import { RelatedNews } from "@/components/RelatedNews";
import { AdSlot } from "@/components/AdSlot";
import { PostCover } from "@/components/PostCover";
import { PostDate } from "@/components/PostDate";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RiskWarning } from "@/components/TrendingSidebar";

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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = categories[post.category];
  const related = getRelatedPosts(post, 3);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const faqJsonLd = buildFaqJsonLd(post);
  const wasUpdated = post.updated && post.updated !== post.date;

  // Contextual links are injected at render rather than written into the MDX,
  // so the mapping stays in one place and new articles wire themselves up.
  const body = addInternalLinks(post.content, post.slug);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(post)) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: cat.name, href: `/category/${cat.slug}` },
          { label: post.title },
        ]}
      />

      <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
        {/* Main column */}
        <div className="min-w-0">
          <header className="mx-auto max-w-[46rem]">
            <CategoryBadge category={post.category} className="mb-3" />
            <h1 className="font-display text-[32px] font-semibold leading-[1.13] tracking-[-0.025em] sm:text-[44px]">
              {post.title}
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{post.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-border py-3 text-[13px] text-muted-foreground">
              <Link href="/newsroom" className="font-semibold text-foreground hover:text-primary">
                {post.author}
              </Link>
              <span aria-hidden>·</span>
              <PostDate date={post.date} long />
              {wasUpdated && (
                <>
                  <span aria-hidden>·</span>
                  <span>
                    Updated <PostDate date={post.updated as string} long />
                  </span>
                </>
              )}
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          <PostCover
            post={post}
            priority
            className="mt-7 aspect-[16/9] w-full rounded-xl"
            sizes="(min-width: 1024px) 780px, 100vw"
          />

          {/* Mobile table of contents */}
          <div className="mx-auto mt-7 max-w-[46rem] lg:hidden">
            <TableOfContents content={post.content} />
          </div>

          {/* Body */}
          <div className="mx-auto mt-8 max-w-[46rem]">
            <Markdown>{body}</Markdown>

            {/* FAQ */}
            {post.faq.length > 0 && (
              <section className="mt-12">
                <h2 className="border-t border-border pt-8 font-display text-2xl font-semibold tracking-[-0.02em]">
                  Frequently asked questions
                </h2>
                <div className="mt-5 divide-y divide-border border-y border-border">
                  {post.faq.map((item) => (
                    <details key={item.q} className="group py-4">
                      <summary className="cursor-pointer list-none font-display text-[17px] font-semibold">
                        <span className="flex items-start justify-between gap-4">
                          {item.q}
                          <span className="mt-0.5 shrink-0 text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45">
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Sources — the strongest trust signal available on a finance article */}
            {post.sources.length > 0 && (
              <section className="mt-10">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Sources and further reading
                </h2>
                <ul className="mt-3 space-y-2">
                  {post.sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-start gap-1.5 text-[14px] text-primary hover:underline"
                      >
                        <ExternalLink className="mt-[0.2em] h-3.5 w-3.5 shrink-0" />
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-10">
              <RiskWarning />
            </div>

            <AdSlot label="Advertisement" className="my-10" />

            {post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Topics
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[12px] font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8">
              <AuthorBox post={post} />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
              <p className="text-[13px] font-semibold">Share this article</p>
              <ShareButtons url={url} title={post.title} />
            </div>
          </div>

          <RelatedNews posts={related} />
        </div>

        {/* Sticky rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <TableOfContents content={post.content} />
            <AdSlot label="Advertisement" className="min-h-60" />
          </div>
        </aside>
      </div>
    </article>
  );
}
