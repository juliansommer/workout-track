"use client"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { useRouter } from "next-nprogress-bar"
import { useState } from "react"
import { useForm } from "react-hook-form"
import AddExercise from "./AddExercise"

interface Form {
  name: string
  notes: string
}

export default function PlanForms({
  data,
  // not a real error, ts only has that warning in functions if this was an arrow function it would be fine
  OnSubmit,
}: {
  data: { name: string; id: string }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OnSubmit: (formData: Form, exercises: any[]) => void
}) {
  const { register, handleSubmit } = useForm<Form>()
  const [selectedExercises, setSelectedExercises] = useState([])
  const router = useRouter()

  const CustomSubmit = (formData: Form) => {
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
      <button type="submit">Submit</button>
    </form>
  )
}
