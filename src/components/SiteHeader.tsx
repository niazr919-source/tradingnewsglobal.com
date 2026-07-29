import { getAllPosts } from "@/lib/posts";
import { TickerBar } from "./TickerBar";
import { Navbar } from "./Navbar";
import type { SearchItem } from "./SearchDialog";

/** Sticky site header: live ticker bar + primary navigation with search. */
export function SiteHeader() {
  const searchItems: SearchItem[] = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    tags: p.tags,
  }));

  return (
    <header className="sticky top-0 z-40">
      <TickerBar />
      <Navbar searchItems={searchItems} />
    </header>
  );
}
