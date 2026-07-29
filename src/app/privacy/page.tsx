import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects your data, including cookies and third-party advertising.`,
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "July 26, 2026";
const CONTACT_EMAIL = "privacy@tradingnewsglobal.example.com";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <div className="prose prose-slate dark:prose-invert mt-6 max-w-none">
        <p>
          This Privacy Policy explains how {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;) collects, uses, and safeguards information when you visit {siteConfig.url}
          (the &quot;Site&quot;). By using the Site, you agree to the practices described here.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Information you provide:</strong> such as your email address when you subscribe to
            our newsletter or contact us.
          </li>
          <li>
            <strong>Automatically collected data:</strong> such as your IP address, browser type,
            device information, pages visited, and referring URLs, gathered through cookies and
            similar technologies.
          </li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use cookies to operate the Site, remember your preferences (for example, light or dark
          mode), analyze traffic, and serve advertising. You can control or delete cookies through
          your browser settings. Disabling cookies may affect how the Site functions.
        </p>

        <h2>Third-party advertising</h2>
        <p>
          We may display advertising served by third-party networks, including{" "}
          <strong>Google AdSense</strong> and other ad partners such as Adsterra.
        </p>
        <ul>
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on your prior visits
            to this and other websites.
          </li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to you
            based on your visit to this Site and/or other sites on the Internet.
          </li>
          <li>
            You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            . For other vendors, see{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              aboutads.info/choices
            </a>{" "}
            or{" "}
            <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">
              youronlinechoices.eu
            </a>
            .
          </li>
          <li>
            Third-party ad networks may use non-personally-identifiable information (not your name,
            address, email, or phone number) about your visits to provide advertisements about goods
            and services of interest to you.
          </li>
        </ul>

        <h2>Analytics</h2>
        <p>
          We may use analytics services to understand how visitors use the Site. These services
          collect information sent by your browser as part of a web page request, including cookies
          and your IP address, in aggregated and anonymized form.
        </p>

        <h2>Your rights (GDPR &amp; CCPA)</h2>
        <p>
          Depending on your location, you may have the right to access, correct, or delete your
          personal data, to object to or restrict its processing, and to opt out of the sale or
          sharing of personal information. To exercise these rights, contact us at the address below.
        </p>

        <h2>Children&apos;s privacy</h2>
        <p>
          The Site is not directed to individuals under the age of 18, and we do not knowingly collect
          personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes are effective when posted on
          this page with a revised &quot;Last updated&quot; date.
        </p>

        <h2>Contact</h2>
        <p>
          For any questions about this Privacy Policy, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <hr />
        <p className="text-sm">
          <em>
            This document is a template provided for convenience and does not constitute legal advice.
            Please review and adapt it with a qualified professional to ensure it reflects your actual
            data practices and complies with the laws that apply to you.
          </em>
        </p>
      </div>
    </div>
  );
}
