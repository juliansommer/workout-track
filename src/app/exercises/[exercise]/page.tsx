import ChevronRightIcon from "@/components/ChevronRightIcon"
import Heading from "@/components/Heading"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible"
import { titleCase } from "@/lib/utils"
import getSpecificExercise from "@/server/fetching/getSpecificExercise"
import type { Database } from "@/types/supabase"
import { createClient } from "@supabase/supabase-js"
import type { Metadata } from "next"
import Image from "next/image"

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

// have to use supabase-js instead of @supabase/ssr
// as @supabase/ssr opts into ssr rendering ON DEMAND
// and we want this page to be statically generated
export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const { data } = await supabase
    .from("exercises")
    .select("name")
    .returns<Database["public"]["Tables"]["exercise"]["Row"][]>()

  return (
    data?.map((exercise) => ({
      exercises: encodeURIComponent(exercise.name),
    })) ?? []
  )
}

export function generateMetadata({
  params,
}: {
  params: { exercise: string }
}): Metadata {
  const exercise = decodeURIComponent(params.exercise)

  return {
    title: exercise,
    alternates: {
      canonical: `/exercises/${params.exercise}`,
    },
  }
}

export default async function Exercise({
  params,
}: {
  params: { exercise: string }
}) {
  const exercise = decodeURIComponent(params.exercise)
  const data = await getSpecificExercise(exercise)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <main className="w-full max-w-4xl">
        <div className="grid gap-6">
          <Heading title={exercise} />
          <Image
            src={`${process.env.S3_BUCKET}/exercise/${data[0]?.image}`}
            width={800}
            height={600}
            alt={`${exercise} Image`}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <div className="grid gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {data[0]?.primary_muscles.map((muscle) => (
                <div
                  className="text-accent-foreground rounded-md bg-neutral-200 px-3 py-1 text-xs font-medium dark:bg-neutral-500"
                  key={muscle}>
                  {titleCase(muscle)}
                </div>
              ))}
              {data[0]?.secondary_muscles?.map((muscle) => (
                <div
                  className="text-accent-foreground rounded-md bg-neutral-200 px-3 py-1 text-xs font-medium dark:bg-neutral-500"
                  key={muscle}>
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
              {data[0]?.instructions.map((instruction, index) => (
                <p className="text-sm leading-relaxed" key={index}>
                  {`${index + 1}. ${instruction}`}
                </p>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>
    </div>
  )
}
