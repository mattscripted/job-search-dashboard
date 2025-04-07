import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Optional: you can add remark/rehype plugins if needed
});

export default withFlowbiteReact(withMDX(nextConfig));
