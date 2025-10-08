import createSupabaseServerClient from "@/lib/supabase/server"
import type { Database } from "@/types/supabase"

type ExerciseNames = Pick<
  Database["public"]["Tables"]["exercise"]["Row"],
  "id" | "name"
>

export default async function getAllExercisesNames(): Promise<ExerciseNames[]> {
  const supabase = await createSupabaseServerClient()

  // exercises are public so no need to check for user

  const { data, error } = await supabase
    .from("exercise")
    .select("id, name")
    .order("name", { ascending: true })

  if (error) {
    throw new Error("Failed to fetch exercises", { cause: error })
  }

  return data
}
