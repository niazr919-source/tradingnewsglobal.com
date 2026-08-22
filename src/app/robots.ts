import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Required by `output: "export"` — emits a static robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly welcome the AdSense crawler so it can read every page it
      // needs to during review and, later, to target ads.
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
      },
    ],
    sitemap: `${absoluteUrl("/").replace(/\/$/, "")}/sitemap.xml`,
  };
}
