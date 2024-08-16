import Heading from "@/components/Heading"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible"
import createSupabaseServerClient from "@/lib/supabase/server"
import { titleCase } from "@/lib/utils"
import { type Database } from "@/types/supabase"
import Image from "next/image"
import type { JSX, SVGProps } from "react"

export default async function Exercise({
  params,
}: {
  params: { exercise: string }
}) {
  const exercise = decodeURIComponent(params.exercise)
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from("exercise")
    .select("name, image, primary_muscles, secondary_muscles, instructions")
    .eq("name", exercise)
    .returns<Database["public"]["Tables"]["exercise"]["Row"][]>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

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

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
