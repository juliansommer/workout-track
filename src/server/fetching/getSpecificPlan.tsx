import createSupabaseServerClient from "@/lib/supabase/server"
import type { PlanData } from "@/types"

interface TempPlanData {
  id: string
  name: string
  notes: string
  plan_exercise: {
    exercise_id: string
    sets: number
    exercise: {
      id: string
      name: string
      image: string
    }
  }[]
}

export default async function getSpecificPlan(planId: string) {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("plan")
    .select(
      `
        id,
        name,
        notes,
        plan_exercise (
          exercise_id,
          sets,
          exercise (
            id,
            name,
            image
          )
        )
      `,
    )
    .eq("id", planId)
    .single()
    .overrideTypes<TempPlanData>()

  if (error) {
    throw new Error("Failed to fetch plan details")
  }

  // reformat the data to match the PlanData type
  const combinedData: PlanData = {
    id: data.id,
    name: data.name,
    notes: data.notes,
    exercises: data.plan_exercise.map((plan_exercise) => {
      return {
        id: plan_exercise.exercise_id,
        sets: plan_exercise.sets,
        name: plan_exercise.exercise.name,
        image: plan_exercise.exercise.image,
      }
    }),
  }

  return combinedData
}
