import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import createSupabaseServerClient from "@/lib/supabase/server"
import { type Metadata } from "next"
import AddExercise from "./_components/AddExercise"

export const metadata: Metadata = {
  title: "Create Plan",
  alternates: {
    canonical: "/plans/create",
  },
}

export default async function CreatePlan() {
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from("exercise")
    .select("name")
    .order("name", { ascending: true })

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return (
    <div className="w-full max-w-3xl p-5">
      <p>Create Plan</p>
      <div className="w-full pt-5">
        <Input type="text" placeholder="Name" />
      </div>
      <div className="pt-5">
        <Textarea placeholder="Notes" />
      </div>
      <AddExercise data={data ?? {}} />
    </div>
  )
}
