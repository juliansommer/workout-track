import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Heading } from "@/components/Heading"
import PaginationContainer from "@/components/PaginationContainer"
import { robotsMetadata } from "@/lib/robotsMetadata"
import { titleCase } from "@/lib/utils"
import getExercisesPerPage from "@/server/fetching/getExercisesPerPage"
import getTotalExercisePages from "@/server/fetching/getTotalExercisePages"
import type { ExerciseData } from "@/types"

// when generating params, the server doesn't have access to cookies
// so cant use SupabaseServerClient
// using browser client works because it doesn't access cookies
export async function generateStaticParams() {
  const totalPages = await getTotalExercisePages()

  return Array.from({ length: totalPages }, (_, index) => ({
    page: String(index + 1),
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const params = await props.params

  return {
    title: `Exercises Page ${params.page}`,
    alternates: {
      canonical: `/exercises/p/${params.page}`,
    },
    robots: robotsMetadata,
  }
}

export default async function Exercise(props: {
  params: Promise<{ page: string }>
}) {
  const { page } = await props.params
  const totalPages = await getTotalExercisePages()
  const data = await getExercisesPerPage(parseInt(page))

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
        currentPage={parseInt(page)}
        route="/exercises"
      />
    </>
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
