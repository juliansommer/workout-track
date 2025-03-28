"use client"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import saveWorkout from "@/server/actions/saveWorkout"
import { type PlanData } from "@/types"
import { useRouter } from "next-nprogress-bar"
import Image from "next/image"
import { useState } from "react"

export default function WorkoutForm({
  workoutData,
}: {
  workoutData: PlanData
}) {
  const router = useRouter()

  const workout = workoutData
  const [workoutSets, setWorkoutSets] = useState(() => {
    const initialSets: Record<string, { weight: string; reps: string }[]> = {}
    workout.exercises.forEach((exercise) => {
      initialSets[exercise.id] = Array.from(
        { length: exercise.sets ?? 0 },
        () => ({
          weight: "",
          reps: "",
        }),
      )
    })
    return initialSets
  })

  function handleSetChange(
    exerciseId: string,
    setIndex: number,
    field: string,
    value: string,
  ) {
    const finalValue = value === "" ? "0" : value
    setWorkoutSets((prev) => ({
      ...prev,
      [exerciseId]: (prev[exerciseId] ?? []).map((set, idx) =>
        idx === setIndex ? { ...set, [field]: finalValue } : set,
      ),
    }))
  }

  async function handleSaveWorkout() {
    await saveWorkout({ id: workout.id, sets: workoutSets })
    router.push("/workouts")
  }

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold">{workout.name} Workout</h1>
        </div>

        <div className="grid gap-6">
          {workout.exercises.map((exercise) => (
            <Card key={exercise.id} className="overflow-hidden">
              <div className="grid gap-4 md:grid-cols-[300px_1fr]">
                <div className="relative h-[200px] md:h-full">
                  <Image
                    src={`/exercises/${exercise.image}`}
                    alt={exercise.name!}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle>{exercise.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid gap-4">
                      {Array.from({ length: exercise.sets ?? 0 }).map(
                        (_, setIndex) => (
                          <div
                            key={setIndex}
                            className="grid grid-cols-[auto_1fr_1fr] items-center gap-4">
                            <div className="font-medium">
                              Set {setIndex + 1}
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor={`${exercise.id}-set-${setIndex}-weight`}>
                                Weight
                              </Label>
                              <Input
                                id={`${exercise.id}-set-${setIndex}-weight`}
                                type="number"
                                placeholder="0"
                                value={
                                  workoutSets[exercise.id]?.[setIndex]?.weight
                                }
                                onChange={(e) =>
                                  handleSetChange(
                                    exercise.id,
                                    setIndex,
                                    "weight",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor={`${exercise.id}-set-${setIndex}-reps`}>
                                Reps
                              </Label>
                              <Input
                                id={`${exercise.id}-set-${setIndex}-reps`}
                                type="number"
                                placeholder="0"
                                value={
                                  workoutSets[exercise.id]?.[setIndex]?.reps
                                }
                                onChange={(e) =>
                                  handleSetChange(
                                    exercise.id,
                                    setIndex,
                                    "reps",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
          <div className="pt-5">
            <Button
              className="hover:cursor-pointer"
              onClick={handleSaveWorkout}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
