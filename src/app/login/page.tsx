import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { robotsMetadata } from "@/lib/robotsMetadata"
import createSupabaseServerClient from "@/lib/supabase/server"

import LoginForm from "./_components/LoginForm"

export const metadata: Metadata = {
  title: "Login",
  alternates: {
    canonical: "/login",
  },
  robots: robotsMetadata,
}

export default async function Login() {
  const supabase = await createSupabaseServerClient()
  const claim = await supabase.auth.getClaims()
  const user = claim.data?.claims.sub

  if (user) {
    redirect("/")
  }

  return (
    <div className="mx-auto flex h-full items-center justify-center px-6 py-12">
      <LoginForm />
    </div>
  )
}
