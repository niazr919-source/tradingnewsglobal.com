import { isValidElement, type ReactNode } from "react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";
import { Diagram, isDiagramId } from "@/components/Diagram";

/** Flatten React children into a plain string for slug generation. */
function toText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement(node)) {
    return toText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function headingId(children: ReactNode): string {
  return slugify(toText(children));
}

/** Server-rendered markdown/MDX body with GFM support and anchor-linked headings. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-primary prose-img:rounded-xl prose-table:text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // react-markdown strips URLs whose protocol it does not recognise, which
        // would silently drop our `diagram:` figures. Let those through and
        // defer to the default sanitiser for everything else.
        urlTransform={(url) =>
          url.startsWith("diagram:") ? url : defaultUrlTransform(url)
        }
        components={{
          h2: ({ children }) => <h2 id={headingId(children)}>{children}</h2>,
          h3: ({ children }) => <h3 id={headingId(children)}>{children}</h3>,
          // Markdown wraps a standalone image in a paragraph, but <figure> and
          // <figcaption> are not valid inside <p> - the browser closes the
          // paragraph early and React's hydration then fails. When the sole
          // child of a paragraph is a diagram, drop the wrapper.
          p: ({ node, children }) => {
            // Decide from the source tree rather than from the rendered output:
            // a paragraph whose only content is a diagram image must not emit a
            // <p>, because <figure> cannot legally sit inside one.
            const kids = (node?.children ?? []).filter(
              (c) => c.type !== "text" || c.value.trim() !== "",
            );
            const lone = kids.length === 1 ? kids[0] : undefined;
            if (
              lone &&
              lone.type === "element" &&
              lone.tagName === "img" &&
              typeof lone.properties?.src === "string" &&
              lone.properties.src.startsWith("diagram:")
            ) {
              return <>{children}</>;
            }
            return <p>{children}</p>;
          },
          // `![caption](diagram:some-id)` renders one of our own SVG diagrams.
          // Using the image syntax keeps raw HTML disabled in the pipeline.
          img: ({ src, alt }) => {
            const url = typeof src === "string" ? src : "";
            if (url.startsWith("diagram:")) {
              const id = url.slice("diagram:".length);
              if (isDiagramId(id)) return <Diagram id={id} caption={alt} />;
              return null;
            }
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={url} alt={alt ?? ""} loading="lazy" decoding="async" />;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
