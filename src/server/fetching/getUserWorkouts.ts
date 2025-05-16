import createSupabaseServerClient from "@/lib/supabase/server"

interface ExtendedWorkout {
  id: string
  created_at: string
  updated_at: string
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

export default async function getUserWorkouts() {
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
        id,
        created_at,
        updated_at,
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
    .order("updated_at", { ascending: false })
    .eq("user_id", user?.id)
    .overrideTypes<ExtendedWorkout[]>()

  if (error) {
    throw new Error("Failed to fetch workouts")
  }

  return data
}
