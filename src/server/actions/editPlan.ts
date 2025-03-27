"use server"
import type { PlanFormSchema } from "@/components/PlanForms"
import { planFormSchema } from "@/components/PlanForms"
import createSupabaseServerClient from "@/lib/supabase/server"

export default async function editPlan(
  planId: string,
  formData: PlanFormSchema,
) {
  const supabase = await createSupabaseServerClient()

  // check auth
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

  // update the plan with name and notes
  const { error } = await supabase
    .from("plan")
    .update({
      name: formData.name,
      notes: formData.notes,
    })
    .eq("id", planId)

  if (error) {
    throw new Error("Failed to create plan")
  }

  // delete the old exercises
  const { error: exerciseError } = await supabase
    .from("plan_exercise")
    .delete()
    .eq("plan_id", planId)

  if (exerciseError) {
    throw new Error("Failed to delete exercises")
  }

  // insert the new exercises
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
