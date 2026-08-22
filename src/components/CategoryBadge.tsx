import Link from "next/link";
import { categories, type CategorySlug } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function CategoryBadge({
  category,
  className,
  asLink = true,
}: {
  category: CategorySlug;
  className?: string;
  asLink?: boolean;
}) {
  const cat = categories[category];
  const classes = cn(
    "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] transition-opacity hover:opacity-70",
    className
  );
  const content = (
    <>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.accent }} aria-hidden />
      <span style={{ color: cat.accent }}>{cat.shortName}</span>
    </>
  );

  if (!asLink) return <span className={classes}>{content}</span>;

  return (
    <Link href={`/category/${cat.slug}`} className={classes}>
      {content}
    </Link>
  );
}
