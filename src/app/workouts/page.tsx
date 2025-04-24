import { Heading } from "@/components/Heading"
import { buttonVariants } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { cleanTimestamp, cn } from "@/lib/utils"
import getUserWorkouts from "@/server/fetching/getUserWorkouts"
import { type Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Workouts",
  alternates: {
    canonical: "/workouts",
  },
}

export default async function Workouts() {
  const data = await getUserWorkouts()

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
                      <li key={exercise.exercise_id}>
                        {exercise.exercise.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
