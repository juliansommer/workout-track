"use server"
import createSupabaseServerClient from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function deletePlan(planId: string) {
  const supabase = createSupabaseServerClient()
  await supabase.from("plan").delete().eq("id", planId)
  redirect("/plans")
}
