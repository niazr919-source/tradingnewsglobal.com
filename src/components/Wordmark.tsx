import { cn } from "@/lib/utils";

/** The brand lockup: a small market glyph plus the serif masthead. */
export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2.5 font-display", className)}>
      <span
        aria-hidden
        className="relative top-[0.08em] inline-flex h-[0.95em] w-[0.95em] shrink-0 items-center justify-center rounded-[0.2em] bg-foreground text-background"
      >
        <svg viewBox="0 0 24 24" className="h-[0.62em] w-[0.62em]" fill="none" aria-hidden>
          <path
            d="M3 17.5L9 11l4 4 7.5-8.5"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15.5 6.5H21V12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="font-semibold tracking-[-0.02em]">
        Trading News{compact ? "" : " "}
        <span className="italic font-normal text-primary">Global</span>
      </span>
    </span>
  );
}
