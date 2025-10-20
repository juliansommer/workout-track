import type { NextConfig } from "next"

import "./src/env.ts"

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self';
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  connect-src 'self' https://nsfllbqyozduniyhtfpa.supabase.co;
  upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
    useCache: true,
  },
  cacheComponents: true,
  poweredByHeader: false,
  reactCompiler: true,
  typedRoutes: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/exercises",
        destination: "/exercises/p/1",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
