import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    // lidl-core uses strict: false in its own tsconfig
    ignoreBuildErrors: true,
  },
  transpilePackages: ["lidl-core"],
  turbopack: {
    root: path.resolve(__dirname),
  },
  webpack: (config) => {
    config.resolve.alias["lidl-core"] = path.resolve(
      __dirname,
      "../lidl-core",
    );
    return config;
  },
};

export default nextConfig;
