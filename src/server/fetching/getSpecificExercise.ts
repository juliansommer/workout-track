import createSupabaseServerClient from "@/lib/supabase/server"
import type { Database } from "@/types/supabase"

type Exercise = Pick<
  Database["public"]["Tables"]["exercise"]["Row"],
  "name" | "image" | "primary_muscles" | "secondary_muscles" | "instructions"
>

export default async function getSpecificExercise(
  exercise: string,
): Promise<Exercise> {
  const supabase = await createSupabaseServerClient()

  // exercises are public so no need to check for user

  const { data, error } = await supabase
    .from("exercise")
    .select("name, image, primary_muscles, secondary_muscles, instructions")
    .eq("name", exercise)
    .single()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return data
}
