import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
