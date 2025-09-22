import createSupabaseServerClient from "@/lib/supabase/server"
import type { ExerciseData } from "@/types"

export default async function getExercisesPerPage(
  page: number,
): Promise<ExerciseData[]> {
  const start = (page - 1) * 10
  const end = start + 9

  const supabase = await createSupabaseServerClient()

  // exercises are public so no need to check for user

  const { data, error } = await supabase
    .from("exercise")
    .select("name, image, primary_muscles")
    .order("name", { ascending: true })
    .range(start, end)

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return data
}
