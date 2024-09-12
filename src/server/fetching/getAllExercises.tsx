import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"

export default async function getAllExercises() {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from("exercise")
    .select("id, name")
    .order("name", { ascending: true })
    .returns<Database["public"]["Tables"]["exercise"]["Row"][]>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return data
}
