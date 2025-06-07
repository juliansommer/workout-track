import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

import { Heading } from "@/components/Heading"
import PaginationContainer from "@/components/PaginationContainer"
import { Skeleton } from "@/components/ui/Skeleton"
import { robotsMetadata } from "@/lib/robotsMetadata"
import { titleCase } from "@/lib/utils"
import getExercisesPerPage from "@/server/fetching/getExercisesPerPage"
import getTotalExercisePages from "@/server/fetching/getTotalExercisePages"
import type { ExerciseData } from "@/types"

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

  return (
    <>
      <Heading title="Exercises" />
      <Suspense fallback={<ExercisesContentSkeleton />}>
        <ExercisesContent page={page} perPage={perPage} />
      </Suspense>
    </>
  )
}

async function ExercisesContent({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) {
  const totalPages = await getTotalExercisePages(perPage)
  const data = await getExercisesPerPage(page, perPage)

  return (
    <>
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

function ExercisesContentSkeleton() {
  return (
    <div className="w-full">
      {/* Create an array of 10 skeleton cards to represent loading state */}
      {Array.from({ length: 10 }).map((_, index) => (
        <ExerciseCardSkeleton key={index} />
      ))}
    </div>
  )
}

function ExerciseCard({ exercise }: { exercise: ExerciseData }) {
  return (
    <Link href={`/exercises/${encodeURIComponent(exercise.name)}`}>
      <div className="flex items-center justify-between rounded-md p-4">
        <div className="flex items-center space-x-4">
          <Image
            src={`/exercises/${exercise.image}`}
            alt={`${exercise.name} Image`}
            width={100}
            height={100}
            className="aspect-video overflow-hidden rounded-lg object-cover"
            priority
          />
          <div>
            <h2 className="text-lg font-medium">{exercise.name}</h2>
          </div>
        </div>
        {/* need to map so can capitalise each muscle as technically primary_muscles is an array (but theres only ever one string stored in it) */}
        <div className="flex items-center space-x-4">
          {exercise.primary_muscles.map((muscle) => (
            <p key={muscle} className="text-sm">
              {titleCase(muscle)}
            </p>
          ))}
        </div>
      </div>
    </Link>
  )
}

function ExerciseCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-md p-4">
      {/* Left side of the card with image and title */}
      <div className="flex items-center space-x-4">
        {/* Placeholder for the exercise image */}
        <Skeleton className="h-[60px] w-[100px] rounded-lg" />
        <div>
          {/* Placeholder for the exercise name/title */}
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Right side of the card with muscle information */}
      <div className="flex items-center space-x-4">
        {/* Placeholder for the primary muscle text */}
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
