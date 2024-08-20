"use server"
import createSupabaseServerClient from "@/lib/supabase/server"
import type { ExerciseDropdown, PlanFormsProps } from "@/types"
import { v4 as uuidv4 } from "uuid"

export default async function createPlans(
  formData: PlanFormsProps,
  selectedExercises: ExerciseDropdown[],
) {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

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

  for (const exercise of selectedExercises) {
    const { error } = await supabase.from("plan_exercise").insert({
      plan_id: plan_id,
      exercise_id: exercise.value,
    })

    if (error) {
      throw new Error("Failed to create plan_exercise")
    }
  }
}
