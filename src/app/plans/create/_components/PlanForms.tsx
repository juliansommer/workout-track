"use client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import type { ExerciseDropdown, PlanFormsProps } from "@/types"
import { useRouter } from "next-nprogress-bar"
import { useState } from "react"
import { useForm } from "react-hook-form"
import AddExercise from "./AddExercise"

export default function PlanForms({
  data,
  // not a real error, ts only has that warning in functions if this was an arrow function it would be fine
  OnSubmit,
}: {
  data: { name: string; id: string }[]
  OnSubmit: (formData: PlanFormsProps, exercises: ExerciseDropdown[]) => void
}) {
  const { register, handleSubmit } = useForm<PlanFormsProps>()
  const [selectedExercises, setSelectedExercises] = useState<
    ExerciseDropdown[]
  >([])
  const router = useRouter()

  function CustomSubmit(formData: PlanFormsProps) {
    OnSubmit(formData, selectedExercises)
    router.push("/plans")
  }

  return (
    <form onSubmit={handleSubmit(CustomSubmit)}>
      <div className="w-full pt-5">
        <Input type="text" placeholder="Name" {...register("name")} />
      </div>
      <div className="pt-5">
        <Textarea placeholder="Notes" {...register("notes")} />
      </div>
      <AddExercise
        data={data}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />
      <div className="pt-5">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
