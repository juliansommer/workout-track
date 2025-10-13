import createSupabaseServerClient from "@/lib/supabase/server"

interface WorkoutDetails {
  created_at: string
  workout_exercise: {
    exercise: {
      name: string
      image: string
    }
    set: {
      id: string
      weight: number
      reps: number
    }[]
  }[]
}

export default async function getSpecificWorkout(
  workoutId: string,
): Promise<WorkoutDetails> {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const claims = await supabase.auth.getClaims()
  const user = claims.data?.claims.sub

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
            id,
            weight,
            reps
          )
        )
      `,
    )
    .eq("id", workoutId)
    .single()

  if (error) {
    throw new Error("Failed to fetch workout details", { cause: error })
  }

  return data
}
