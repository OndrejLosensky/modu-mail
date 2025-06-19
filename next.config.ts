import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  removeConsole: {
    exclude: ['error', 'warn', 'log', 'info']
  }
};

export default nextConfig;
