"use cache"

import createSupabaseBrowserClient from "@/lib/supabase/client"

export default async function getTotalExercisePages(): Promise<number> {
  const supabase = createSupabaseBrowserClient()

  // exercises are public so no need to check for user

  const { count } = await supabase
    .from("exercise")
    .select("*", { count: "exact", head: true })

  return Math.ceil((count ?? 0) / 10)
}
