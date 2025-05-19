import type { Metadata } from "next"

import { Heading } from "@/components/Heading"
import PaginationContainer from "@/components/PaginationContainer"
import { robotsMetadata } from "@/lib/robotsMetadata"
import getExercisesPerPage from "@/server/fetching/getExercisesPerPage"
import getTotalExercisePages from "@/server/fetching/getTotalExercisePages"

import { ExerciseCard } from "./_components/ExerciseCard"

export const metadata: Metadata = {
  title: "Exercises",
  alternates: {
    canonical: "/exercises",
  },
  robots: robotsMetadata,
}

export default async function Exercises(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page) || 1
  const perPage = 10
  const totalPages = await getTotalExercisePages(perPage)
  const data = await getExercisesPerPage(page, perPage)

  return (
    <>
      <Heading title="Exercises" />
      <div className="w-full">
        {data.map((item, index) => (
          <ExerciseCard key={index} exercise={item} />
        ))}
      </div>
      <PaginationContainer
        totalPages={totalPages}
        currentPage={page}
        route="/exercises"
      />
    </>
  )
}
