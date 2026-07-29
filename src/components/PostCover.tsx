import Image from "next/image";
import { categories, type CategorySlug } from "@/lib/categories";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

/* ---------- deterministic seeding (so server & client render identically) ---------- */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const glyphs: Record<CategorySlug, string> = {
  crypto: "₿", // ₿
  forex: "$",
  "binary-trading": "%",
};

/** A themed, seeded candlestick-chart illustration used when a post has no real cover photo. */
function Illustration({ category, seed }: { category: CategorySlug; seed: string }) {
  const accent = categories[category].accent;
  const rand = rng(hash(seed));
  const id = `pc-${hash(seed).toString(36)}`;
  const W = 400;
  const H = 240;
  const pad = 26;
  const n = 11;
  const step = (W - pad * 2) / (n - 1);

  let prev = H * 0.5;
  const candles = Array.from({ length: n }, (_, i) => {
    const x = pad + i * step;
    const open = prev;
    const close = Math.min(H - 46, Math.max(52, prev + (rand() - 0.45) * (H * 0.16)));
    const high = Math.min(open, close) - rand() * 14 - 4;
    const low = Math.max(open, close) + rand() * 14 + 4;
    prev = close;
    return { x, open, close, high, low, up: close <= open };
  });
  const linePoints = candles
    .map((c) => `${c.x.toFixed(1)},${((c.open + c.close) / 2).toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.38" />
          <stop offset="1" stopColor={accent} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          x2={W}
          y1={(H / 4) * (i + 0.5)}
          y2={(H / 4) * (i + 0.5)}
          stroke="var(--foreground)"
          strokeOpacity="0.06"
        />
      ))}
      <text
        x={W - 14}
        y={H - 12}
        textAnchor="end"
        fontSize="120"
        fontWeight="800"
        fill="var(--foreground)"
        fillOpacity="0.05"
      >
        {glyphs[category]}
      </text>
      {candles.map((c, i) => (
        <g key={i} stroke={c.up ? "var(--up)" : "var(--down)"} fill={c.up ? "var(--up)" : "var(--down)"}>
          <line x1={c.x} x2={c.x} y1={c.high} y2={c.low} strokeWidth="1.5" strokeOpacity="0.5" />
          <rect
            x={c.x - 5}
            y={Math.min(c.open, c.close)}
            width="10"
            height={Math.max(3, Math.abs(c.open - c.close))}
            rx="1.5"
            fillOpacity="0.75"
          />
        </g>
      ))}
      <polyline
        points={linePoints}
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
    </svg>
  );
}

/**
 * Cover visual for a post.
 * - If `post.cover` is set (a path in /public or an allowed URL), renders that real photo.
 * - Otherwise renders a themed illustration so every post still looks complete.
 *
 * This component IS the box — pass sizing/aspect via `className`, like `aspect-[16/9] w-full`.
 */
export function PostCover({
  post,
  className,
  overlay = false,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  post: Post;
  className?: string;
  overlay?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {post.cover ? (
        <Image src={post.cover} alt={post.title} fill className="object-cover" priority={priority} sizes={sizes} />
      ) : (
        <Illustration category={post.category} seed={post.slug} />
      )}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      )}
    </div>
  );
}
