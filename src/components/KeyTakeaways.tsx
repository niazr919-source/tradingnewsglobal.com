import { Check } from "lucide-react";

/**
 * Answer-first summary, rendered directly beneath the headline.
 *
 * Two reasons this sits at the top rather than the bottom. Readers who want the
 * answer get it in five seconds. And answer engines — AI Overviews, ChatGPT,
 * Perplexity — quote self-contained factual statements; an article that buries
 * its conclusion in paragraph six is far harder to cite accurately.
 *
 * Each line must stand alone, without the surrounding article for context.
 */
export function KeyTakeaways({ points }: { points: string[] }) {
  if (points.length === 0) return null;

  return (
    <aside
      aria-label="Key points"
      className="not-prose rounded-xl border border-border border-l-[3px] border-l-primary bg-surface p-5"
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Key points
      </h2>
      <ul className="mt-3 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex gap-2.5 text-[14.5px] leading-relaxed">
            <Check className="mt-[0.28em] h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
