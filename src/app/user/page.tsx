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
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <Heading title="User" />
      <div>
        <p>{JSON.stringify(user)}</p>
      </div>
    </>
  )
}
