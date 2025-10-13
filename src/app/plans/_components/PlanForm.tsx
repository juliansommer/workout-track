"use client"

import { useRouter } from "@bprogress/next"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import createPlan from "@/server/actions/createPlan"
import editPlan from "@/server/actions/editPlan"
import { type PlanFormData, planFormSchema } from "@/types/planForm"

import AddExercise from "./AddExercise"

interface PredefinedData {
  id: string
  name: string
  notes: string | null
  exercises: {
    label: string
    value: string
    sets: number
  }[]
}

// data is the list of exercises
interface PlanFormProps {
  data: { name: string; id: string }[]
  planData?: PredefinedData
}

export default function PlanForm({ data, planData }: PlanFormProps) {
  const {
    register,
    unregister,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PlanFormData>({
    resolver: zodResolver(planFormSchema),
  })
  const [components, setComponents] = useState<number[]>([])

  const router = useRouter()

  // Initialize form with plan data
  useEffect(() => {
    if (planData) {
      setValue("name", planData.name)
      setValue("notes", planData.notes ?? "")
      planData.exercises.forEach((exercise, index) => {
        setValue(`exercises.${index}`, exercise)
      })
      // Initialize components state with indices of exercises
      setComponents(planData.exercises.map((_, index) => index))
    }
  }, [planData, setValue])

  function addComponent() {
    setComponents((prevComponents) => {
      if (prevComponents.length >= 10) {
        return prevComponents
      }
      return [...prevComponents, prevComponents.length]
    })
  }

  function deleteComponent(index: number) {
    unregister(`exercises.${index}`)
    setComponents(components.filter((_, i) => i !== index))

    const currentFormData = watch()
    // Clean up the exercises array to remove any undefined values
    const cleanedExercises = currentFormData.exercises.filter(
      (exercise) => exercise !== undefined,
    )

    setValue("exercises", cleanedExercises)
  }

  const onSubmit: SubmitHandler<PlanFormData> = async (
    formData: PlanFormData,
  ) => {
    // if planData exists we are on edit page, otherwise we are on create page
    if (planData) {
      try {
        await editPlan(planData.id, formData)
        router.push("/plans")
      } catch (error) {
        throw new Error("Failed to edit plan", { cause: error })
      }
    } else {
      try {
        await createPlan(formData)
        router.push("/plans")
      } catch (error) {
        throw new Error("Failed to create plan", { cause: error })
      }
    }
  }

  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full space-y-2 pt-5">
          <Input placeholder="Name" type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="pt-5">
          <Textarea placeholder="Notes" {...register("notes")} />
          {errors.notes && <p>{errors.notes.message}</p>}
        </div>
        <div className="space-y-5 pt-5">
          <Button onClick={addComponent} type="button">
            Add Exercise
          </Button>
          {components.map((component, index) => (
            <div
              className="flex items-center justify-between"
              key={`exercise-${component}`}
            >
              <Controller
                control={control}
                key={`controller-${component}`}
                name={`exercises.${component}`}
                render={({ field }) => (
                  <div>
                    <div className="flex items-center justify-between">
                      <AddExercise
                        field={field}
                        options={data.map((exercise) => ({
                          label: exercise.name,
                          value: exercise.id,
                        }))}
                      />
                      <Button
                        className="ml-2"
                        onClick={() => deleteComponent(index)}
                        type="button"
                        variant="outline"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Exercise</span>
                      </Button>
                    </div>
                    {errors.exercises?.[index] && (
                      <div className="pt-2">
                        {typeof errors.exercises[index] === "object" &&
                          "message" in errors.exercises[index] && (
                            <p>{errors.exercises[index].message}</p>
                          )}
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
                )}
              />
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
    </div>
  )
}
