import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication Error",
  alternates: {
    canonical: "/auth/error",
  },
}

export default function Error() {
  return <p>Sorry, something went wrong when logging in, please try again</p>
}
