import createSupabaseServerClient from "@/lib/supabase/server"

let cachedTotalPages: number | null = null

export default async function getTotalExercisePages(per_page: number) {
  if (cachedTotalPages !== null) {
    return cachedTotalPages
  } else {
    const supabase = await createSupabaseServerClient()

    // exercises are public so no need to check for user

    const { count } = await supabase
      .from("exercise")
      .select("*", { count: "exact", head: true })
      .overrideTypes<{ count: number }>()

    const totalPages = Math.ceil((count ?? 0) / per_page)
    cachedTotalPages = totalPages

    return totalPages
  }
}
