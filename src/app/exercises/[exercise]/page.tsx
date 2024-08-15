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
    .select()
    .eq("name", exercise)
    .returns<Database["public"]["Tables"]["exercise"]["Row"][]>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <main className="container grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-[1fr_300px] md:gap-12 md:px-6 lg:py-12">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <Image
              src={`${process.env.S3_BUCKET}/exercise/${data[0]?.image}`}
              width={800}
              height={600}
              alt={`${exercise} Image`}
              className="aspect-video w-full rounded-lg object-cover"
            />
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">{exercise}</h1>
              <div className="flex flex-wrap items-center gap-2">
                {data[0]?.primary_muscles.map((muscle) => (
                  <div
                    className="text-accent-foreground rounded-md bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-gray-700"
                    key={muscle}>
                    {titleCase(muscle)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Collapsible className="space-y-4">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-100/50 dark:bg-gray-700 [&[data-state=open]>svg]:rotate-90">
              Instructions
              <ChevronRightIcon className="h-5 w-5 transition-all" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 px-4 pb-4">
              {data[0]?.instructions.map((instruction, index) => (
                <p className="text-sm/relaxed" key={index}>
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

function DumbbellIcon(
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
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  )
}
