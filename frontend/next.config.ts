import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.strapiapp.com", // Для prodaction Strapi на Strapi Cloud
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**", // Для інших production серверів
      },
    ],
  },
};

export default nextConfig;
