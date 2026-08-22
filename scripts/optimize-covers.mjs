/**
 * Downscale and re-encode the cover photos in public/covers.
 *
 * The static export runs with `images.unoptimized: true` (Hostinger shared
 * hosting has no Node image server), so whatever sits in public/ is exactly
 * what the browser downloads. Covers are never displayed wider than the
 * article column, so shipping 2000px originals is pure waste on the metric
 * search engines actually measure.
 *
 * Run with:  node scripts/optimize-covers.mjs
 */
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "covers");
const MAX_WIDTH = 1400; // widest the cover is ever rendered, times a retina factor
const QUALITY = 78;

function kb(bytes) {
  return (bytes / 1024).toFixed(0) + "kb";
}

const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));

let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(DIR, file);
  const tmp = path.join(DIR, `.tmp-${file}`);

  const originalSize = (await stat(src)).size;
  before += originalSize;

  const image = sharp(src);
  const meta = await image.metadata();

  await image
    .resize({
      width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH),
      withoutEnlargement: true,
    })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(tmp);

  const newSize = (await stat(tmp)).size;

  // Keep whichever is smaller — never make a file bigger.
  if (newSize < originalSize) {
    await unlink(src);
    await rename(tmp, src);
    after += newSize;
    console.log(
      `${file.padEnd(16)} ${kb(originalSize).padStart(7)} -> ${kb(newSize).padStart(7)}  (${meta.width}px -> ${Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH)}px)`
    );
  } else {
    await unlink(tmp);
    after += originalSize;
    console.log(`${file.padEnd(16)} ${kb(originalSize).padStart(7)}  already smaller, kept`);
  }
}

console.log(
  `\nTotal ${kb(before)} -> ${kb(after)}  (saved ${kb(before - after)}, ${Math.round((1 - after / before) * 100)}%)`
);
