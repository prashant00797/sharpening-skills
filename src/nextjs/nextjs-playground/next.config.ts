import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This playground lives inside a larger repo. Pin Turbopack's root to this
  // folder so it doesn't treat the outer repo as the workspace root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
