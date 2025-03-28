"use server"
import createSupabaseServerClient from "@/lib/supabase/server"
import { v4 as uuidv4 } from "uuid"

interface WorkoutData {
  id: string
  sets: Record<string, { weight: string; reps: string }[]>
}

export default async function saveWorkout(workoutData: WorkoutData) {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  // create main workout record
  const workout_id = uuidv4()
  const { error } = await supabase.from("workout").insert({
    id: workout_id,
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
    const workout_exercise_id = uuidv4()

    const key = setKeys[i]
    if (key === undefined) {
      throw new Error("Set key is undefined")
    }

    const exerciseSet = workoutData.sets[key]
    if (!exerciseSet) {
      throw new Error("Exercise set not found")
    }

    const { error } = await supabase.from("workout_exercise").insert({
      id: workout_exercise_id,
      workout_id: workout_id,
      exercise_id: setKeys[i],
      order: i,
    })

    if (error) {
      throw new Error("Failed to create workout_exercise")
    }

    // loop through sets and insert them
    for (let j = 0; j < exerciseSet.length; j++) {
      const set_id = uuidv4()
      const set = exerciseSet[j]
      if (!set) {
        throw new Error("Set not found")
      }

      const { error } = await supabase.from("set").insert({
        id: set_id,
        workout_exercise_id: workout_exercise_id,
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
