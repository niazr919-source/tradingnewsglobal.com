import { cn } from "@/lib/utils";

/**
 * Monogram avatar. Deterministic hue per name so the same writer always gets the
 * same colour, without shipping photo assets that do not exist yet.
 */
export function AuthorAvatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;

  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center rounded-full font-display font-semibold", className)}
      style={{
        background: `color-mix(in srgb, hsl(${h} 55% 50%) 14%, transparent)`,
        color: `hsl(${h} 55% 38%)`,
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, hsl(${h} 55% 50%) 25%, transparent)`,
      }}
    >
      {initials}
    </div>
  );
}
