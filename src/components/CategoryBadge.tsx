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
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
    cat.badgeClass,
    className
  );

  if (!asLink) {
    return <span className={classes}>{cat.shortName}</span>;
  }

  return (
    <Link href={`/category/${cat.slug}`} className={classes}>
      {cat.shortName}
    </Link>
  );
}
