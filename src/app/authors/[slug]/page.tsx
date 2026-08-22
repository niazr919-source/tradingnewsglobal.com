import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { authors, getAuthorBySlug } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/posts";
import { categories } from "@/lib/categories";
import { PostCard } from "@/components/PostCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};

  const canonical = absoluteUrl(`/authors/${author.slug}`);
  return {
    title: `${author.name} — ${author.role}`,
    description: author.short,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      url: canonical,
      title: `${author.name} | ${siteConfig.name}`,
      description: author.short,
      siteName: siteConfig.name,
    },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(author.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      email: author.email,
      url: absoluteUrl(`/authors/${author.slug}`),
      knowsAbout: author.expertise,
      worksFor: { "@type": "Organization", name: siteConfig.publisher, url: absoluteUrl("/") },
    },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Our writers", href: "/authors" },
          { label: author.name },
        ]}
      />

      <header className="mt-4 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row">
        <AuthorAvatar name={author.name} className="h-24 w-24 shrink-0 text-3xl" />
        <div className="min-w-0">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.025em]">{author.name}</h1>
          <p className="mt-1 text-[15px] font-medium text-primary">{author.role}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{author.bio}</p>
          <a
            href={`mailto:${author.email}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            {author.email}
          </a>
        </div>
      </header>

      <section className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Areas of focus
          </h2>
          <ul className="mt-3 space-y-1.5 text-[14px] text-muted-foreground">
            {author.expertise.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Sections
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {author.beats.map((beat) => (
              <Link
                key={beat}
                href={`/category/${beat}`}
                className="rounded-full border border-border px-3 py-1 text-[12.5px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {categories[beat].name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="border-b border-border pb-2.5 font-display text-xl font-semibold">
          Articles by {author.name}
          <span className="ml-2 text-sm font-normal text-muted-foreground">({posts.length})</span>
        </h2>
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <div key={post.slug} className="py-6">
              <PostCard post={post} variant="river" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
