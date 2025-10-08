import createSupabaseServerClient from "@/lib/supabase/server"

export default async function getPlanName(planId: string): Promise<string> {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const claims = await supabase.auth.getClaims()
  const user = claims.data?.claims.sub

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("plan")
    .select("name")
    .eq("id", planId)
    .single()

  if (error) {
    throw new Error("Failed to fetch plan details", { cause: error })
  }

  return data.name
}
