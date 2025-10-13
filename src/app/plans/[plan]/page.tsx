import { Dumbbell, Edit } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import getPlanName from "@/server/fetching/getPlanName"
import getSpecificPlan from "@/server/fetching/getSpecificPlan"

import DeletePlan from "../_components/delete-plan"

export async function generateMetadata(props: {
  params: Promise<{ plan: string }>
}): Promise<Metadata> {
  const params = await props.params
  const name = await getPlanName(params.plan)
  return {
    title: `Plan ${name}`,
    alternates: {
      canonical: `/plans/${params.plan}`,
    },
  }
}

export default function Plan(props: { params: Promise<{ plan: string }> }) {
  return (
    <Suspense fallback={<PlanSkeleton />}>
      <PlanDetails params={props.params} />
    </Suspense>
  )
}

async function PlanDetails(props: { params: Promise<{ plan: string }> }) {
  const params = await props.params
  const data = await getSpecificPlan(params.plan)

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card>
        <CardHeader className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="font-bold text-2xl">{data.name}</CardTitle>
            <div className="flex space-x-2">
              <Link
                className={buttonVariants({
                  variant: "outline",
                  size: "icon",
                })}
                href={`/plans/${params.plan}/edit`}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Plan</span>
              </Link>
              <DeletePlan planId={params.plan} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {data.notes && (
            <div className="mb-6">
              <h2 className="mb-2 font-semibold text-xl">Notes</h2>
              <p className="text-neutral-700 dark:text-neutral-300">
                {data.notes}
              </p>
            </div>
          )}
          <h2 className="mb-4 font-semibold text-xl">Exercises</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.exercises.map((exercise) => (
              <Card className="overflow-hidden" key={exercise.id}>
                <div className="relative aspect-video">
                  <Image
                    alt={exercise.name ?? "Exercise Image"}
                    className="h-full w-full"
                    height={300}
                    priority
                    src={`/exercises/${exercise.image}`}
                    width={500}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="mb-2 font-semibold text-lg">
                    {exercise.name}
                  </h3>
                  <div className="flex items-center text-neutral-600 text-sm dark:text-neutral-500">
                    <Dumbbell className="mr-2 h-4 w-4" />
                    <span>{exercise.sets} sets</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PlanSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      {/* Height is guaranteed to be at least 132 pixels as thats the height on desktop with 1 exercise */}
      <Skeleton className="h-132 rounded-lg" />
    </div>
  )
}
