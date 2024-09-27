"use server"
import createSupabaseServerClient from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function deletePlan(planId: string) {
  const supabase = createSupabaseServerClient()

  // check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  await supabase.from("plan").delete().eq("id", planId)
  redirect("/plans")
}
