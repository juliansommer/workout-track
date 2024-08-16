"use client"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { useState } from "react"
import { useForm } from "react-hook-form"
import AddExercise from "./AddExercise"

interface Form {
  name: string
  notes: string
}

export default function PlanForms({ data }: { data: { name: string }[] }) {
  const { register, handleSubmit } = useForm<Form>()
  const [selectedExercises, setSelectedExercises] = useState([])

  const onSubmit = async (formData: Form) => {
    console.log("Form submitted")
    console.log("Form Data:", formData)
    console.log("Selected Exercises:", selectedExercises)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
