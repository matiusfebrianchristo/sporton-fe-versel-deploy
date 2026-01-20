import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['**'],
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "be-sporton.agunacourse.com",
      pathname: "/uploads/**"
    }]
  }
};

export default nextConfig;
