"use server"

import createSupabaseServerClient from "@/lib/supabase/server"
import { setsSchema, type SetsSchema } from "@/types/workoutForm"

interface WorkoutData {
  id: string
  sets: SetsSchema
}

export default async function createWorkout(workoutData: WorkoutData) {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  // zod parse
  try {
    setsSchema.parse(workoutData.sets)
  } catch {
    throw new Error("Invalid form data")
  }

  // create main workout record
  const workoutId = crypto.randomUUID()
  const { error } = await supabase.from("workout").insert({
    id: workoutId,
    user_id: user.id,
    plan_id: workoutData.id,
  })

  if (error) {
    throw new Error("Failed to create workout")
  }

  // then create workout_exercise records
  if (!workoutData.sets) {
    throw new Error("Workout sets not found")
  }

  const setKeys = Object.keys(workoutData.sets)
  for (let i = 0; i < setKeys.length; i++) {
    const workoutExerciseId = crypto.randomUUID()

    const key = setKeys[i]
    if (key === undefined) {
      throw new Error("Set key is undefined")
    }

    const exerciseSet = workoutData.sets[key]
    if (!exerciseSet) {
      throw new Error("Exercise set not found")
    }

    const { error } = await supabase.from("workout_exercise").insert({
      id: workoutExerciseId,
      workout_id: workoutId,
      exercise_id: setKeys[i],
      order: i,
    })

    if (error) {
      throw new Error("Failed to create workout_exercise")
    }

    // loop through sets and insert them
    for (let j = 0; j < exerciseSet.length; j++) {
      const setId = crypto.randomUUID()
      const set = exerciseSet[j]
      if (!set) {
        throw new Error("Set not found")
      }

      const { error } = await supabase.from("set").insert({
        id: setId,
        workout_exercise_id: workoutExerciseId,
        weight: set.weight,
        reps: set.reps,
        order: j,
      })

      if (error) {
        throw new Error("Failed to create set")
      }
    }

    if (error) {
      throw new Error("Failed to create workout_exercise")
    }
  }
}
