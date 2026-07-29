import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms and conditions governing your use of ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "July 26, 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <div className="prose prose-slate dark:prose-invert mt-6 max-w-none">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of {siteConfig.name}{" "}
          (the &quot;Site&quot;). By accessing or using the Site, you agree to be bound by these Terms.
          If you do not agree, please do not use the Site.
        </p>

        <h2>Use of the Site</h2>
        <p>
          You agree to use the Site only for lawful purposes. You may not use the Site in any way that
          could damage, disable, or impair it, or interfere with any other party&apos;s use.
        </p>

        <h2>No financial advice</h2>
        <p>
          All content on the Site is provided for general informational and educational purposes only.
          It does not constitute financial, investment, legal, or tax advice, and must not be relied
          upon as such. Trading and investing carry significant risk. You are solely responsible for
          your own decisions. See our{" "}
          <a href="/disclaimer">Risk Disclaimer</a> for details.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Unless otherwise stated, all content on the Site — including text, graphics, logos, and
          design — is the property of {siteConfig.publisher} and is protected by applicable
          intellectual-property laws. You may not reproduce or redistribute it without permission.
        </p>

        <h2>Third-party links and advertising</h2>
        <p>
          The Site may contain links to third-party websites and display third-party advertising. We
          are not responsible for the content, products, or practices of any third party, and a link
          or advertisement does not imply endorsement.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          The Site and its content are provided &quot;as is&quot; without warranties of any kind. To
          the fullest extent permitted by law, {siteConfig.publisher} shall not be liable for any
          losses or damages arising from your use of, or reliance on, the Site or its content.
        </p>

        <h2>Changes to these Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the Site after changes are posted
          constitutes acceptance of the revised Terms.
        </p>

        <hr />
        <p className="text-sm">
          <em>
            This document is a template provided for convenience and does not constitute legal advice.
            Please review and adapt it with a qualified professional for your jurisdiction.
          </em>
        </p>
      </div>
    </div>
  );
}
