import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"

export default async function getUserWorkouts() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("workout")
    .select("id, duration, created_at, updated_at")
    .order("updated_at", { ascending: true })
    .eq("user_id", user?.id)
    .returns<Database["public"]["Tables"]["workout"]["Row"][]>()

  if (error) {
    throw new Error("Failed to fetch workouts")
  }

  return data
}
