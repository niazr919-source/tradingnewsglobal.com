/**
 * On-page SEO audit of the static export.
 *
 * Checks the things that are cheap to get wrong and expensive to notice later:
 * title/description length, heading structure, image alt text, canonical
 * presence, Open Graph image format, and internal link density.
 *
 *   npm run build && node scripts/seo-audit.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");

// Google truncates around these widths. Not hard limits, but useful bounds.
const TITLE_MIN = 20;
const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;

async function walk(dir) {
  const found = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) found.push(...(await walk(full)));
    else if (e.name === "index.html" || e.name === "404.html") found.push(full);
  }
  return found;
}

const pick = (html, re) => (html.match(re) || [])[1];
const decode = (s = "") =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&mdash;/g, "—")
    .replace(/&#\d+;/g, "?");

const files = await walk(OUT);
const issues = { error: [], warn: [], info: [] };
const add = (level, page, msg) => issues[level].push(`${page.padEnd(52)} ${msg}`);

const stats = { pages: 0, articles: 0, totalInternalLinks: 0, bodyLinks: [] };

for (const file of files) {
  const html = await readFile(file, "utf8");
  const page =
    "/" + path.relative(OUT, file).replace(/\\/g, "/").replace(/index\.html$/, "");
  stats.pages++;

  const isArticle = page.startsWith("/blog/") && page !== "/blog/";
  if (isArticle) stats.articles++;

  // ---- title ----
  const title = decode(pick(html, /<title>([^<]*)<\/title>/));
  if (!title) add("error", page, "no <title>");
  else if (title.length > TITLE_MAX)
    add("warn", page, `title ${title.length} chars (>${TITLE_MAX}, will truncate)`);
  else if (title.length < TITLE_MIN) add("warn", page, `title only ${title.length} chars`);

  // ---- meta description ----
  const desc = decode(
    pick(html, /<meta name="description" content="([^"]*)"/) ?? ""
  );
  if (!desc) add("error", page, "no meta description");
  else if (desc.length > DESC_MAX)
    add("warn", page, `description ${desc.length} chars (>${DESC_MAX})`);
  else if (desc.length < DESC_MIN)
    add("warn", page, `description only ${desc.length} chars`);

  // ---- canonical ----
  if (!/<link rel="canonical"/.test(html)) add("error", page, "no canonical");

  // ---- headings ----
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) add("error", page, "no <h1>");
  else if (h1s.length > 1) add("warn", page, `${h1s.length} <h1> tags`);

  // ---- images without alt ----
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  const noAlt = imgs.filter((t) => !/\balt=/.test(t));
  if (noAlt.length) add("warn", page, `${noAlt.length} <img> without alt`);

  // ---- open graph image ----
  const ogImg = pick(html, /<meta property="og:image" content="([^"]*)"/);
  if (!ogImg) add("warn", page, "no og:image");
  else if (/\.svg($|\?)/i.test(ogImg))
    add("error", page, "og:image is SVG — most social platforms will not render it");

  // ---- internal links ----
  const links = [...html.matchAll(/href="(\/[^"#][^"]*)"/g)]
    .map((m) => m[1])
    .filter((h) => !h.startsWith("/_next/"));
  stats.totalInternalLinks += links.length;

  // Contextual links inside the article prose carry the most weight.
  if (isArticle) {
    const prose = (html.match(/<div class="prose[\s\S]*?<\/div>/) || [""])[0];
    const bodyLinks = [...prose.matchAll(/href="(\/blog\/[^"]*)"/g)].length;
    stats.bodyLinks.push({ page, count: bodyLinks });
    if (bodyLinks === 0) add("info", page, "no in-body links to other articles");
  }
}

// ---------------------------------------------------------------- report
const line = (s) => console.log(s);

line(`\nScanned ${stats.pages} pages (${stats.articles} articles)\n`);

for (const [level, label] of [
  ["error", "ERRORS"],
  ["warn", "WARNINGS"],
  ["info", "NOTES"],
]) {
  const list = issues[level];
  if (!list.length) continue;
  line(`${label} (${list.length})`);
  const shown = list.slice(0, 12);
  shown.forEach((l) => line("  " + l));
  if (list.length > shown.length) line(`  … and ${list.length - shown.length} more`);
  line("");
}

const withBodyLinks = stats.bodyLinks.filter((b) => b.count > 0).length;
line("INTERNAL LINKING");
line(`  articles with in-body links to other articles: ${withBodyLinks}/${stats.articles}`);
line(`  average internal links per page: ${Math.round(stats.totalInternalLinks / stats.pages)}`);
line("");

if (!issues.error.length) line("No blocking SEO errors.\n");
