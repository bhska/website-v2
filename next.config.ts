import type { NextConfig } from 'next';
import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', 'clsx', 'tailwind-merge'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
  headers: async () => [
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
      ],
    },
  ],
};

export default withMDX(nextConfig);
