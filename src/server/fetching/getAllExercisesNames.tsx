import createSupabaseServerClient from "@/lib/supabase/server"

export default async function getAllExercisesNames() {
  const supabase = await createSupabaseServerClient()

  // exercises are public so no need to check for user

  const { data, error } = await supabase
    .from("exercise")
    .select("id, name")
    .order("name", { ascending: true })
    .overrideTypes<{ id: string; name: string }[]>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return data
}
