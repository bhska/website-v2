import type { NextConfig } from 'next';
import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['pub-04a7d9d106494ffdb1f0a353e63a9891.r2.dev', 'bucket.bhsk.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bucket.bhsk.dev',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'pub-04a7d9d106494ffdb1f0a353e63a9891.r2.dev',
        port: '',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withMDX(nextConfig);
