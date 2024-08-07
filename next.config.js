/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.S3_HOSTNAME ?? "",
        port: "",
        pathname: process.env.S3_PATH,
      },
    ],
  },
}

export default config
