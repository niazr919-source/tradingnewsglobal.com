import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Required by `output: "export"` — emits a static robots.txt at build time.
export const dynamic = "force-static";

/**
 * The wildcard rule already permits everything, so these named entries change
 * no behaviour. They are here to make the intent explicit and durable: this site
 * WANTS to be read by answer engines, because being cited in an AI answer is a
 * distribution channel, not a leak.
 *
 * If that judgement ever changes, disallowing a crawler here is the only place
 * it needs to change.
 */
const answerEngineCrawlers = [
  "GPTBot", // OpenAI, trains and powers ChatGPT browsing
  "OAI-SearchBot", // OpenAI search
  "ChatGPT-User", // ChatGPT fetching a page a user asked about
  "ClaudeBot", // Anthropic
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // powers Copilot alongside Bing search
  "Amazonbot",
  "CCBot", // Common Crawl, feeds many training sets
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },

      // Advertising crawlers.
      { userAgent: "Mediapartners-Google", allow: "/" },
      { userAgent: "AdsBot-Google", allow: "/" },

      // Answer engines and AI assistants, named explicitly.
      ...answerEngineCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
