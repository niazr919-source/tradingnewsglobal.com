import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Rule-and-label heading used to open each block on archives and the front page. */
export function SectionHeading({
  title,
  eyebrow,
  accent,
  href,
  linkLabel,
}: {
  title: string;
  eyebrow?: string;
  accent?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-border pb-2.5">
      <div className="min-w-0">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-[-0.015em]">
          {accent && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: accent }} />}
          {title}
        </h2>
        {eyebrow && <p className="mt-0.5 truncate text-[12.5px] text-muted-foreground">{eyebrow}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[13px] font-semibold text-primary hover:underline"
        >
          {linkLabel ?? "See all"} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
