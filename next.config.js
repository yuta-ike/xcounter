const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "development"
        ? undefined
        : {
          exclude: ["error"],
        },
  },
  experimental: {
    scrollRestoration: true,
    typedRoutes: true,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
