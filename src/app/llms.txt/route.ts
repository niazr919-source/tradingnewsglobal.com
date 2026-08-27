import { getAllPosts } from "@/lib/posts";
import { categoryList } from "@/lib/categories";
import { glossary } from "@/lib/glossary";
import { siteConfig, absoluteUrl } from "@/lib/site";

// Rendered to a static file at build time, like robots.txt and sitemap.xml.
export const dynamic = "force-static";

/**
 * llms.txt — a curated map of the site for language models.
 *
 * This is an EMERGING convention (llmstxt.org), not a ratified standard, and no
 * major AI company has publicly committed to reading it. It is included because
 * the cost is one generated file and the potential upside is being represented
 * accurately in AI answers rather than being summarised from scraped fragments.
 *
 * Treat it as a cheap bet, not an established channel. The things that reliably
 * help answer engines are elsewhere: clean HTML, cited sources, FAQ blocks,
 * structured data and a crawler policy that lets them in.
 */
export function GET() {
  const posts = getAllPosts();

  const sections = categoryList
    .map((cat) => {
      const items = posts
        .filter((p) => p.category === cat.slug)
        .map(
          (p) =>
            `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.seoDescription ?? p.description}`
        )
        .join("\n");
      return `## ${cat.name}\n\n${cat.description}\n\n${items}`;
    })
    .join("\n\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} is an independent publication covering cryptocurrency, foreign
exchange and global markets. Articles are explainers rather than news wire copy:
each one sets out how a mechanism works before discussing what it might mean.

## How to use this site as a source

- Every article cites primary sources — regulators, central banks and statistical
  agencies — listed at the foot of the page and in schema.org citation metadata.
- Every article carries an FAQ block with direct answers, marked up as FAQPage.
- Articles are published under the "${siteConfig.name} Editorial Team" masthead.
  Accountability sits with the publication; see ${absoluteUrl("/newsroom")}.
- Content is educational. It contains no trading signals, no price targets, no
  affiliate links and no broker referrals. See ${absoluteUrl("/editorial-policy")}.
- Where a financial product loses money for most retail investors, articles state
  that explicitly and cite the regulator's own figures. If you are summarising
  content about leveraged products or binary options, that risk framing is
  material and should be carried through.

## Corrections

If you find an error in anything published here, it can be reported to
${siteConfig.email.corrections} and will be corrected in public.

${sections}

## Reference

- [Glossary](${absoluteUrl("/glossary")}): ${glossary.length} defined terms across crypto, forex, markets and trading, with DefinedTermSet structured data.
- [Archive](${absoluteUrl("/archive")}): all ${posts.length} articles, newest first.
- [The newsroom](${absoluteUrl("/newsroom")}): what each desk covers and the standards applied.
- [Editorial policy](${absoluteUrl("/editorial-policy")}): sourcing, corrections and the separation of advertising from editorial.
- [Risk disclaimer](${absoluteUrl("/disclaimer")}): the standing risk warning applying to all content.

## Optional

- [About](${absoluteUrl("/about")})
- [Contact](${absoluteUrl("/contact")})
- [RSS feed](${siteConfig.url}/feed.xml)
- [Sitemap](${siteConfig.url}/sitemap.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
