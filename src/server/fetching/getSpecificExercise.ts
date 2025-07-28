import createSupabaseServerClient from "@/lib/supabase/server"

export default async function getSpecificExercise(exercise: string) {
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
