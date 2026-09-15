import { siteConfig, absoluteUrl } from "./site";

/**
 * The named people behind the publication.
 *
 * Google's quality guidance for finance content asks who produced it and who is
 * accountable for it. Naming real, contactable people answers that in a way a
 * publication byline alone cannot.
 *
 * The bios below deliberately state ONLY what is verifiably true about each
 * person's role on this site. Do not add qualifications, employment history,
 * years of experience or certifications unless the person actually holds them
 * and is willing to have them checked — an unverifiable credential on a finance
 * site is worse than no credential at all, and it is exactly what an ad-network
 * or search quality review looks for.
 *
 * TO EXPAND (recommended, by the people themselves):
 *   - a real professional background, in one or two sentences
 *   - a link to a public profile that confirms the person exists
 *   - a photo
 */
export interface Person {
  /** URL segment under /newsroom/. */
  slug: string;
  /** Name as it appears in bylines and structured data. */
  name: string;
  /** Short role label shown next to the name. */
  role: string;
  /** One-line summary used in cards and meta descriptions. */
  short: string;
  /** Full biography. Only verifiable statements. */
  bio: string;
  /** A monitored address that reaches this person. */
  email: string;
}

export const people: Person[] = [
  {
    slug: "niaz",
    name: "Niaz",
    role: "Founder and writer",
    short: `Founder of ${siteConfig.name}, and the person accountable for what it publishes.`,
    bio: `Niaz founded ${siteConfig.name} and writes for it. He started the site to explain how markets actually work — the mechanism behind a headline rather than a view on where a price is going — after finding that most retail-facing financial coverage does the opposite. He sets the site's editorial position: primary sources over secondary reporting, no price targets, no trading signals, no affiliate links and no paid coverage. Responsibility for everything published here, including the mistakes, is his.`,
    email: siteConfig.email.editorial,
  },
  {
    slug: "harry-wilson",
    name: "Harry Wilson",
    role: "Editor",
    short: `Editor at ${siteConfig.name}. Reads every article against the editorial policy before it is published.`,
    bio: `Harry Wilson is the editor of ${siteConfig.name}. Every article is read against the editorial policy before publication — in particular for claims stated more confidently than the sources support, for figures that cannot be traced to a primary source, and for anything that reads as advice rather than explanation. Where reporting on a number is contradictory, his call is to leave the number out and explain the mechanism instead. Corrections are routed to him.`,
    email: siteConfig.email.corrections,
  },
];

export const byName = new Map(people.map((p) => [p.name, p]));

export function getPerson(name: string): Person | undefined {
  return byName.get(name);
}

/** The default byline for articles with no explicit `author:` in frontmatter. */
export const defaultAuthor = people[0];

/** The editor credited on every article. */
export const editor = people.find((p) => p.slug === "harry-wilson")!;

export function personUrl(p: Person): string {
  return absoluteUrl(`/newsroom/${p.slug}`);
}

/** schema.org Person, used as the author/editor of an Article. */
export function personSchema(p: Person) {
  return {
    "@type": "Person",
    name: p.name,
    jobTitle: p.role,
    url: personUrl(p),
    email: p.email,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.publisher,
      url: absoluteUrl("/"),
    },
  };
}
