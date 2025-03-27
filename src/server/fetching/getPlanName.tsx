import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"

export default async function getPlanName(planId: string) {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("plan")
    .select("name")
    .eq("id", planId)
    .returns<Database["public"]["Tables"]["plan"]["Row"][]>()
    .single()

  if (error) {
    throw new Error("Failed to fetch plan details")
  }

  return data.name
}
