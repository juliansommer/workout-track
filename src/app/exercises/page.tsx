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

let cachedTotalPages: number | null = null

interface ExercisesProps {
  searchParams: Record<string, string | string[] | undefined>
}

export default async function Exercises({ searchParams }: ExercisesProps) {
  const supabase = createSupabaseServerClient()
  const page = Number(searchParams?.page) || 1
  const per_page = 10
  const totalPages = await getTotalPages(supabase, per_page)
  const data = await fetchExercises(page, supabase, per_page)

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

// caches the total pages so the request doesn't run every time
async function getTotalPages(supabase: SupabaseClient, per_page: number) {
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

async function fetchExercises(
  page: number,
  supabase: SupabaseClient,
  per_page: number,
) {
  const start = (page - 1) * per_page
  const end = start + per_page - 1

  const { data, error } = await supabase
    .from("exercise")
    .select("name, image, primary_muscles")
    .order("name", { ascending: true })
    .range(start, end)
    .returns<Database["public"]["Tables"]["exercise"]["Row"][]>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return data
}
