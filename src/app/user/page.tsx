import Heading from "@/components/Heading"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "User",
  alternates: {
    canonical: "/user",
  },
}

export default async function User() {
  return (
    <>
      <Heading title="User" />
      <div>
        <p>user</p>
      </div>
    </>
  )
}
