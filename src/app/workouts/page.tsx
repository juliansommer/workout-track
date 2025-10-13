import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { Heading } from "@/components/heading"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cleanTimestamp, cn } from "@/lib/utils"
import getUserWorkouts from "@/server/fetching/getUserWorkouts"

export const metadata: Metadata = {
  title: "Workouts",
  alternates: {
    canonical: "/workouts",
  },
}

export default function Workouts() {
  return (
    <>
      <Heading title="Workouts" />
      <div className="mx-auto flex max-w-4xl items-center justify-center rounded-md">
        <Link
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
          href="/workouts/create"
          type="button"
        >
          Create Workout
        </Link>
      </div>
      <Suspense fallback={<WorkoutsGridSkeleton />}>
        <WorkoutsGrid />
      </Suspense>
    </>
  )
}

async function WorkoutsGrid() {
  const data = await getUserWorkouts()

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((workout) => (
          <Link href={`/workouts/${workout.id}`} key={workout.id}>
            <Card className="transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{workout.plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {cleanTimestamp(workout.created_at)}
                </p>
                <ul className="list-disc pt-2 pl-5 text-muted-foreground text-sm">
                  {workout.workout_exercise.map((exercise) => (
                    <li key={exercise.exercise_id}>{exercise.exercise.name}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

function WorkoutsGridSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          "card-a",
          "card-b",
          "card-c",
          "card-d",
          "card-e",
          "card-f",
          "card-g",
          "card-h",
        ].map((key) => (
          <Card
            className="animate-pulse bg-neutral-100 dark:bg-neutral-800"
            key={key}
          >
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-1/2" />
              <div className="space-y-1 pt-2">
                {["skeleton-a", "skeleton-b", "skeleton-c"].map((key2) => (
                  <Skeleton className="h-3 w-3/4" key={key2} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
