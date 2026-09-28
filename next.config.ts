import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig: NextConfig = {
  output: isExport ? 'export' : undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: isExport ? true : false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  ...(isExport
    ? {}
    : {
        async redirects() {
          return [
            {
              source: '/:path*',
              has: [
                {
                  type: 'host',
                  value: 'stackaitools.com',
                },
              ],
              destination: 'https://www.stackaitools.com/:path*',
              permanent: true,
            },
          ];
        },
        async rewrites() {
          return [
            {
              source: '/sitemap.xml',
              destination: '/sitemap-index.xml',
            },
          ];
        },
      }),
};

export default nextConfig;
