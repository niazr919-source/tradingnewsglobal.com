/**
 * Push the site's URLs to IndexNow.
 *
 * IndexNow is a shared endpoint used by Bing, Yandex, Seznam and Naver: instead
 * of waiting for a crawler to notice a change, you tell it which URLs changed.
 * Bing typically indexes submitted URLs within hours rather than weeks.
 *
 * Google does NOT participate — Search Console and the sitemap remain the route
 * there. This is purely a Bing-and-friends accelerator.
 *
 * Ownership is proved by hosting a file at /<key>.txt containing the key, which
 * `public/<key>.txt` does. The key is not a secret: it is publicly readable by
 * design, so it lives in the repo rather than in a GitHub secret.
 *
 *   node scripts/indexnow.mjs            # submit every URL in the sitemap
 *   node scripts/indexnow.mjs --dry-run  # print what would be sent
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const HOST = "tradingnewsglobal.com";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

const dryRun = process.argv.includes("--dry-run");

const key = (await readFile(path.join(process.cwd(), ".indexnow-key"), "utf8")).trim();
if (!/^[a-f0-9]{8,128}$/i.test(key)) {
  console.error("Invalid or missing IndexNow key in .indexnow-key");
  process.exit(1);
}

// Read the URL list from the built sitemap so the two can never drift apart.
const sitemapPath = path.join(process.cwd(), "out", "sitemap.xml");
let sitemap;
try {
  sitemap = await readFile(sitemapPath, "utf8");
} catch {
  console.error("out/sitemap.xml not found — run `npm run build` first.");
  process.exit(1);
}

const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("No URLs found in sitemap.");
  process.exit(1);
}

console.log(`${urlList.length} URLs from sitemap.xml`);
console.log(`key file: https://${HOST}/${key}.txt`);

if (dryRun) {
  urlList.slice(0, 5).forEach((u) => console.log("  " + u));
  if (urlList.length > 5) console.log(`  … and ${urlList.length - 5} more`);
  console.log("\n--dry-run: nothing submitted.");
  process.exit(0);
}

// IndexNow accepts up to 10,000 URLs per request; batch anyway for safety.
const BATCH = 1000;
let submitted = 0;

for (let i = 0; i < urlList.length; i += BATCH) {
  const urls = urlList.slice(i, i + BATCH);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `https://${HOST}/${key}.txt`,
      urlList: urls,
    }),
  });

  // 200 = accepted, 202 = accepted but key still being validated.
  if (res.status === 200 || res.status === 202) {
    submitted += urls.length;
    console.log(`  submitted ${urls.length} URLs — HTTP ${res.status}`);
  } else {
    const body = await res.text().catch(() => "");
    console.error(`  FAILED — HTTP ${res.status} ${body.slice(0, 200)}`);
    // 422 usually means the key file is not reachable yet. Not fatal for CI.
    process.exitCode = 1;
  }
}

console.log(`\nDone. ${submitted}/${urlList.length} URLs submitted to IndexNow.`);
