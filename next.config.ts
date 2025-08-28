import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
   remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnimg.brunomarc.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "u-mercari-images.mercdn.net",
      },
      {
      protocol: "https",
      hostname: "**", // allow all hosts
    },
    ],
  },

};

export default nextConfig;
