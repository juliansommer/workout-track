import Heading from "@/components/Heading"
import createSupabaseServerClient from "@/lib/supabase/server"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "User",
  alternates: {
    canonical: "/user",
  },
}

export default async function User() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  return (
    <>
      <Heading title="User" />
      <div>
        <p>{JSON.stringify(user)}</p>
      </div>
    </>
  )
}
