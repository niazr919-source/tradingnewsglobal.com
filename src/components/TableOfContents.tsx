import { extractToc } from "@/lib/utils";

/** Static, anchor-linked table of contents derived from the article body. */
export function TableOfContents({ content }: { content: string }) {
  const items = extractToc(content);
  if (items.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-lg border border-border bg-surface p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        On this page
      </h2>
      <ul className="mt-3 space-y-2 text-[13.5px]">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-3.5" : ""}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
