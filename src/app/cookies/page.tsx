import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { siteConfig } from "@/lib/site";

const UPDATED = "2026-08-22";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `Exactly which cookies ${siteConfig.name} uses, what each one does, how long it lasts, and how to change your choice.`,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie policy"
      intro="Every cookie and storage key this site can set, what it does, and how to turn the optional ones off."
      updated={UPDATED}
    >
      <h2>Change your choice</h2>
      <p>
        You can reopen the consent banner and change your decision at any time. Declining advertising
        cookies does not remove advertising — it makes it non-personalised.
      </p>
      <CookieSettingsButton />

      <h2>Strictly necessary</h2>
      <p>
        These are set by this site, contain no personal identifiers, and are never sent to a third party.
        They cannot be switched off because the site would not function correctly without them.
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>theme</code>
            </td>
            <td>Local storage</td>
            <td>Remembers whether you chose the light or dark appearance</td>
            <td>Until you clear browser data</td>
          </tr>
          <tr>
            <td>
              <code>tng-consent-v1</code>
            </td>
            <td>Local storage</td>
            <td>Remembers your cookie choice so we do not ask on every page</td>
            <td>Until you clear browser data</td>
          </tr>
        </tbody>
      </table>

      <h2>Advertising cookies</h2>
      <p>
        Set only after you select <strong>Accept all</strong>. These come from Google and its advertising
        partners, not from us, and we do not have access to the data they contain.
      </p>
      <table>
        <thead>
          <tr>
            <th>Set by</th>
            <th>Purpose</th>
            <th>Typical duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google AdSense</td>
            <td>Serving ads, limiting how often you see the same ad, measuring performance</td>
            <td>Up to 24 months</td>
          </tr>
          <tr>
            <td>Google / DoubleClick</td>
            <td>Ad personalisation based on your browsing across sites</td>
            <td>Up to 24 months</td>
          </tr>
          <tr>
            <td>Google advertising partners</td>
            <td>Bidding and measurement in the ad auction</td>
            <td>Varies by vendor</td>
          </tr>
        </tbody>
      </table>
      <p>
        Google&apos;s handling of this data is described in{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          how Google uses information from sites that use its services
        </a>
        . You can turn off ad personalisation across all of Google at{" "}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer nofollow">
          Google Ads Settings
        </a>
        .
      </p>

      <h2>Requests made by your browser</h2>
      <p>
        These are not cookies, but they are worth stating plainly. The market price strip fetches quotes
        directly from your browser to <strong>CoinGecko</strong> (crypto) and{" "}
        <strong>Frankfurter</strong> (European Central Bank reference rates). Those services see your IP
        address as part of an ordinary web request. We send them no identifier and receive nothing about
        you in return.
      </p>

      <h2>Controlling cookies in your browser</h2>
      <p>
        Every major browser lets you block or delete cookies, either entirely or per site. Blocking all
        cookies will not break this site, though your theme and consent choice will stop being
        remembered. Look for &ldquo;Privacy&rdquo; or &ldquo;Cookies and site data&rdquo; in your
        browser settings.
      </p>

      <h2>Consent management for EEA and UK readers</h2>
      <p>
        Where required, consent for advertising and measurement storage defaults to denied and is only
        granted after you accept. Google requires publishers serving ads to readers in the European
        Economic Area and the United Kingdom to use a certified consent management platform; where that
        applies, the certified banner takes precedence over the one described here.
      </p>

      <h2>Questions</h2>
      <p>
        Email <a href={`mailto:${siteConfig.email.privacy}`}>{siteConfig.email.privacy}</a>. See also our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    </PageShell>
  );
}
