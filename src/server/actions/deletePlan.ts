"use server"

import { redirect } from "next/navigation"

import createSupabaseServerClient from "@/lib/supabase/server"

export default async function deletePlan(planId: string) {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  await supabase.from("plan").delete().eq("id", planId)
  redirect("/plans")
}
