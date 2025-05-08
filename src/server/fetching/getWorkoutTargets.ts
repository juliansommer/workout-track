import createSupabaseServerClient from "@/lib/supabase/server"
import type { WorkoutTargets } from "@/types/workoutForm"

interface TempWorkoutData {
  workout_exercise: {
    exercise_id: string
    set: {
      weight: number
      reps: number
      order: number
    }[]
  }[]
}

export default async function getWorkoutTargets(planId: string) {
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
        workout_exercise (
          exercise_id,
          set (
            weight,
            reps,
            order
          )
        )
      `,
    )
    .eq("plan_id", planId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()
    .overrideTypes<TempWorkoutData>()

  if (error) {
    if (error.code === "PGRST116") {
      // No workout found for the given planId
      // meaning its first time tracking for this plan
      // so we can return an empty object
      return {}
    }
    throw new Error("Failed to fetch workout details")
  }

  // Transform data into the required format
  // this format is required as we need to be able to use exercise_id and set_number as keys
  const formattedData: WorkoutTargets = {}

  // Check if there's any workout data
  if (data?.workout_exercise) {
    // Iterate through each exercise
    data.workout_exercise.forEach((exercise) => {
      const exerciseId = exercise.exercise_id
      formattedData[exerciseId] ??= {}

      // Iterate through sets for this exercise
      if (exercise.set) {
        exercise.set.forEach((set) => {
          // Use set order as the set number (zero-indexed)
          const setNumber = set.order

          formattedData[exerciseId] = formattedData[exerciseId] ?? {}
          formattedData[exerciseId][setNumber] = {
            weight: set.weight,
            reps: set.reps,
          }
        })
      }
    })
  }

  return formattedData
}
