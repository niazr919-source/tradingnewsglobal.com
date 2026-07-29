import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Trading News Global newsroom for tips, feedback and partnership enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Contact us</h1>
      <p className="mt-3 text-muted-foreground">
        Have a news tip, correction or partnership enquiry? We&apos;d love to hear from you.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <Mail className="h-5 w-5 text-primary" />
          <h2 className="mt-3 font-semibold">Editorial</h2>
          <p className="mt-1 text-sm text-muted-foreground">newsroom@tradingnewsglobal.example.com</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="mt-3 font-semibold">Partnerships</h2>
          <p className="mt-1 text-sm text-muted-foreground">partners@tradingnewsglobal.example.com</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Follow us
        </h2>
        <SocialLinks className="mt-3" />
      </div>
    </div>
  );
}
