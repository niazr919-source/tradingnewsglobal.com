import { List } from "lucide-react";
import { extractToc } from "@/lib/utils";

/** Static, anchor-linked table of contents derived from the article body. */
export function TableOfContents({ content }: { content: string }) {
  const items = extractToc(content);
  if (items.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <List className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-wide">On this page</h2>
      </div>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
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
