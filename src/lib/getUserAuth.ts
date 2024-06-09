import createSupabaseServerClient from "./supabase/server"

export default async function getUserAuth() {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getUser()
}
