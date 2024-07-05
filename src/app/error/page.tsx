import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Error",
  alternates: {
    canonical: "/error",
  },
}

export default function Error() {
  return <p>Sorry, something went wrong</p>
}
