"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FeedTab {
  slug: string;
  label: string;
  content: ReactNode;
}

/**
 * Client-side tab switcher. Content for every tab is server-rendered and passed
 * in as nodes; this component only toggles which panel is visible.
 */
export function TabbedFeed({ tabs }: { tabs: FeedTab[] }) {
  const [active, setActive] = useState(tabs[0]?.slug);

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2 border-b border-border">
        {tabs.map((tab) => {
          const isActive = tab.slug === active;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setActive(tab.slug)}
              className={cn(
                "relative -mb-px rounded-t-lg px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {isActive && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div key={tab.slug} className={cn(tab.slug === active ? "block" : "hidden")}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
