import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

const UPDATED = "2026-08-22";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${siteConfig.name} collects, uses and protects your personal data, including cookies, advertising partners and your rights under GDPR and CCPA.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy policy"
      intro={`This policy explains what data ${siteConfig.name} collects when you visit this website, why we collect it, who we share it with, and the choices and rights you have.`}
      updated={UPDATED}
    >
      <h2>Who we are</h2>
      <p>
        {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) publishes news and educational articles
        about cryptocurrency, foreign exchange and global markets at{" "}
        <strong>{siteConfig.url.replace(/^https?:\/\//, "")}</strong>. We are the data controller for
        personal data processed through this website.
      </p>
      <p>
        For any privacy question, correction or request, contact{" "}
        <a href={`mailto:${siteConfig.email.privacy}`}>{siteConfig.email.privacy}</a>. We aim to respond
        within 30 days.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>We do not require an account, and we do not sell your personal information.</li>
        <li>We run no tracking pixels or profiling beyond what is described below.</li>
        <li>
          Third-party advertising (Google AdSense) may set cookies. Advertising cookies are{" "}
          <strong>off by default</strong> until you consent.
        </li>
        <li>
          If you email us or use the newsletter link, we hold your address only to reply or to send you
          the brief.
        </li>
      </ul>

      <h2>What data we collect</h2>

      <h3>Information you give us</h3>
      <ul>
        <li>
          <strong>Email address</strong> — if you contact us or subscribe to the newsletter. Used only to
          respond to you or to send the brief you asked for.
        </li>
        <li>
          <strong>Message content</strong> — anything you write to us, including news tips and correction
          requests.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Server logs</strong> — our hosting provider records IP address, browser user agent,
          referring page and timestamp for every request. This is standard web-server logging used for
          security, abuse prevention and diagnosing faults.
        </li>
        <li>
          <strong>Local storage</strong> — we store your dark/light theme choice and your cookie consent
          decision in your browser. These never leave your device and are not personal identifiers.
        </li>
        <li>
          <strong>Advertising and measurement data</strong> — collected by Google if you consent to
          advertising cookies. See below.
        </li>
      </ul>

      <h3>What we do not collect</h3>
      <p>
        We do not ask for or store financial account details, trading account credentials, wallet
        addresses, private keys, government identity documents or payment card data. We will never ask
        you for any of these. If a message or advertisement claiming to be from us requests them, it is
        fraudulent — please report it to{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a>.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        A cookie is a small text file placed on your device. We use two categories, described in full in
        our <Link href="/cookies">cookie policy</Link>:
      </p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Purpose</th>
            <th>Consent needed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Strictly necessary</td>
            <td>Remembering your theme and consent choice; keeping the site secure</td>
            <td>No — the site cannot work without them</td>
          </tr>
          <tr>
            <td>Advertising</td>
            <td>Google AdSense ad serving, frequency capping and ad personalisation</td>
            <td>Yes — off until you accept</td>
          </tr>
        </tbody>
      </table>
      <p>
        You can change your choice at any time from the <Link href="/cookies">cookie policy</Link> page,
        and you can clear or block cookies entirely in your browser settings.
      </p>

      <h2>Advertising: Google AdSense and third-party vendors</h2>
      <p>This site is monetised in part through advertising. Specifically:</p>
      <ul>
        <li>
          Third-party vendors, <strong>including Google</strong>, use cookies to serve ads based on your
          prior visits to this website or other websites.
        </li>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based
          on your visit to this site and/or other sites on the internet.
        </li>
        <li>
          You may opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer nofollow">
            Google Ads Settings
          </a>
          .
        </li>
        <li>
          You can opt out of some third-party vendors&apos; use of cookies for personalised advertising
          at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer nofollow">
            aboutads.info/choices
          </a>{" "}
          or{" "}
          <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer nofollow">
            youronlinechoices.com
          </a>{" "}
          (Europe).
        </li>
        <li>
          Google&apos;s own handling of this data is governed by{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            how Google uses information from sites that use its services
          </a>
          .
        </li>
      </ul>
      <p>
        We apply Google Consent Mode so that advertising and measurement storage remain denied until you
        give consent. If you decline, you may still see advertising, but it will be non-personalised.
      </p>

      <h2>Other third parties</h2>
      <ul>
        <li>
          <strong>Hosting</strong> — our pages are served as static files by our hosting provider, which
          processes request logs as described above.
        </li>
        <li>
          <strong>Market data</strong> — the price strip at the top of the site fetches public quotes
          from CoinGecko and from Frankfurter (European Central Bank reference rates) directly from your
          browser. Those providers therefore receive your IP address as part of a normal web request. No
          identifier from this site is sent to them.
        </li>
        <li>
          <strong>Fonts</strong> — web fonts are served from our own domain, so your browser makes no
          request to Google Fonts.
        </li>
      </ul>

      <h2>Legal bases for processing (UK/EU GDPR)</h2>
      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Legal basis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Serving the website and keeping it secure</td>
            <td>Legitimate interests</td>
          </tr>
          <tr>
            <td>Replying to your email</td>
            <td>Legitimate interests / performing your request</td>
          </tr>
          <tr>
            <td>Newsletter</td>
            <td>Consent</td>
          </tr>
          <tr>
            <td>Advertising and ad personalisation cookies</td>
            <td>Consent</td>
          </tr>
        </tbody>
      </table>

      <h2>How long we keep data</h2>
      <ul>
        <li>Server logs: retained by our host for a limited period for security and diagnostics.</li>
        <li>Email correspondence: kept while it is relevant, then deleted.</li>
        <li>Newsletter address: until you unsubscribe.</li>
        <li>Browser storage (theme, consent): until you clear your browser data.</li>
      </ul>

      <h2>Your rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>access the personal data we hold about you;</li>
        <li>have inaccurate data corrected;</li>
        <li>have your data erased;</li>
        <li>restrict or object to processing;</li>
        <li>withdraw consent at any time, without affecting processing already carried out;</li>
        <li>receive your data in a portable format;</li>
        <li>lodge a complaint with your data protection authority.</li>
      </ul>
      <p>
        <strong>California residents (CCPA/CPRA):</strong> you have the right to know what personal
        information is collected, to request deletion, and to opt out of the &ldquo;sale&rdquo; or
        &ldquo;sharing&rdquo; of personal information. We do not sell personal information for money.
        Declining advertising cookies in our banner opts you out of cross-context behavioural
        advertising.
      </p>
      <p>
        To exercise any right, email{" "}
        <a href={`mailto:${siteConfig.email.privacy}`}>{siteConfig.email.privacy}</a>.
      </p>

      <h2>Children</h2>
      <p>
        This website is intended for adults. It is not directed at children, and we do not knowingly
        collect personal data from anyone under 18. The financial products discussed here are not
        suitable for minors. If you believe a child has provided us with personal data, contact us and we
        will delete it.
      </p>

      <h2>International transfers</h2>
      <p>
        Our service providers, including Google, may process data outside your country. Where personal
        data is transferred out of the UK or EEA, those transfers rely on the safeguards those providers
        maintain, such as Standard Contractual Clauses.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS. It is a static website with no user accounts and no reader
        database, which materially limits what could be exposed. No method of transmission over the
        internet is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the site changes or the law does. The revision date at the top
        always reflects the current version.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy enquiries: <a href={`mailto:${siteConfig.email.privacy}`}>{siteConfig.email.privacy}</a>
        <br />
        General and editorial:{" "}
        <a href={`mailto:${siteConfig.email.editorial}`}>{siteConfig.email.editorial}</a>
      </p>
    </PageShell>
  );
}
