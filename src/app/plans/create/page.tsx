import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"
import { type Metadata } from "next"
import PlanForms from "./_components/PlanForms"

export const metadata: Metadata = {
  title: "Create Plan",
  alternates: {
    canonical: "/plans/create",
  },
}

export default async function CreatePlan() {
  const supabase = createSupabaseServerClient()
  // might need the id of exercise as well
  const { data, error } = await supabase
    .from("exercise")
    .select("name")
    .order("name", { ascending: true })
    .returns<Database["public"]["Tables"]["exercise"]["Row"][]>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return (
    <div className="w-full max-w-3xl p-5">
      <p>Create Plan</p>
      <PlanForms data={data} />
    </div>
  )
}
