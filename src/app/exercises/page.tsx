import Heading from "@/components/Heading"
import PaginationContainer from "@/components/PaginationContainer"
import createSupabaseServerClient from "@/lib/supabase/server"
import { type Metadata } from "next"
import ExerciseTable from "./_components/ExerciseTable"

export const metadata: Metadata = {
  title: "Exercises",
  alternates: {
    canonical: "/exercises",
  },
}

export default async function Exercises({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const supabase = await createSupabaseServerClient()
  const page = Number(searchParams?.page) || 1
  const per_page = 10

  const start = (page - 1) * per_page
  const end = start + per_page - 1

  // could add a use memo or something on this as its value is never changing and it doesnt need to be recalculated each render
  // same with totalPages
  const { count } = await supabase
    .from("exercise")
    .select("*", { count: "exact", head: true })
    .order("name", { ascending: true })

  const { data } = await supabase
    .from("exercise")
    .select("*")
    .order("name", { ascending: true })
    .range(start, end)

  if (count === null || data === null) {
    throw new Error("Failed to fetch exercises")
  }

  const totalPages = Math.ceil(count / per_page)

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
