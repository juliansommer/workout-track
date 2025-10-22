import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Heading } from "@/components/heading"
import PaginationContainer from "@/components/pagination-container"
import exercises from "@/lib/exercises.json" with { type: "json" }
import { robotsMetadata } from "@/lib/robotsMetadata"
import { createSlug, titleCase } from "@/lib/utils"
import type { ExerciseData } from "@/types"

export function generateStaticParams() {
  const totalPages = Math.ceil(exercises.length / 10)
  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
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

export default async function Exercises(props: {
  params: Promise<{ page: string }>
}) {
  const params = await props.params
  const page = Number(params.page)
  const totalPages = Math.ceil(exercises.length / 10)

  const startIndex = (page - 1) * 10
  const endIndex = page * 10

  const data = exercises.slice(startIndex, endIndex)

  return (
    <>
      <Heading title="Exercises" />
      <div className="w-full">
        {data.map((exercise) => (
          <ExerciseCard
            exercise={exercise as ExerciseData}
            key={exercise.name}
          />
        ))}
      </div>
      <PaginationContainer
        currentPage={page}
        route="/exercises"
        totalPages={totalPages}
      />
    </>
  )
}

function ExerciseCard({ exercise }: { exercise: ExerciseData }) {
  return (
    <Link href={`/exercises/${createSlug(exercise.name)}`}>
      <div className="flex items-center justify-between rounded-md p-4">
        <div className="flex items-center space-x-4">
          <Image
            alt={`${exercise.name} Image`}
            className="aspect-video overflow-hidden rounded-lg object-cover"
            height={100}
            src={`/exercises/${exercise.image}`}
            width={100}
          />
          <div>
            <h2 className="font-medium text-lg">{exercise.name}</h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm" key={exercise.primary_muscles[0]}>
            {titleCase(exercise.primary_muscles[0] ?? "")}
          </p>
        </div>
      </div>
    </Link>
  )
}
