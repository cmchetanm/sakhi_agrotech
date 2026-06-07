import type { NextConfig } from "next";

const railsApiUrl = process.env.RAILS_API_URL || "http://localhost:3001";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "3000" },
      { protocol: "http", hostname: "localhost", port: "3001" },
      { protocol: "https", hostname: "sakhiagrotech.com" },
    ],
  },
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${railsApiUrl}/api/:path*` },
      { source: "/rails/:path*", destination: `${railsApiUrl}/rails/:path*` },
    ];
  },
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/initiatives", destination: "/", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      { source: "/video", destination: "/", permanent: true },
      { source: "/connect", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
