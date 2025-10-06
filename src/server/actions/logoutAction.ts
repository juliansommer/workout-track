"use server"

import createSupabaseServerClient from "@/lib/supabase/server"

export default async function logoutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
}
