import Heading from "@/components/Heading"
import PaginationContainer from "@/components/PaginationContainer"
import createSupabaseServerClient from "@/lib/supabase/server"
import type { SupabaseClient } from "@supabase/supabase-js"
import { type Metadata } from "next"
import ExerciseTable from "./_components/ExerciseTable"

export const metadata: Metadata = {
  title: "Exercises",
  alternates: {
    canonical: "/exercises",
  },
}

const per_page = 10
let cachedTotalPages: number | null = null

async function getTotalPages(supabase: SupabaseClient) {
  if (cachedTotalPages !== null) {
    console.log("cached the count", cachedTotalPages)
    return cachedTotalPages
  } else {
    const { count } = await supabase
      .from("exercise")
      .select("*", { count: "exact", head: true })
      .order("name", { ascending: true })
    const totalPages = Math.ceil((count ?? 0) / per_page)
    cachedTotalPages = totalPages // Cache the fetched total pages
    console.log("ran count", count)
    return totalPages
  }
}

export default async function Exercises({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const supabase = await createSupabaseServerClient()
  const page = Number(searchParams?.page) || 1
  const start = (page - 1) * per_page
  const end = start + per_page - 1

  const totalPages = await getTotalPages(supabase)

  const { data } = await supabase
    .from("exercise")
    .select("*")
    .order("name", { ascending: true })
    .range(start, end)

  if (data === null) {
    throw new Error("Failed to fetch exercises")
  }

  return (
    <>
      <Heading title="Exercises" />
      <ExerciseTable data={data ?? []} />
      <PaginationContainer
        totalPages={totalPages}
        currentPage={page}
        route="/exercises"
      />
    </>
  )
}
