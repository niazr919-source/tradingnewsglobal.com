/**
 * Render public/og-default.png at 1200x630.
 *
 * The site previously shipped og-default.svg. Facebook, LinkedIn and X do not
 * render SVG Open Graph images — a shared link showed no card at all. This
 * rasterises the same design to PNG, which every platform supports.
 *
 *   node scripts/make-og-image.mjs
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const W = 1200;
const H = 630;

// Matches the site's light palette in globals.css.
const PAPER = "#f7f6f3";
const INK = "#14181f";
const PRIMARY = "#1f5fd0";
const MUTED = "#5d6470";
const BORDER = "#e0dcd4";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PRIMARY}" stop-opacity="0.07"/>
      <stop offset="1" stop-color="${PRIMARY}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect width="${W}" height="${H}" fill="url(#wash)"/>

  <!-- top rule -->
  <rect x="0" y="0" width="${W}" height="10" fill="${PRIMARY}"/>

  <!-- glyph mark -->
  <rect x="90" y="150" width="86" height="86" rx="18" fill="${INK}"/>
  <path d="M112 210 L134 186 L148 200 L174 172"
        stroke="${PAPER}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M158 172 H176 V190"
        stroke="${PAPER}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- wordmark -->
  <text x="200" y="216" font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="600" fill="${INK}">
    Trading News <tspan fill="${PRIMARY}" font-style="italic" font-weight="400">Global</tspan>
  </text>

  <!-- tagline -->
  <text x="92" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="600" fill="${INK}">
    Markets, explained without the hype.
  </text>

  <text x="92" y="392" font-family="Helvetica, Arial, sans-serif" font-size="27" fill="${MUTED}">
    Independent coverage of crypto, currencies and global markets.
  </text>

  <!-- section rail -->
  <line x1="92" y1="452" x2="1108" y2="452" stroke="${BORDER}" stroke-width="2"/>

  <g font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="bold" letter-spacing="3">
    <circle cx="100" cy="505" r="7" fill="#e08b1f"/>
    <text x="120" y="514" fill="${MUTED}">CRYPTO</text>

    <circle cx="290" cy="505" r="7" fill="#2f7d6b"/>
    <text x="310" y="514" fill="${MUTED}">FOREX</text>

    <circle cx="460" cy="505" r="7" fill="#5b52c9"/>
    <text x="480" y="514" fill="${MUTED}">MARKETS</text>

    <circle cx="672" cy="505" r="7" fill="#c2455a"/>
    <text x="692" y="514" fill="${MUTED}">EDUCATION</text>
  </g>

  <text x="92" y="588" font-family="Helvetica, Arial, sans-serif" font-size="23" fill="${MUTED}">
    tradingnewsglobal.com
  </text>
</svg>`;

const out = path.join(process.cwd(), "public", "og-default.png");
const buf = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(out, buf);

const meta = await sharp(buf).metadata();
console.log(
  `wrote public/og-default.png  ${meta.width}x${meta.height}  ${(buf.length / 1024).toFixed(0)}kb`
);
