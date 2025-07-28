import { unstable_cache } from "next/cache"

import createSupabaseBrowserClient from "@/lib/supabase/client"

async function getTotalExercisePages() {
  const supabase = createSupabaseBrowserClient()

  // exercises are public so no need to check for user

  const { count } = await supabase
    .from("exercise")
    .select("*", { count: "exact", head: true })

  return Math.ceil((count ?? 0) / 10)
}

const getCachedPages = unstable_cache(getTotalExercisePages)
export default getCachedPages
