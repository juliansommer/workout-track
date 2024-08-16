import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"
import { type Metadata } from "next"
import { v4 as uuidv4 } from "uuid"
import PlanForms from "./_components/PlanForms"

export const metadata: Metadata = {
  title: "Create Plan",
  alternates: {
    canonical: "/plans/create",
  },
}

interface Form {
  name: string
  notes: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function OnSubmit(formData: Form, selectedExercises: any[]) {
  "use server"
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      exercise_id: exercise.value,
    })

    if (error) {
      throw new Error("Failed to create plan_exercise")
    }
  }
}

export default async function CreatePlan() {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from("exercise")
    .select("id, name")
    .order("name", { ascending: true })
    .returns<Database["public"]["Tables"]["exercise"]["Row"][]>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return (
    <div className="w-full max-w-3xl p-5">
      <p>Create Plan</p>
      <PlanForms data={data} OnSubmit={OnSubmit} />
    </div>
  )
}
