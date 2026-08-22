import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { TickerBar } from "./TickerBar";
import { Navbar } from "./Navbar";
import { Wordmark } from "./Wordmark";
import type { SearchItem } from "./SearchDialog";

/**
 * Masthead + sticky navigation.
 *
 * The masthead scrolls away; the nav is a sibling element so `sticky top-0`
 * resolves against the page rather than a short parent box.
 */
export function SiteHeader() {
  const posts = getAllPosts();
  const searchItems: SearchItem[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    tags: p.tags,
  }));

  return (
    <>
      <TickerBar />

      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center sm:px-6 lg:px-8">
          <Link href="/" aria-label={`${siteConfig.name} — home`}>
            <Wordmark className="text-[26px] sm:text-[34px]" />
          </Link>
          <p className="max-w-lg text-[13px] leading-snug text-muted-foreground">
            {siteConfig.tagline} Independent coverage of crypto, currencies and global markets.
          </p>
        </div>
      </header>

      <Navbar searchItems={searchItems} />
    </>
  );
}
