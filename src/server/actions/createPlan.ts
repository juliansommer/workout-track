"use server"

import createSupabaseServerClient from "@/lib/supabase/server"
import { type PlanFormData, planFormSchema } from "@/types/planForm"

export default async function createPlan(
  formData: PlanFormData,
): Promise<void> {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const claims = await supabase.auth.getClaims()
  const user = claims.data?.claims.sub

  if (!user) {
    throw new Error("User not found")
  }

  // zod parse
  try {
    planFormSchema.parse(formData)
  } catch {
    throw new Error("Invalid form data")
  }

  // insert the plan
  const planId = crypto.randomUUID()
  const { error } = await supabase.from("plan").insert({
    id: planId,
    user_id: user,
    name: formData.name,
    notes: formData.notes,
  })

  if (error) {
    throw new Error("Failed to create plan", { cause: error })
  }

  // loop through exercises and insert them
  for (const exercise of formData.exercises) {
    const { error: error2 } = await supabase.from("plan_exercise").insert({
      plan_id: planId,
      exercise_id: exercise.value,
      sets: exercise.sets,
    })

    if (error2) {
      throw new Error("Failed to create plan_exercise", { cause: error2 })
    }
  }
}
