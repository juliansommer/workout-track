import createSupabaseServerClient from "@/lib/supabase/server"

export default async function getWorkoutTime(workoutId: string) {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("workout")
    .select("created_at")
    .eq("id", workoutId)
    .single()
    .overrideTypes<{ created_at: string }>()

  if (error) {
    throw new Error("Failed to fetch plan details")
  }

  return data.created_at
}
