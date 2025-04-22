import createSupabaseServerClient from "@/lib/supabase/server"

export default async function getPlanName(planId: string) {
  const supabase = await createSupabaseServerClient()

  // get the user and check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not found")
  }

  const { data, error } = await supabase
    .from("plan")
    .select("name")
    .eq("id", planId)
    .single()
    .overrideTypes<{ name: string }>()

  if (error) {
    throw new Error("Failed to fetch plan details")
  }

  return data.name
}
