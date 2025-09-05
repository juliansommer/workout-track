"use server"

import { redirect } from "next/navigation"

import createSupabaseServerClient from "@/lib/supabase/server"

export default async function deletePlan(planId: string) {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const claims = await supabase.auth.getClaims()
  const user = claims.data?.claims.sub

  if (!user) {
    throw new Error("User not found")
  }

  await supabase.from("plan").delete().eq("id", planId)
  redirect("/plans")
}
