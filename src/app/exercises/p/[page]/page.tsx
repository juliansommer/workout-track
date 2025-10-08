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

export const experimental_ppr = true

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

  return (
    <>
      <Heading title="Exercises" />
      <Suspense fallback={<ExercisesContentSkeleton />}>
        <ExercisesContent page={Number(page)} />
      </Suspense>
    </>
  )
}

async function ExercisesContent({ page }: { page: number }) {
  const totalPages = await getTotalExercisePages()
  const data = await getExercisesPerPage(page)

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
        <div className="flex items-center space-x-4">
          <p key={exercise.primary_muscles[0]} className="text-sm">
            {titleCase(exercise.primary_muscles[0]!)}
          </p>
        </div>
      </div>
    </Link>
  )
}

function ExerciseCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-md p-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-[60px] w-[100px] rounded-lg" />
        <div>
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
