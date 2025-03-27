import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"

export default async function getUserPlans() {
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
    .select("id, name, notes")
    .order("name", { ascending: true })
    .eq("user_id", user?.id)
    .returns<Database["public"]["Tables"]["plan"]["Row"][]>()

  if (error) {
    throw new Error("Failed to fetch plans")
  }

  return data
}
