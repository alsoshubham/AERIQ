import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix Turbopack lockfile root detection warning
  turbopack: {
    root: __dirname,
  },

  // Allow external images from Unsplash (used in ApplicationsSection)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },

};

export default nextConfig;
