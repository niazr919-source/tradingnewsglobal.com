import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";

/** Shared frame for standalone pages: policies, about, contact. */
export function PageShell({
  title,
  intro,
  updated,
  children,
  wide = false,
}: {
  title: string;
  intro?: string;
  /** ISO date the document was last revised — reviewers look for this. */
  updated?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`mx-auto px-4 py-8 sm:px-6 lg:px-8 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: title }]} />

      <header className="mt-4 border-b border-border pb-6">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.025em] sm:text-[42px]">
          {title}
        </h1>
        {intro && (
          <p className="mt-3 text-[16px] leading-relaxed text-muted-foreground">{intro}</p>
        )}
        {updated && (
          <p className="mt-4 text-[12.5px] text-muted-foreground">
            Last updated: <time dateTime={updated}>{updated}</time>
          </p>
        )}
      </header>

      <div className="prose prose-slate dark:prose-invert mt-8 max-w-none prose-headings:font-display prose-h2:text-[26px] prose-h3:text-[19px]">
        {children}
      </div>
    </div>
  );
}
