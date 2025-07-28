import createSupabaseServerClient from "@/lib/supabase/server"

export default async function getSpecificWorkout(workoutId: string) {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("workout")
    .select(
      `
        created_at,
        workout_exercise (
          exercise (
            name,
            image
          ),
          set (
            weight,
            reps
          )
        )
      `,
    )
    .eq("id", workoutId)
    .single()

  if (error) {
    throw new Error("Failed to fetch workout details")
  }

  return data
}
