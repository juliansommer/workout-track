import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { Heading } from "@/components/Heading"
import { buttonVariants } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"
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
          type="button"
          href="/workouts/create"
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
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
          <Link key={workout.id} href={`/workouts/${workout.id}`}>
            <Card className="transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{workout.plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {cleanTimestamp(workout.updated_at)}
                </p>
                <ul className="text-muted-foreground list-disc pt-2 pl-5 text-sm">
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
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            className="animate-pulse bg-neutral-100 dark:bg-neutral-800"
          >
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-1/2" />
              <div className="space-y-1 pt-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-3 w-3/4" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
