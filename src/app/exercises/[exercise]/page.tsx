import {
  Root as Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible"
import type { Metadata } from "next"
import { cacheLife } from "next/cache"
import Image from "next/image"

import ChevronRightIcon from "@/components/chevron-right-icon"
import { Heading } from "@/components/heading"
import exercises from "@/lib/exercises.json" with { type: "json" }
import { robotsMetadata } from "@/lib/robotsMetadata"
import { createSlug, titleCase } from "@/lib/utils"

export function generateStaticParams() {
  return exercises.map((exercise) => ({
    exercise: createSlug(exercise.name),
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ exercise: string }>
}): Promise<Metadata> {
  const params = await props.params
  const exercise = getExerciseBySlug(params.exercise)

  if (!exercise) {
    throw new Error("Exercise not found")
  }

  return {
    title: exercise.name,
    alternates: {
      canonical: `/exercises/${params.exercise}`,
    },
    robots: robotsMetadata,
  }
}

export default async function Exercise(props: {
  params: Promise<{ exercise: string }>
}) {
  "use cache"
  cacheLife("max")
  const params = await props.params
  const data = getExerciseBySlug(params.exercise)

  if (!data) {
    throw new Error("Exercise not found")
  }

  return (
    <>
      <Heading title={data.name} />
      <div className="flex w-full flex-col items-center justify-center">
        <main className="w-full max-w-4xl">
          <div className="grid gap-6">
            <Image
              alt={`${data.name} exercise demonstration`}
              className="aspect-video w-full rounded-lg object-cover"
              height={600}
              src={`/exercises/${data.image}`}
              width={800}
            />
            <div className="grid gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {data.primary_muscles.map((muscle) => (
                  <div
                    className="rounded-md bg-neutral-200 px-3 py-1 font-medium text-accent-foreground text-xs dark:bg-neutral-500"
                    key={muscle}
                  >
                    {titleCase(muscle)}
                  </div>
                ))}
                {data.secondary_muscles?.map((muscle) => (
                  <div
                    className="rounded-md bg-neutral-200 px-3 py-1 font-medium text-accent-foreground text-xs dark:bg-neutral-500"
                    key={muscle}
                  >
                    {titleCase(muscle)}
                  </div>
                ))}
              </div>
            </div>
            <Collapsible className="space-y-4 pb-10">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-neutral-200 px-4 py-3 font-medium text-lg transition-colors hover:bg-neutral-300 dark:bg-neutral-500 dark:hover:bg-neutral-600 [&[data-state=open]>svg]:rotate-90">
                Instructions
                <ChevronRightIcon className="h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 px-4 pb-4">
                {data.instructions.map((instruction, index) => (
                  <p className="text-sm leading-relaxed" key={instruction}>
                    {`${index + 1}. ${instruction}`}
                  </p>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </main>
      </div>
    </>
  )
}

function getExerciseBySlug(slug: string) {
  return exercises.find((exercise) => createSlug(exercise.name) === slug)
}
