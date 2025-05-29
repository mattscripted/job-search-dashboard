import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import rehypePrettyCode from "rehype-pretty-code";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // Redirect MVP directly to behavioural interviews
      {
        source: '/',
        destination: '/behavioural-interviews',
        permanent: false,
      },
      // Hide previous pages from MVP
      {
        source: '/cheat-sheets',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/cheat-sheets/:slug',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/practice',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/resources',
        destination: '/404',
        permanent: false,
      }
    ]
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypePrettyCode]
  },
});

export default withFlowbiteReact(withMDX(nextConfig));
