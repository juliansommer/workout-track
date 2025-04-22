import createSupabaseServerClient from "@/lib/supabase/server"

interface SpecificWorkoutData {
  created_at: string
  workout_exercise: {
    exercise: {
      name: string
      image: string
    }
    set: {
      weight: number
      reps: number
    }[]
  }[]
}

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
    .overrideTypes<SpecificWorkoutData>()

  if (error) {
    throw new Error("Failed to fetch workout details")
  }

  return data
}
