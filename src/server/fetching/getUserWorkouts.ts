import createSupabaseServerClient from "@/lib/supabase/server"

interface WorkoutData {
  id: string
  created_at: string
  plan: {
    name: string
  }
  workout_exercise: {
    exercise_id: string
    exercise: {
      name: string
    }
  }[]
}

export default async function getUserWorkouts(): Promise<WorkoutData[]> {
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
        id,
        created_at,
        plan (
          name
        ),
        workout_exercise (
          exercise_id,
          exercise (
            name
          )
        )
      `,
    )
    .order("created_at", { ascending: false })
    .eq("user_id", user)

  if (error) {
    throw new Error("Failed to fetch workouts")
  }

  return data
}
