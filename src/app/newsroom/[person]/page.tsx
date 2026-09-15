import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PostCard } from "@/components/PostCard";
import { people, personUrl, personSchema, type Person } from "@/lib/people";
import { getAllPosts } from "@/lib/posts";
import { siteConfig, absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return people.map((p) => ({ person: p.slug }));
}

function find(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ person: string }>;
}): Promise<Metadata> {
  const { person: slug } = await params;
  const person = find(slug);
  if (!person) return {};
  return {
    title: `${person.name} — ${person.role}`,
    description: person.short,
    alternates: { canonical: `/newsroom/${person.slug}` },
    openGraph: {
      type: "profile",
      url: personUrl(person),
      title: `${person.name} — ${person.role}, ${siteConfig.name}`,
      description: person.short,
    },
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ person: string }>;
}) {
  const { person: slug } = await params;
  const person = find(slug);
  if (!person) notFound();

  const posts = getAllPosts();
  // Articles this person is credited on. The editor reviews everything, so
  // their page shows the most recent work rather than a subset.
  const authored = posts.filter((p) => p.author === person.name);
  const shown = (authored.length > 0 ? authored : posts).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: personUrl(person),
    mainEntity: {
      ...personSchema(person),
      description: person.bio,
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
  };

  return (
    <PageShell title={person.name} intro={person.role}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p>{person.bio}</p>

      <h2>Contact</h2>
      <p>
        {person.name} can be reached at{" "}
        <a href={`mailto:${person.email}`}>
          <Mail className="inline h-4 w-4 align-text-bottom" /> {person.email}
        </a>
        . If you believe something on this site is wrong, that address is the fastest way to say so —
        see our <Link href="/editorial-policy">editorial policy</Link> for how corrections are
        handled.
      </p>

      <h2>{authored.length > 0 ? "Recent articles" : "Recent work on the site"}</h2>
      <div className="not-prose grid gap-5 sm:grid-cols-2">
        {shown.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <p className="mt-8">
        <Link href="/newsroom">Back to the newsroom</Link>
      </p>
    </PageShell>
  );
}
