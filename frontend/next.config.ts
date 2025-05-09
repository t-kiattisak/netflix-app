import createNextIntlPlugin from "next-intl/plugin"
import type { NextConfig } from "next"

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  /* config options here */
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "x-robots-tag",
          value: "noindex",
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
    deviceSizes: [640, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
}

export default withNextIntl(nextConfig)
