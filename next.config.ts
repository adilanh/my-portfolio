import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    basePath: isProd ? "/my-portfolio" : "",
    assetPrefix: isProd ? "/my-portfolio/" : "",
  };
  export default nextConfig;