"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

const SUBJECTS = [
  "General enquiry",
  "Correction to an article",
  "News tip",
  "Privacy request",
  "Advertising",
  "Syndication or reprint",
];

/**
 * Composes a mailto: link from the fields.
 *
 * Static hosting means there is no endpoint to POST to. Rather than ship a form
 * that silently discards messages, this hands a fully drafted email to the
 * reader's own mail client — nothing is sent anywhere until they press send.
 */
export function ContactForm() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const to =
    subject === "Privacy request"
      ? siteConfig.email.privacy
      : subject === "Correction to an article"
        ? siteConfig.email.corrections
        : subject === "Advertising"
          ? siteConfig.email.advertising
          : siteConfig.email.editorial;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(`${message}\n\n— ${name || "A reader"}`);
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  const field =
    "w-full rounded-md border border-border bg-background px-3 py-2 text-[14px] outline-none transition-colors focus:border-primary";

  return (
    <form onSubmit={onSubmit} className="not-prose space-y-4 rounded-lg border border-border bg-surface p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[13px] font-semibold">
            Your name
          </label>
          <input
            id="contact-name"
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block text-[13px] font-semibold">
            Subject
          </label>
          <select
            id="contact-subject"
            className={field}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-[13px] font-semibold">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          className={field}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="If this is about a specific article, please include the link."
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-muted-foreground">
          Goes to <span className="font-medium text-foreground">{to}</span>
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Send className="h-4 w-4" />
          Open in mail app
        </button>
      </div>
    </form>
  );
}
