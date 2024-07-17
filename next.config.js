/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nsfllbqyozduniyhtfpa.supabase.co", // Supabase S3 URL
        port: "",
        pathname: "/storage/v1/object/public/**", // Path to images
      },
    ],
  },
}

export default config
