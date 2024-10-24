import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"

export default async function getUserPlans() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

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
