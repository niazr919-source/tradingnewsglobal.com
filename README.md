# Trading News Global — Crypto, Forex & Binary Trading News

A production-ready financial news & blogging platform built with **Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4**. Content is authored as portable local **MDX files with frontmatter** — no database or CMS required.

## Features

- **Live ticker bar** with simulated real-time feeds (BTC, ETH, EUR/USD, GBP/USD, Gold)
- **Responsive navbar** with logo, category links, search dialog, dark/light toggle and a sliding mobile menu
- **Homepage** with a breaking-news hero, category cards, tabbed feed and a trending sidebar
- **Category pages** (`/category/[slug]`) with descriptions and pagination
- **Article pages** (`/blog/[slug]`) with reading time, author box, category badge, share buttons, auto-generated table of contents and a related-news grid
- **Full SEO**: dynamic `generateMetadata` (OpenGraph, Twitter cards, canonical URLs, keywords), `NewsArticle` + `BreadcrumbList` JSON-LD, dynamic `sitemap.xml` and `robots.txt`
- **Dark mode** with no flash-of-unstyled-content
- **Vercel-ready**

## Getting started

```bash
npm install
npm run dev
```

Open **http://localhost:3000** (this project was verified on port 3005; the default is 3000).

### Production build

```bash
npm run build
npm run start
```

## Adding a new blog post

1. Copy the template:
   ```bash
   cp content/posts/_template.mdx content/posts/my-new-post.mdx
   ```
   The **filename becomes the URL slug** → `/blog/my-new-post`. Files starting with `_` are ignored.
2. Edit the frontmatter at the top of the file:
   - `category` must be one of `crypto`, `forex`, or `binary-trading`
   - set `featured: true` to make it eligible for the homepage hero
   - set `trending: true` to surface it in the "Top Read" sidebar
   - `date` uses `YYYY-MM-DD`
3. Write the body in Markdown/MDX. Every `##` / `###` heading is auto-added to the table of contents.
4. Save — the dev server hot-reloads. Reading time is calculated automatically.

## Configuration

Set your real domain so canonical URLs, OpenGraph, sitemap and JSON-LD are correct:

```bash
cp .env.example .env.local
# then edit NEXT_PUBLIC_SITE_URL
```

On Vercel, add `NEXT_PUBLIC_SITE_URL` under **Project Settings → Environment Variables**.

## Project structure

```
content/posts/          # MDX articles (frontmatter + body)
src/app/                # routes: /, /category/[slug], /blog/[slug], sitemap.ts, robots.ts
src/components/         # UI: ticker, navbar, hero, cards, sidebar, share, TOC, footer…
src/lib/                # content pipeline (posts.ts), categories, SEO helpers, site config
public/                 # og-default.svg, logo.svg
```

## Deploy to Vercel

Push to a Git repo and import it in Vercel, or:

```bash
npx vercel
```

No extra configuration needed — just set `NEXT_PUBLIC_SITE_URL`.

---

> **Risk disclaimer:** Trading News Global publishes news and educational content only and does not provide financial advice. Trading crypto, forex and binary options carries a high risk of loss.
