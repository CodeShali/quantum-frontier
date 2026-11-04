import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  site: "https://codeshali.github.io",
  base: "/quantum-frontier",
  markdown: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] },
});
