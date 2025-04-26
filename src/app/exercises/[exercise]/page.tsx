import type { Metadata } from "next"
import Image from "next/image"

import ChevronRightIcon from "@/components/ChevronRightIcon"
import { Heading } from "@/components/Heading"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible"
import createSupabaseBrowserClient from "@/lib/supabase/client"
import { titleCase } from "@/lib/utils"
import getSpecificExercise from "@/server/fetching/getSpecificExercise"

// when generating params, the server doesn't have access to cookies
// so cant use SupabaseServerClient
// using browser client works because it doesn't access cookies
export async function generateStaticParams() {
  const supabase = createSupabaseBrowserClient()

  const { data, error } = await supabase
    .from("exercise")
    .select("name")
    .overrideTypes<{ name: string }[]>()

  if (error) {
    throw new Error(
      error.message ??
        "Failed to fetch exercises when building /exercises/[exercise]",
    )
  }

  return data.map((exercise) => ({
    exercise: encodeURIComponent(exercise.name),
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ exercise: string }>
}): Promise<Metadata> {
  const params = await props.params
  const exercise = decodeURIComponent(params.exercise)

  return {
    title: exercise,
    alternates: {
      canonical: `/exercises/${params.exercise}`,
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
}

export default async function Exercise(props: {
  params: Promise<{ exercise: string }>
}) {
  const params = await props.params
  const exercise = decodeURIComponent(params.exercise)
  const data = await getSpecificExercise(exercise)

  return (
    <>
      <Heading title={exercise} />
      <div className="flex w-full flex-col items-center justify-center">
        <main className="w-full max-w-4xl">
          <div className="grid gap-6">
            <Image
              src={`/exercises/${data.image}`}
              width={800}
              height={600}
              alt={`${exercise} Image`}
              className="aspect-video w-full rounded-lg object-cover"
              priority
            />
            <div className="grid gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {data.primary_muscles.map((muscle) => (
                  <div
                    className="text-accent-foreground rounded-md bg-neutral-200 px-3 py-1 text-xs font-medium dark:bg-neutral-500"
                    key={muscle}
                  >
                    {titleCase(muscle)}
                  </div>
                ))}
                {data.secondary_muscles?.map((muscle) => (
                  <div
                    className="text-accent-foreground rounded-md bg-neutral-200 px-3 py-1 text-xs font-medium dark:bg-neutral-500"
                    key={muscle}
                  >
                    {titleCase(muscle)}
                  </div>
                ))}
              </div>
            </div>
            <Collapsible className="space-y-4 pb-10">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-neutral-200 px-4 py-3 text-lg font-medium transition-colors hover:bg-neutral-300 dark:bg-neutral-500 dark:hover:bg-neutral-600 [&[data-state=open]>svg]:rotate-90">
                Instructions
                <ChevronRightIcon className="h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 px-4 pb-4">
                {data.instructions.map((instruction, index) => (
                  <p className="text-sm leading-relaxed" key={index}>
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
