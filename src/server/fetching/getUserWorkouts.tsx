import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"
import type { UUID } from "node:crypto"

type ExtendedWorkout = Database["public"]["Tables"]["workout"]["Row"] & {
  plan: {
    name: string
  }
  workout_exercise: {
    exercise_id: UUID
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
        plan(name),
        workout_exercise (
          exercise_id,
          exercise (
            name
          )
        )
      `,
    )
    .order("updated_at", { ascending: true })
    .eq("user_id", user?.id)
    .returns<ExtendedWorkout[]>()

  if (error) {
    throw new Error("Failed to fetch workouts")
  }

  return data
}
