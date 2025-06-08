import { Dumbbell, Edit } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

import { buttonVariants } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"
import getPlanName from "@/server/fetching/getPlanName"
import getSpecificPlan from "@/server/fetching/getSpecificPlan"

import DeletePlan from "../_components/DeletePlan"

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

export default async function Plan(props: {
  params: Promise<{ plan: string }>
}) {
  const params = await props.params
  const data = await getSpecificPlan(params.plan)

  return (
    <Suspense fallback={<PlanSkeleton />}>
      <div className="container mx-auto max-w-4xl p-4">
        <Card>
          <CardHeader className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>
              <div className="flex space-x-2">
                <Link
                  href={`${params.plan}/edit`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
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
                <h2 className="mb-2 text-xl font-semibold">Notes</h2>
                <p className="text-neutral-700 dark:text-neutral-300">
                  {data.notes}
                </p>
              </div>
            )}
            <h2 className="mb-4 text-xl font-semibold">Exercises</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.exercises.map((exercise, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={`/exercises/${exercise.image}`}
                      alt={exercise.name!}
                      className="h-full w-full"
                      width={500}
                      height={300}
                      priority
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      {exercise.name}
                    </h3>
                    <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-500">
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
    </Suspense>
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
