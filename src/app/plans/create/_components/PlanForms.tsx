"use client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import createPlans from "@/server/actions/createPlans"
import type { ExerciseDropdown, PlanFormsProps } from "@/types"
import { useRouter } from "next-nprogress-bar"
import { useState } from "react"
import { useForm } from "react-hook-form"
import AddExercise from "./AddExercise"

export default function PlanForms({
  data,
}: {
  data: { name: string; id: string }[]
}) {
  const { register, handleSubmit } = useForm<PlanFormsProps>()
  const [components, setComponents] = useState<number[]>([])
  const [selectedExercises, setSelectedExercises] = useState<
    ExerciseDropdown[]
  >([])
  const [sets, setSets] = useState<number[]>([])

  const router = useRouter()

  function addComponent() {
    setComponents([...components, components.length])
    setSets([...sets, 0])
  }

  function handleSelectChange(
    selectedOption: ExerciseDropdown | null,
    index: number,
  ) {
    const newSelectedExercises = [...selectedExercises]
    newSelectedExercises[index] = selectedOption ?? { label: "", value: "" }
    setSelectedExercises(newSelectedExercises)
  }

  function handleSetsChange(value: number, index: number) {
    const newSets = [...sets]
    newSets[index] = value
    setSets(newSets)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (formData: PlanFormsProps) => {
    try {
      console.log(formData)
      console.log(selectedExercises)
      console.log(sets)
      await createPlans(formData, selectedExercises, sets)

      router.push("/plans")
    } catch (error) {
      console.error("Failed to create plan:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full pt-5">
        <Input type="text" placeholder="Name" {...register("name")} />
      </div>
      <div className="pt-5">
        <Textarea placeholder="Notes" {...register("notes")} />
      </div>
      <div className="space-y-5 pt-5">
        <Button type="button" onClick={addComponent}>
          Add Exercise
        </Button>
        {components.map((_, index) => (
          <AddExercise
            key={index}
            index={index}
            options={data.map((exercise) => ({
              label: exercise.name,
              value: exercise.id,
            }))}
            handleSelectChange={handleSelectChange}
            handleSetsChange={handleSetsChange}
          />
        ))}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
