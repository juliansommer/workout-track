"use client"

import { useRouter } from "@bprogress/next"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useForm, type SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import createWorkout from "@/server/actions/createWorkout"
import type { PlanData } from "@/types"
import {
  workoutFormSchema,
  type WorkoutForm,
  type WorkoutTargets,
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
  } = useForm<WorkoutForm>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      exercises: {},
    },
  })

  const onSubmit: SubmitHandler<WorkoutForm> = async (data: WorkoutForm) => {
    try {
      await createWorkout({ id: workout.id, sets: data.exercises })
      router.push("/workouts")
    } catch {
      throw new Error("Failed to create workout")
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="flex flex-col space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      priority
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
                              key={setIndex}
                              className="grid grid-cols-[auto_1fr_1fr] items-center gap-4"
                            >
                              <div className="font-medium">
                                Set {setIndex + 1}
                              </div>
                              <div className="space-y-1">
                                <Label
                                  htmlFor={`${exercise.id}-set-${setIndex}-weight`}
                                  className="pb-2"
                                >
                                  Weight
                                </Label>
                                <Input
                                  id={`${exercise.id}-set-${setIndex}-weight`}
                                  type="number"
                                  placeholder={String(
                                    targets[exercise.id]?.[setIndex]?.weight ??
                                      "0",
                                  )}
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
                                  htmlFor={`${exercise.id}-set-${setIndex}-reps`}
                                  className="pb-2"
                                >
                                  Reps
                                </Label>
                                <Input
                                  id={`${exercise.id}-set-${setIndex}-reps`}
                                  type="number"
                                  placeholder={String(
                                    targets[exercise.id]?.[setIndex]?.reps ??
                                      "0",
                                  )}
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
              <Button type="submit" className="hover:cursor-pointer">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
