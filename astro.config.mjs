import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
// https://astro.build/config
export default defineConfig({
  site: "https://frickeldave.github.io",
  base: "/",
  output: "static", // GitHub Pages requires static output
  trailingSlash: "ignore",
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    react(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      /*
       * IMPORTANT: The Youtube component (@shortcodes/Youtube) has been temporarily removed from auto-imports
       * due to an ES module compatibility issue with the 'react-lite-youtube-embed' dependency.
       *
       * Problem Description:
       * - The Youtube component uses 'react-lite-youtube-embed' which contains CommonJS syntax (require())
       * - This library's package.json defines "type": "module", making it an ES module
       * - The conflict between CommonJS usage and ES module declaration causes a runtime error:
       *   "require is not defined in ES module scope, you can use import instead"
       *
       * Impact:
       * - When auto-imported, this component is loaded into every MDX file, even when not used
       * - This causes MDX files to fail compilation with the above error
       * - Only affects MDX files, regular .md files work fine as they don't process imports
       *
       * Solutions considered:
       * 1. Replace 'react-lite-youtube-embed' with a modern ES module alternative
       * 2. Create a wrapper component that dynamically imports the problematic dependency
       * 3. Remove from auto-imports and manually import when needed (current solution)
       *
       * Current workaround:
       * - Youtube component removed from auto-imports array
       * - Can still be manually imported in specific files when needed:
       *   import Youtube from "@shortcodes/Youtube";
       * - This prevents the error from affecting all MDX files
       *
       * TODO: Replace react-lite-youtube-embed with a modern ES module alternative
       */
      imports: [
        "@components/common/Button.astro",
        "@shortcodes/Accordion",
        "@shortcodes/Notice",
        "@shortcodes/Tabs",
        "@shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
      remarkMath,
    ],
    rehypePlugins: [[rehypeKatex, {}]],
    shikiConfig: {
      themes: {
        // https://shiki.style/themes
        light: "light-plus",
        dark: "dark-plus",
      },
    },
    extendDefaultPlugins: true,
  },
});
