import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import getSpecificWorkout from "@/server/fetching/getSpecificWorkout"
import getWorkoutTime from "@/server/fetching/getWorkoutTime"
import type { Metadata } from "next"
import Image from "next/image"

export async function generateMetadata(props: {
  params: Promise<{ workout: string }>
}): Promise<Metadata> {
  const params = await props.params
  const timestamp = await getWorkoutTime(params.workout)
  const time = new Date(timestamp).toISOString().split("T")[0]
  return {
    title: `${time} Workout`,
    alternates: {
      canonical: `/workouts/${params.workout}`,
    },
  }
}

export default async function Workout(props: {
  params: Promise<{ workout: string }>
}) {
  const params = await props.params
  const data = await getSpecificWorkout(params.workout)
  const time = new Date(data.created_at).toISOString().split("T")[0]

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold">{time} Workout</h1>
        </div>
        <div className="grid gap-6">
          {data.workout_exercise.map((exercise) => (
            <Card key={exercise.exercise.name} className="overflow-hidden">
              <div className="grid gap-4 md:grid-cols-[300px_1fr]">
                <div className="relative h-[200px] md:h-full">
                  <Image
                    src={`/exercises/${exercise.exercise.image}`}
                    alt={exercise.exercise.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle>{exercise.exercise.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid gap-4">
                      {exercise.set.map((set, setIndex) => (
                        <div
                          key={setIndex}
                          className="grid grid-cols-[auto_1fr_1fr] items-center gap-4">
                          <div className="font-medium">Set {setIndex + 1}</div>
                          <div className="space-y-1">
                            <Label
                              htmlFor={`${exercise.exercise.name}-set-${setIndex}-weight`}>
                              Weight
                            </Label>
                            <Input
                              id={`${exercise.exercise.name}-set-${setIndex}-weight`}
                              type="number"
                              value={set.weight}
                              readOnly
                            />
                          </div>
                          <div className="space-y-1">
                            <Label
                              htmlFor={`${exercise.exercise.name}-set-${setIndex}-reps`}>
                              Reps
                            </Label>
                            <Input
                              id={`${exercise.exercise.name}-set-${setIndex}-reps`}
                              placeholder="0"
                              value={set.reps}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
