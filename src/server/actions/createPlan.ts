"use server"
import createSupabaseServerClient from "@/lib/supabase/server"
import { planFormSchema, type PlanForm } from "@/types/planForm"
import { v4 as uuidv4 } from "uuid"

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
  const plan_id = uuidv4()
  const { error } = await supabase.from("plan").insert({
    id: plan_id,
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
      plan_id: plan_id,
      exercise_id: exercise.value,
      sets: exercise.sets,
    })

    if (error) {
      throw new Error("Failed to create plan_exercise")
    }
  }
}
