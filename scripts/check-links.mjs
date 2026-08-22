/**
 * Verify that every internal link in the static export resolves to a real file.
 *
 * A broken internal link is one of the few things an ad-network or search
 * quality reviewer will notice immediately, and `next build` does not catch it
 * because links are just strings. Run after every build:
 *
 *   node scripts/check-links.mjs
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

/** Resolve a site-relative href to the file the server would return. */
async function resolves(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return exists(path.join(OUT, "index.html"));

  const rel = clean.replace(/^\//, "");
  // trailingSlash:true means /foo/ -> /foo/index.html
  if (await exists(path.join(OUT, rel, "index.html"))) return true;
  if (await exists(path.join(OUT, rel))) return true;
  if (await exists(path.join(OUT, rel + ".html"))) return true;
  return false;
}

const files = await walk(OUT);
const broken = new Map();
const checked = new Set();
let total = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  const page = "/" + path.relative(OUT, file).replace(/\\/g, "/").replace(/index\.html$/, "");

  for (const match of html.matchAll(/href="(\/[^"#][^"]*)"/g)) {
    const href = match[1];
    // Skip build assets and anything the export does not own.
    if (href.startsWith("/_next/")) continue;
    total++;

    const key = href.split("#")[0].split("?")[0];
    if (checked.has(key)) continue;
    checked.add(key);

    if (!(await resolves(href))) {
      if (!broken.has(href)) broken.set(href, []);
      broken.get(href).push(page);
    }
  }
}

console.log(`Scanned ${files.length} pages, ${total} internal links, ${checked.size} unique targets.`);

if (broken.size === 0) {
  console.log("No broken internal links.");
} else {
  console.error(`\n${broken.size} broken target(s):\n`);
  for (const [href, pages] of broken) {
    console.error(`  ${href}`);
    console.error(`    linked from: ${pages.slice(0, 3).join(", ")}${pages.length > 3 ? ` (+${pages.length - 3} more)` : ""}`);
  }
  process.exitCode = 1;
}
