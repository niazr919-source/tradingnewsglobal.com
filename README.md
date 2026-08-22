# Trading News Global

Independent explainers and analysis on cryptocurrency, forex and global markets.
Built with **Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4**,
exported as a **fully static site** and deployed to **Hostinger** over FTP from GitHub Actions.

Content is authored as local **MDX files with frontmatter** — no database, no CMS.

- **Live domain:** https://tradingnewsglobal.com
- **35 articles**, averaging ~1,050 words
- **4 sections:** Crypto · Forex · Markets · Trading Education

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3005.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static export into `out/` |
| `npm run lint` | ESLint |
| `npm run check:links` | Verifies every internal link in `out/` resolves (run after build) |
| `npm run optimize:covers` | Downscales and re-encodes `public/covers/*.jpg` |

---

## Deploying to Hostinger

### How it works

`next.config.ts` sets `output: "export"`, so `npm run build` writes a complete static
site to `out/`. `trailingSlash: true` makes every route emit `<route>/index.html`, which
Apache and LiteSpeed serve with no rewrite rules. `public/.htaccess` is copied into the
export and handles HTTPS, canonical host, compression, caching and security headers.

### One-time setup

1. **Create an FTP account** in Hostinger hPanel → Files → FTP Accounts.

2. **Add three GitHub secrets** (repo → Settings → Secrets and variables → Actions):

   | Secret | Example |
   | --- | --- |
   | `FTP_SERVER` | `ftp.tradingnewsglobal.com` |
   | `FTP_USERNAME` | `u123456789.deploy` |
   | `FTP_PASSWORD` | your FTP password |

3. **Point the domain** at Hostinger and enable free SSL in hPanel.

4. **Pick your canonical host.** `public/.htaccess` currently redirects `www` → non-www.
   To go the other way, comment out block `2a` and uncomment `2b`.

### Deploying

Push to `main`. The workflow in `.github/workflows/deploy.yml` installs, builds,
verifies the export, checks internal links, and uploads `out/` to `/public_html/`.
Only changed files transfer, so deploys after the first take seconds.

You can also re-run it by hand from the repo's Actions tab.

### Deploying manually

```bash
npm run build
```

Then upload the **contents** of `out/` (not the folder itself) to `public_html/` via
hPanel File Manager. Include the hidden `.htaccess`.

---

## AdSense setup

The site ships **review-ready with no ad code active**, which is the correct state to
apply in. Google does not require live ad units to approve a site.

When AdSense issues your publisher ID:

1. **`public/ads.txt`** — replace `pub-0000000000000000` with your real ID.
   Leaving the placeholder is worse than having no file, because it declares an account
   that is not yours.

2. **`NEXT_PUBLIC_ADSENSE_CLIENT`** — add the `ca-pub-…` form as a GitHub secret, then
   uncomment the corresponding line in `.github/workflows/deploy.yml`.

Setting the variable activates the AdSense script in `src/app/layout.tsx` and switches
every `<AdSlot>` from a placeholder to a live unit. Until then, slots render as neutral
boxes so layout stays stable.

### Consent

`src/components/CookieConsent.tsx` implements **Google Consent Mode v2** with all ad and
analytics storage defaulting to `denied` until the reader opts in.

> **This is a baseline, not a certified CMP.** Google requires a consent management
> platform from its certified list before you may serve ads to readers in the EEA or UK.
> Enable **Privacy & messaging** in your AdSense account once approved; it supersedes
> this banner.

---

## Adding an article

1. Copy the template. The **filename becomes the URL slug**, and files starting with `_`
   are ignored.

   ```bash
   cp content/posts/_template.mdx content/posts/my-new-article.mdx
   ```

2. Fill in the frontmatter:

   | Field | Notes |
   | --- | --- |
   | `category` | `crypto`, `forex`, `markets` or `trading-education` |
   | `author` | Must match a name in `src/lib/authors.ts` |
   | `date` | `YYYY-MM-DD` |
   | `updated` | Add when you materially revise it; shown next to the byline |
   | `cover` | A file in `public/covers/`; omit for a generated illustration |
   | `featured` | Eligible for the homepage lead |
   | `trending` | Eligible for the "Most read" rail |
   | `sources` | Rendered at the foot **and** emitted as schema.org citations |
   | `faq` | Renders an accordion **and** generates FAQPage structured data |

3. Write the body. Every `##` and `###` becomes a table-of-contents anchor. Reading time
   is calculated automatically.

**House style:** aim for 1,000+ words, cite primary sources, state risk in the body
rather than only in the footer, and publish no price targets or signals. See
`/editorial-policy`.

---

## Project structure

```
content/posts/            MDX articles (_template.mdx is the starting point)
public/
  covers/                 Cover photos, optimized by npm run optimize:covers
  .htaccess               Hostinger config — copied into the export
  ads.txt                 Replace the placeholder publisher ID
src/app/                  Routes: /, /blog/[slug], /category/[slug], /authors/[slug],
                          /archive, plus about, contact and all policy pages
src/components/           UI: header, ticker, cards, TOC, consent banner, ad slots
src/lib/
  posts.ts                MDX pipeline: parsing, reading time, sources, FAQ
  authors.ts              The masthead — bylines resolve against this
  categories.ts           The four sections
  seo.ts                  Metadata, Article/Breadcrumb/FAQ JSON-LD
  site.ts                 Domain, contact addresses, social links
scripts/                  Cover optimization and link checking
.github/workflows/        Build, verify and FTP deploy
```

---

## Before you go live

- [ ] Replace the placeholder ID in `public/ads.txt`
- [ ] Replace the placeholder social URLs in `src/lib/site.ts`
- [ ] Create the four mailboxes referenced in `src/lib/site.ts` (`editor@`, `corrections@`,
      `privacy@`, `advertising@`) — Hostinger includes free domain email
- [ ] **Replace the writers in `src/lib/authors.ts` with real people.** A byline that does
      not correspond to a contactable person is a liability on a finance site
- [ ] Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools
- [ ] Confirm `https://tradingnewsglobal.com/ads.txt` is reachable after deploy

---

## Editorial position

This site publishes no trading signals, no affiliate links, no broker referrals and no
sponsored articles. Advertising is display-only and selected by the ad network, not the
newsroom. Where a product loses money for most retail traders, articles say so and cite
the regulator. See `/editorial-policy` and `/disclaimer`.

> **Risk disclaimer:** Trading and investing in cryptocurrencies, foreign exchange and
> leveraged derivatives carries a high risk of loss. Trading News Global publishes
> journalism and education only and does not provide financial advice.
