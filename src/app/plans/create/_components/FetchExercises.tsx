import createSupabaseServerClient from "@/lib/supabase/server"
import AddExercise from "./AddExercise"

export default async function FetchExercises() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("exercise")
    .select("name")
    .order("name", { ascending: true })

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return <AddExercise data={data ?? {}} />
}
