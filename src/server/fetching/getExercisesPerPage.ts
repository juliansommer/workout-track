import createSupabaseServerClient from "@/lib/supabase/server"
import type { ExerciseData } from "@/types"

export default async function getExercisesPerPage(
  page: number,
  per_page: number,
) {
  const start = (page - 1) * per_page
  const end = start + per_page - 1

  const supabase = await createSupabaseServerClient()

  // exercises are public so no need to check for user

  const { data, error } = await supabase
    .from("exercise")
    .select("name, image, primary_muscles")
    .order("name", { ascending: true })
    .range(start, end)
    .overrideTypes<ExerciseData[], { merge: false }>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return data
}
