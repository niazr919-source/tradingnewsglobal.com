"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { categories, type CategorySlug } from "@/lib/categories";

export interface SearchItem {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  tags: string[];
}

export function SearchDialog({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: SearchItem[];
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 6);
    return items
      .filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 8);
  }, [query, items]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Search articles">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-1/2 top-24 w-[92%] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crypto, forex & binary news…"
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              No results for “{query}”.
            </p>
          ) : (
            results.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                onClick={onClose}
                className="block rounded-lg px-3 py-3 transition-colors hover:bg-muted"
              >
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {categories[item.category].name}
                </div>
                <div className="text-sm font-semibold leading-snug">{item.title}</div>
                <div className="line-clamp-1 text-xs text-muted-foreground">{item.description}</div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
