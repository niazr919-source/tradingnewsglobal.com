import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow SVG cover files placed in /public to be used with next/image.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // To use remote photos (e.g. from Unsplash), add their host here, for example:
    // remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
