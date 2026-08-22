import { format } from "date-fns";

/**
 * Renders a date in a fixed locale/timezone-independent format.
 *
 * Using `toLocaleDateString` here would produce different output on the build
 * machine than in the reader's browser and trip React hydration warnings.
 */
export function PostDate({ date, long = false }: { date: string; long?: boolean }) {
  const d = new Date(date);
  return (
    <time dateTime={date}>{format(d, long ? "MMMM d, yyyy" : "MMM d, yyyy")}</time>
  );
}
