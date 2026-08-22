import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { authors } from "@/lib/authors";
import { categoryList } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `Who runs ${siteConfig.name}, what we cover, how we make money, and the standards we hold ourselves to.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteConfig.name}`,
    url: absoluteUrl("/about"),
    mainEntity: {
      "@type": "NewsMediaOrganization",
      name: siteConfig.publisher,
      url: absoluteUrl("/"),
      email: siteConfig.email.editorial,
      foundingDate: String(siteConfig.foundedYear),
      employee: authors.map((a) => ({
        "@type": "Person",
        name: a.name,
        jobTitle: a.role,
        url: absoluteUrl(`/authors/${a.slug}`),
      })),
    },
  };

  return (
    <PageShell
      title={`About ${siteConfig.name}`}
      intro="An independent publication explaining crypto, currencies and global markets — without signals, affiliate links, or anyone telling you what to buy."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h2>Why this site exists</h2>
      <p>
        Most financial content aimed at ordinary readers has a product attached. It tells you what is
        going up, points you at a broker, and takes a cut when you sign up. The explanation is thin
        because the explanation was never the point.
      </p>
      <p>
        {siteConfig.name} was set up to do the opposite. We write the explanation that the rest of the
        internet skips: not <em>Bitcoin fell 6% today</em>, but what actually connects a change in
        interest-rate expectations to a currency pair; not <em>stablecoins are pegged to the dollar</em>,
        but what physically has to be true for that peg to hold, and what happens when it is not.
      </p>
      <p>
        We currently publish {posts.length} articles across {categoryList.length} sections, and we are
        adding to them steadily.
      </p>

      <h2>What we cover</h2>
      <ul>
        {categoryList.map((cat) => (
          <li key={cat.slug}>
            <strong>
              <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
            </strong>{" "}
            — {cat.description}
          </li>
        ))}
      </ul>

      <h2>How we make money</h2>
      <p>
        Third-party display advertising, and nothing else. We publish no affiliate links, take no broker
        referral fees, run no sponsored posts, and sell no courses, signals, subscriptions or managed
        accounts. Ad units are labelled and are chosen by the ad network, not by our newsroom. If that
        ever changes, this page will say so before anything else does.
      </p>

      <h2>Our standards</h2>
      <ul>
        <li>
          <strong>Named writers.</strong> Every article has a byline that links to a{" "}
          <Link href="/authors">real profile</Link> with a direct email address.
        </li>
        <li>
          <strong>Cited sources.</strong> Where an article rests on external facts, the sources are
          listed at the bottom so you can check them.
        </li>
        <li>
          <strong>Visible corrections.</strong> We fix errors in public and say what changed. See our{" "}
          <Link href="/editorial-policy">editorial policy</Link>.
        </li>
        <li>
          <strong>Risk stated up front.</strong> Where a product loses money for most retail traders, we
          say so in the article and cite the regulator&apos;s own figures — not in small print at the
          bottom.
        </li>
        <li>
          <strong>No predictions dressed as analysis.</strong> We separate what is known from what is
          inferred from what is guesswork.
        </li>
      </ul>

      <h2>The newsroom</h2>
      <div className="not-prose mt-6 grid gap-6 sm:grid-cols-2">
        {authors.map((author) => (
          <div key={author.slug} className="flex gap-3.5">
            <AuthorAvatar name={author.name} className="h-12 w-12 shrink-0 text-base" />
            <div className="min-w-0">
              <p className="font-display text-[16px] font-semibold">
                <Link href={`/authors/${author.slug}`} className="hover:text-primary">
                  {author.name}
                </Link>
              </p>
              <p className="text-[12.5px] font-medium text-primary">{author.role}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{author.short}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6">
        <Link href="/authors">Read the full profiles →</Link>
      </p>

      <h2>What we are not</h2>
      <p>
        We are not a broker, an exchange, a fund, or a regulated financial adviser, and nothing we
        publish is personalised advice. If you want someone to tell you what to do with your money, you
        want a licensed adviser who knows your circumstances — not a website. Please read our{" "}
        <Link href="/disclaimer">risk disclaimer</Link> before acting on anything here.
      </p>

      <h2>Get in touch</h2>
      <p>
        News tips, corrections, criticism and questions are all welcome. Email{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a> or use the{" "}
        <Link href="/contact">contact page</Link>. We read everything and reply to anything that needs a
        reply.
      </p>
    </PageShell>
  );
}
