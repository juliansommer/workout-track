"use client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import createPlans from "@/server/actions/createPlans"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next-nprogress-bar"
import { useState } from "react"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"
import AddExercise from "./AddExercise"

const planFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be 500 characters max"),
  notes: z.string().max(100, "Notes must be 100 characters max").optional(),
  exercises: z
    .array(
      z.object({
        label: z.string().min(1, "Exercise label is required"),
        value: z.string().min(1, "Exercise value is required"),
        sets: z
          .number()
          .min(1, "Sets must be at least 1")
          .max(10, "Sets must be 10 max"),
      }),
    )
    .nonempty("At least one exercise is required"),
})

export type PlanFormSchema = z.infer<typeof planFormSchema>

export default function PlanForms({
  data,
}: {
  data: { name: string; id: string }[]
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PlanFormSchema>({
    resolver: zodResolver(planFormSchema),
  })
  const [components, setComponents] = useState<number[]>([])

  const router = useRouter()

  function addComponent() {
    setComponents((prevComponents) => {
      if (prevComponents.length >= 10) {
        return prevComponents // Prevent adding more than 10 exercises
      }
      return [...prevComponents, prevComponents.length]
    })
  }

  const onSubmit: SubmitHandler<PlanFormSchema> = async (
    formData: PlanFormSchema,
  ) => {
    try {
      await createPlans(formData)
      router.push("/plans")
    } catch (error) {
      console.error("Failed to create plan:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full space-y-2 pt-5">
        <Input type="text" placeholder="Name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className="pt-5">
        <Textarea placeholder="Notes" {...register("notes")} />
        {errors.notes && <p>{errors.notes.message}</p>}
      </div>
      <div className="space-y-5 pt-5">
        <Button type="button" onClick={addComponent}>
          Add Exercise
        </Button>
        {components.map((_, index) => (
          <div key={index}>
            <Controller
              key={index}
              name={`exercises.${index}`}
              control={control}
              render={({ field }) => (
                <AddExercise
                  options={data.map((exercise) => ({
                    label: exercise.name,
                    value: exercise.id,
                  }))}
                  field={field}
                />
              )}
            />
            {errors.exercises?.[index] && (
              <div className="pt-2">
                {errors.exercises[index].label && (
                  <p>{errors.exercises[index].label.message}</p>
                )}
                {errors.exercises[index].value && (
                  <p>{errors.exercises[index].value.message}</p>
                )}
                {errors.exercises[index].sets && (
                  <p>{errors.exercises[index].sets.message}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {components.length >= 10 && (
        <p className="pt-5">You can only add up to 10 exercises</p>
      )}
      {errors.exercises && <p>{errors.exercises.message}</p>}
      <div className="pt-5">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
