import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import rehypePrettyCode from "rehype-pretty-code";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypePrettyCode]
  },
});

export default withFlowbiteReact(withMDX(nextConfig));
