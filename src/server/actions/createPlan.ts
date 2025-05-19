"use server"

import createSupabaseServerClient from "@/lib/supabase/server"
import { planFormSchema, type PlanForm } from "@/types/planForm"

export default async function createPlan(formData: PlanForm) {
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
    planFormSchema.parse(formData)
  } catch {
    throw new Error("Invalid form data")
  }

  // insert the plan
  const planId = crypto.randomUUID()
  const { error } = await supabase.from("plan").insert({
    id: planId,
    user_id: user.id,
    name: formData.name,
    notes: formData.notes,
  })

  if (error) {
    throw new Error("Failed to create plan")
  }

  // loop through exercises and insert them
  for (const exercise of formData.exercises) {
    const { error } = await supabase.from("plan_exercise").insert({
      plan_id: planId,
      exercise_id: exercise.value,
      sets: exercise.sets,
    })

    if (error) {
      throw new Error("Failed to create plan_exercise")
    }
  }
}
