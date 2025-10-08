"use server"

import createSupabaseServerClient from "@/lib/supabase/server"

export default async function logoutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error("Failed to sign out", { cause: error })
  }
}
