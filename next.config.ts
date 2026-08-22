import type { NextConfig } from "next";

/**
 * Built as a fully static site (`output: "export"`) so it can be served by
 * Hostinger shared hosting (LiteSpeed/Apache) straight out of `out/`.
 *
 * `trailingSlash: true` makes Next emit `/blog/slug/index.html` instead of
 * `/blog/slug.html`, which Apache serves correctly with no rewrite rules.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    // No Node image server on shared hosting — ship the original files.
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Fail the build on type errors rather than shipping a broken export.
  // (Next 16 dropped the `eslint` config key; run `npm run lint` separately.)
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
