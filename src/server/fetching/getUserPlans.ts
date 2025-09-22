import createSupabaseServerClient from "@/lib/supabase/server"
import type { Database } from "@/types/supabase"

type Plan = Pick<
  Database["public"]["Tables"]["plan"]["Row"],
  "id" | "name" | "notes"
>

export default async function getUserPlans(): Promise<Plan[]> {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const claims = await supabase.auth.getClaims()
  const user = claims.data?.claims.sub

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("plan")
    .select("id, name, notes")
    .order("name", { ascending: true })
    .eq("user_id", user)

  if (error) {
    throw new Error("Failed to fetch plans")
  }

  return data
}
