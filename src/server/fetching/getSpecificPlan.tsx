import createSupabaseServerClient from "@/lib/supabase/server"
import type { PlanData } from "@/types"
import { type Database } from "@/types/supabase"

export default async function getSpecificPlans(planId: string) {
  const supabase = createSupabaseServerClient()

  // get the initial plan name and notes
  const { data: planData, error: planError } = await supabase
    .from("plan")
    .select("name, notes")
    .eq("id", planId)
    .returns<Database["public"]["Tables"]["plan"]["Row"][]>()
    .single()

  if (planError) {
    throw new Error("Failed to fetch plan details")
  }

  // use planId to get all the exercises for the plan
  const { data: exercisesData, error: exercisesError } = await supabase
    .from("plan_exercise")
    .select("sets, exercise_id")
    .eq("plan_id", planId)
    .returns<Database["public"]["Tables"]["plan_exercise"]["Row"][]>()

  if (exercisesError) {
    throw new Error("Failed to fetch exercises from plan_exercise")
  }

  // get the exercise name and image for each exercise
  const exerciseIds = exercisesData.map((exercise) => exercise.exercise_id)
  const { data: exerciseDetailsData, error: exerciseDetailsError } =
    await supabase
      .from("exercise")
      .select("id, name, image")
      .in("id", exerciseIds)
      .returns<Database["public"]["Tables"]["exercise"]["Row"][]>()

  if (exerciseDetailsError) {
    throw new Error("Failed to fetch exercises from exercise")
  }

  // combine all the data into one object
  const combinedData: PlanData = {
    name: planData.name,
    notes: planData.notes,
    exercises: exercisesData.map((exercise) => {
      const exerciseDetails = exerciseDetailsData.find(
        (detail) => detail.id === exercise.exercise_id,
      )
      return {
        sets: exercise.sets,
        name: exerciseDetails?.name,
        image: exerciseDetails?.image,
      }
    }),
  }

  return combinedData
}
