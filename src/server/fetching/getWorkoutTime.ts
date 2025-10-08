import createSupabaseServerClient from "@/lib/supabase/server"

export default async function getWorkoutTime(
  workoutId: string,
): Promise<string> {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const claims = await supabase.auth.getClaims()
  const user = claims.data?.claims.sub

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("workout")
    .select("created_at")
    .eq("id", workoutId)
    .single()

  if (error) {
    throw new Error("Failed to fetch plan details", { cause: error })
  }

  return data.created_at
}
