"use client"

import { useRouter } from "@bprogress/next"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { type SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import createWorkout from "@/server/actions/createWorkout"
import type { PlanData } from "@/types"
import {
  type WorkoutFormData,
  type WorkoutTargets,
  workoutFormSchema,
} from "@/types/workoutForm"

interface WorkoutFormProps {
  workoutData: PlanData
  workoutTargets: WorkoutTargets
}

export default function WorkoutForm({
  workoutData,
  workoutTargets,
}: WorkoutFormProps) {
  const router = useRouter()
  const workout = workoutData
  const targets = workoutTargets

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      exercises: {},
    },
  })

  const onSubmit: SubmitHandler<WorkoutFormData> = async (
    data: WorkoutFormData,
  ) => {
    try {
      await createWorkout({ id: workout.id, sets: data.exercises })
      router.push("/workouts")
    } catch (error) {
      throw new Error("Failed to create workout", { cause: error })
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="flex flex-col space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            {workout.exercises.map((exercise) => (
              <Card className="overflow-hidden" key={exercise.id}>
                <div className="grid gap-4 md:grid-cols-[300px_1fr]">
                  <div className="relative h-[200px] md:h-full">
                    <Image
                      alt={exercise.name ?? "Exercise Image"}
                      blurDataURL="/blur.png"
                      className="object-cover"
                      fill
                      loading="eager"
                      placeholder="blur"
                      src={`/exercises/${exercise.image}`}
                    />
                  </div>
                  <div className="p-4">
                    <CardHeader className="p-0">
                      <CardTitle className="pb-6">{exercise.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="grid gap-4">
                        {Array.from({ length: exercise.sets ?? 0 }).map(
                          (_, setIndex) => (
                            <div
                              className="grid grid-cols-[auto_1fr_1fr] items-center gap-4"
                              // biome-ignore lint/suspicious/noArrayIndexKey: no other way to identify
                              key={setIndex}
                            >
                              <div className="font-medium">
                                Set {setIndex + 1}
                              </div>
                              <div className="space-y-1">
                                <Label
                                  className="pb-2"
                                  htmlFor={`${exercise.id}-set-${setIndex}-weight`}
                                >
                                  Weight
                                </Label>
                                <Input
                                  id={`${exercise.id}-set-${setIndex}-weight`}
                                  placeholder={String(
                                    targets[exercise.id]?.[setIndex]?.weight ??
                                      "0",
                                  )}
                                  type="number"
                                  {...register(
                                    `exercises.${exercise.id}.${setIndex}.weight`,
                                    { valueAsNumber: true },
                                  )}
                                />
                                <div className="h-5">
                                  {" "}
                                  {errors.exercises?.[exercise.id]?.[setIndex]
                                    ?.weight && (
                                    <p className="text-sm">
                                      {
                                        errors.exercises[exercise.id]?.[
                                          setIndex
                                        ]?.weight?.message
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label
                                  className="pb-2"
                                  htmlFor={`${exercise.id}-set-${setIndex}-reps`}
                                >
                                  Reps
                                </Label>
                                <Input
                                  id={`${exercise.id}-set-${setIndex}-reps`}
                                  placeholder={String(
                                    targets[exercise.id]?.[setIndex]?.reps ??
                                      "0",
                                  )}
                                  type="number"
                                  {...register(
                                    `exercises.${exercise.id}.${setIndex}.reps`,
                                    { valueAsNumber: true },
                                  )}
                                />
                                <div className="h-5">
                                  {" "}
                                  {errors.exercises?.[exercise.id]?.[setIndex]
                                    ?.reps && (
                                    <p className="text-sm">
                                      {
                                        errors.exercises[exercise.id]?.[
                                          setIndex
                                        ]?.reps?.message
                                      }
                                    </p>
                                  )}
                                </div>
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
              <Button className="hover:cursor-pointer" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
