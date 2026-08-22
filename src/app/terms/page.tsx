import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

const UPDATED = "2026-08-22";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `The terms that govern your use of ${siteConfig.name}, including acceptable use, intellectual property, disclaimers and limitation of liability.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of service"
      intro={`These terms govern your use of ${siteConfig.name}. By using this website you accept them.`}
      updated={UPDATED}
    >
      <h2>1. Who these terms are with</h2>
      <p>
        This website is operated by {siteConfig.publisher}. In these terms, &ldquo;we&rdquo; and
        &ldquo;us&rdquo; mean {siteConfig.publisher}, and &ldquo;you&rdquo; means anyone accessing the
        site. If you do not accept these terms, please stop using the site.
      </p>

      <h2>2. What this site is</h2>
      <p>
        {siteConfig.name} publishes journalism and educational material about cryptocurrency, foreign
        exchange and global markets. It is an information service only. We are not a broker, exchange,
        adviser or financial institution, we do not hold client money, and we do not execute or arrange
        transactions.
      </p>

      <h2>3. Not financial advice</h2>
      <p>
        Nothing on this site is investment, financial, legal, accounting or tax advice, and nothing is a
        recommendation to buy, sell or hold any asset. You are solely responsible for your own financial
        decisions and for any losses that follow from them. Our{" "}
        <Link href="/disclaimer">risk disclaimer</Link> forms part of these terms and you should read it
        in full.
      </p>

      <h2>4. Eligibility</h2>
      <p>
        This site is intended for people aged 18 or over. By using it you confirm that you are at least
        18 and that using it is lawful where you live.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the site for any unlawful purpose or in breach of these terms;</li>
        <li>
          scrape, crawl, harvest or systematically copy content except as permitted by our robots.txt or
          with written permission;
        </li>
        <li>
          attempt to interfere with, probe, overload or gain unauthorised access to the site or its
          hosting infrastructure;
        </li>
        <li>
          republish our content in a way that suggests we endorse a product, service, broker or trading
          scheme;
        </li>
        <li>
          impersonate {siteConfig.name}, our writers, or represent our content as personalised advice to
          a third party;
        </li>
        <li>use the site to distribute malware, spam or misleading financial promotions.</li>
      </ul>

      <h2>6. Intellectual property</h2>
      <p>
        All articles, headlines, illustrations, layout, code and branding on this site are owned by
        {" "}
        {siteConfig.publisher} or its licensors and are protected by copyright and other intellectual
        property laws.
      </p>
      <p>
        You may read, print and share individual articles for personal, non-commercial use, and you may
        quote a short extract provided you attribute it to {siteConfig.name} and link to the original
        article. You may not republish whole articles, translate them, or use them to train commercial
        machine-learning models without our written permission. For syndication requests, email{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a>.
      </p>

      <h2>7. Third-party content and links</h2>
      <p>
        The site links to external sources so you can verify our reporting, and it displays market data
        supplied by third parties. We do not control those sources and are not responsible for their
        content, availability or accuracy. A link is not an endorsement.
      </p>

      <h2>8. Advertising</h2>
      <p>
        This site carries third-party advertising, including advertising served by Google. Advertisements
        are selected by the ad network and are clearly labelled. They are not endorsed or vetted by our
        newsroom, and any dealing you have with an advertiser is solely between you and them. See our{" "}
        <Link href="/privacy">privacy policy</Link> and <Link href="/cookies">cookie policy</Link> for how
        advertising data is handled.
      </p>

      <h2>9. Availability</h2>
      <p>
        We try to keep the site available and current, but we do not guarantee uninterrupted access. We
        may change, suspend, or withdraw any part of the site, or remove or amend any article, at any
        time.
      </p>

      <h2>10. Disclaimers and limitation of liability</h2>
      <p>
        The site and everything on it is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;,
        without warranty of any kind, express or implied, including as to accuracy, completeness, fitness
        for a particular purpose or non-infringement.
      </p>
      <p>
        To the fullest extent permitted by law, we exclude liability for any loss or damage arising from
        your use of, or inability to use, this site or any content on it. This includes trading and
        investment losses, lost profits, loss of data and any indirect or consequential loss. Nothing in
        these terms excludes liability that cannot lawfully be excluded, including for death or personal
        injury caused by negligence, or for fraud.
      </p>

      <h2>11. Indemnity</h2>
      <p>
        You agree to indemnify us against claims, losses and reasonable costs arising from your breach of
        these terms or your misuse of the site.
      </p>

      <h2>12. Privacy</h2>
      <p>
        Our handling of personal data is described in the{" "}
        <Link href="/privacy">privacy policy</Link>, which forms part of these terms.
      </p>

      <h2>13. Changes to these terms</h2>
      <p>
        We may revise these terms from time to time. The revision date at the top shows the current
        version, and continued use of the site after a change means you accept the revised terms.
      </p>

      <h2>14. Severability</h2>
      <p>
        If any provision of these terms is found unenforceable, the remaining provisions continue in full
        force.
      </p>

      <h2>15. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a>
      </p>
    </PageShell>
  );
}
