/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import "./src/env.js"

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ define rewrites as a function property here
  async rewrites() {
    return [
      {
        source: "/relay-eYDI/:path*", // optional alias route
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/:path*", // required for PostHog events
        destination: "https://us.i.posthog.com/:path*",
      },
    ]
  },

  // ✅ this prevents Next from redirecting `/ingest/` → `/ingest`
  skipTrailingSlashRedirect: true,
}

export default config
