import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

const components: MDXComponents = {
  // h1: ({ children }) => (
  //   <h1
  //     className="mt-8 mb-4 text-3xl font-bold tracking-tight"
  //     style={{ color: "oklch(72.3% 0.219 149.579)" }}
  //   >
  //     {children}
  //   </h1>
  // ),
  // p: ({ children }) => (
  //   <p className="leading-7 not-first:mt-6 text-foreground">{children}</p>
  // ),
  img: (props) => (
    <div className="my-6">
      <Image
        sizes="100vw"
        width={800}
        height={450}
        className="rounded-lg border border-white/10"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
        alt={props.alt || "MDX Image"}
      />
    </div>
  ),
};

export function useMDXComponents(
  providedComponents: MDXComponents,
): MDXComponents {
  return {
    ...providedComponents,
    ...components,
  };
}
