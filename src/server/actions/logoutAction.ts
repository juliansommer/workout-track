"use server"
import createSupabaseServerClient from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function logoutAction() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect("/")
}
