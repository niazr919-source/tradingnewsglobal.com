"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { categoryList } from "@/lib/categories";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog, type SearchItem } from "./SearchDialog";
import { Wordmark } from "./Wordmark";

const secondaryLinks = [
  { label: "Glossary", href: "/glossary" },
  { label: "About", href: "/about" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ searchItems }: { searchItems: SearchItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the drawer when the router navigates.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  // Cmd/Ctrl-K opens search, the convention readers already know.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/75"
    >
      <div className="mx-auto flex h-13 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Compact wordmark appears once the masthead has scrolled away */}
        <Link href="/" className="shrink-0" aria-label="Trading News Global — home">
          <Wordmark className="text-[15px]" />
        </Link>

        <div className="ml-2 hidden h-5 w-px bg-border md:block" />

        {/* Sections */}
        <div className="hidden min-w-0 items-center gap-0.5 md:flex">
          {categoryList.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={cn(
                "relative rounded-md px-2.5 py-1.5 text-[13.5px] font-medium transition-colors",
                isActive(`/category/${cat.slug}`)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.navLabel}
              {isActive(`/category/${cat.slug}`) && (
                <span
                  className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full"
                  style={{ background: cat.accent }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search articles"
            className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden rounded border border-border bg-muted px-1 py-px text-[10px] font-medium lg:inline">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn("fixed inset-0 z-50 md:hidden", mobileOpen ? "pointer-events-auto" : "pointer-events-none")}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn("absolute inset-0 bg-black/55 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col overflow-y-auto border-l border-border bg-card p-6 shadow-2xl transition-transform duration-200",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <Wordmark className="text-base" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Sections
          </p>
          <div className="flex flex-col">
            {categoryList.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group border-b border-border py-3"
              >
                <span className="flex items-center gap-2 font-display text-lg font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.accent }} />
                  {cat.name}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{cat.tagline}</span>
              </Link>
            ))}
          </div>

          <p className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            More
          </p>
          <div className="flex flex-col gap-1">
            {secondaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} items={searchItems} />
    </nav>
  );
}
