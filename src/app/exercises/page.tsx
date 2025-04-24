import type { Metadata } from "next"

import { Heading } from "@/components/Heading"
import PaginationContainer from "@/components/PaginationContainer"
import getExercisesPerPage from "@/server/fetching/getExercisesPerPage"
import getTotalExercisePages from "@/server/fetching/getTotalExercisePages"
import { ExerciseCard } from "./_components/ExerciseCard"

export const metadata: Metadata = {
  title: "Exercises",
  alternates: {
    canonical: "/exercises",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default async function Exercises(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams?.page) || 1
  const per_page = 10
  const totalPages = await getTotalExercisePages(per_page)
  const data = await getExercisesPerPage(page, per_page)

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
