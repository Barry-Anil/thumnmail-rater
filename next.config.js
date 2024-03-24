/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "neighborly-bulldog-636.convex.cloud",
        },
        {
          hostname: "silent-eel-513.convex.cloud",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
