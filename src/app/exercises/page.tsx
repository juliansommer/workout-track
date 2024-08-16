import Heading from "@/components/Heading"
import PaginationContainer from "@/components/PaginationContainer"
import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"
import type { SupabaseClient } from "@supabase/supabase-js"
import { type Metadata } from "next"
import ExerciseCard from "./_components/ExerciseCard"

export const metadata: Metadata = {
  title: "Exercises",
  alternates: {
    canonical: "/exercises",
  },
}

const per_page = 10
let cachedTotalPages: number | null = null

// caches the total pages so the request doesn't run every time
async function getTotalPages(supabase: SupabaseClient) {
  if (cachedTotalPages !== null) {
    return cachedTotalPages
  } else {
    const { count } = await supabase
      .from("exercise")
      .select("*", { count: "exact", head: true })
    const totalPages = Math.ceil((count ?? 0) / per_page)
    cachedTotalPages = totalPages // Cache the fetched total pages
    return totalPages
  }
}

export default async function Exercises({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const supabase = createSupabaseServerClient()
  const page = Number(searchParams?.page) || 1
  const start = (page - 1) * per_page
  const end = start + per_page - 1

  const totalPages = await getTotalPages(supabase)

  const { data, error } = await supabase
    .from("exercise")
    .select("name, image, primary_muscles")
    .order("name", { ascending: true })
    .range(start, end)
    .returns<Database["public"]["Tables"]["exercise"]["Row"][]>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return (
    <>
      <Heading title="Exercises" />
      <div className="w-full">
        {data.map(
          (item: Database["public"]["Tables"]["exercise"]["Row"], index) => (
            <ExerciseCard key={index} exercise={item}></ExerciseCard>
          ),
        )}
      </div>
      <PaginationContainer
        totalPages={totalPages}
        currentPage={page}
        route="/exercises"
      />
    </>
  )
}
