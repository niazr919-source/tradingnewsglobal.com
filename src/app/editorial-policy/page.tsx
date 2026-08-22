import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

const UPDATED = "2026-08-22";

export const metadata: Metadata = {
  title: "Editorial policy",
  description: `How ${siteConfig.name} decides what to publish, sources and fact-checks its work, handles corrections, and keeps advertising separate from editorial.`,
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <PageShell
      title="Editorial policy"
      intro="How we decide what to publish, how we check it, how we correct it when we get it wrong, and where the line sits between our newsroom and our advertising."
      updated={UPDATED}
    >
      <h2>Our purpose</h2>
      <p>
        {siteConfig.name} exists to explain how financial markets work to people who are not
        professionals. The test we apply to every article is whether a reader finishes it understanding a
        mechanism they did not understand before. We are not trying to tell anyone what to buy.
      </p>

      <h2>What we will not publish</h2>
      <p>These are standing rules, not case-by-case judgements:</p>
      <ul>
        <li>
          <strong>No trading signals or price calls.</strong> No entries, exits, targets or
          &ldquo;buy now&rdquo; content of any kind.
        </li>
        <li>
          <strong>No affiliate links and no broker referrals.</strong> We earn nothing when a reader
          opens a trading account. Our only revenue is third-party display advertising.
        </li>
        <li>
          <strong>No paid or sponsored articles.</strong> Nobody can buy a place in our editorial. If we
          ever publish sponsored material, it will be labelled unmistakably and will not appear in
          article feeds.
        </li>
        <li>
          <strong>No guaranteed-returns framing.</strong> We do not describe any strategy as reliable,
          safe, passive income, or a way to replace a salary.
        </li>
        <li>
          <strong>No token promotion.</strong> We do not accept payment to cover a coin, project or
          platform, and we do not publish press releases as news.
        </li>
      </ul>

      <h2>Sourcing and verification</h2>
      <ul>
        <li>
          We prefer <strong>primary sources</strong>: central bank statements, regulator publications,
          exchange documentation, company filings, official statistical releases.
        </li>
        <li>
          Where an article relies on external facts, those sources are listed at the foot of the article
          so you can check them yourself.
        </li>
        <li>
          Numbers are checked against the original release, not against another article quoting it.
        </li>
        <li>
          Where a claim is contested or uncertain, we say so in the text rather than picking the tidier
          version.
        </li>
        <li>
          We distinguish clearly between what is established fact, what is a reasonable inference, and
          what is speculation.
        </li>
      </ul>

      <h2>Authorship</h2>
      <p>
        Every article carries a named writer with a{" "}
        <Link href="/authors">profile page</Link> setting out what they cover and how to reach them
        directly. Bylines are not decorative: the person named is accountable for the article, including
        for its corrections.
      </p>

      <h2>Use of AI</h2>
      <p>
        We may use AI tools for research assistance, drafting support, copy-editing and code. Every
        article is reviewed, edited and fact-checked by the named human writer before it is published,
        and that person is responsible for its accuracy. We do not publish unreviewed machine-generated
        text, and we do not use AI to fabricate quotes, sources, data or people.
      </p>

      <h2>Corrections</h2>
      <p>
        We correct errors promptly and visibly rather than quietly editing them away.
      </p>
      <ul>
        <li>
          <strong>Minor fixes</strong> — typos, broken links, formatting — are made without a note.
        </li>
        <li>
          <strong>Factual corrections</strong> are made in the text and noted at the foot of the article,
          stating what was wrong and when it was fixed.
        </li>
        <li>
          <strong>Substantial corrections</strong> that change an article&apos;s conclusion are noted at
          the top of the article as well.
        </li>
        <li>
          Articles that are materially updated show an <strong>updated</strong> date alongside the
          original publication date.
        </li>
      </ul>
      <p>
        To report an error, email{" "}
        <a href={`mailto:${siteConfig.email.corrections}`}>{siteConfig.email.corrections}</a> with the
        article link and the specific claim. We reply to every substantiated correction request.
      </p>

      <h2>Updating older articles</h2>
      <p>
        Explainers are reviewed periodically and revised when rules, market structure or figures change.
        We do not silently rewrite an old article to look like new reporting, and we do not backdate or
        forward-date articles to game search rankings.
      </p>

      <h2>Separation of advertising and editorial</h2>
      <p>
        Advertising on this site is served programmatically by third-party networks. Our writers have no
        knowledge of which advertisers appear, and advertisers have no influence over what we publish,
        how we cover a company, or whether an article stays up. Ad units are labelled
        &ldquo;Advertisement&rdquo; and are visually distinct from articles. We do not place ads inside
        an article in a way designed to be mistaken for editorial links.
      </p>
      <p>
        We may, from time to time, publish critical coverage of a category of product that is also
        advertised on this site. That is a deliberate consequence of the separation described here.
      </p>

      <h2>Conflicts of interest</h2>
      <p>
        Writers must disclose any material holding in an asset they write about, and may not trade around
        the publication of their own articles. Where a writer holds a position relevant to the subject,
        the article says so.
      </p>

      <h2>Risk framing</h2>
      <p>
        Because our subject is financial, we treat risk disclosure as part of accuracy rather than as
        boilerplate. Where a product loses money for most retail traders, we state that in the body of
        the article and cite the regulator&apos;s own figures. Our full{" "}
        <Link href="/disclaimer">risk disclaimer</Link> applies to everything we publish.
      </p>

      <h2>Reader complaints</h2>
      <p>
        If you believe an article is inaccurate, unfair or misleading, write to{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a>. Tell us the
        article, the passage and what you think is wrong. We will investigate and reply, and if we got it
        wrong we will correct it under the process above.
      </p>
    </PageShell>
  );
}
