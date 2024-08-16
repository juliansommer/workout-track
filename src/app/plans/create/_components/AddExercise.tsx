"use client"
import { Button } from "@/components/ui/Button"
import type { ExerciseDropdown } from "@/types"
// import { Input } from "@/components/ui/Input"
import { useState } from "react"
import Select from "react-select"

export default function AddExercise({
  data,
  selectedExercises,
  setSelectedExercises,
}: {
  data: { name: string; id: string }[]
  selectedExercises: ExerciseDropdown[]
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseDropdown[]>>
}) {
  const [components, setComponents] = useState<number[]>([])
  const addComponent = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setComponents([...components, components.length])
  }

  const options = data.map((exercise) => ({
    label: exercise.name,
    value: exercise.id,
  }))

  const handleSelectChange = (
    selectedOption: ExerciseDropdown | null,
    index: number,
  ) => {
    const newSelectedExercises = [...selectedExercises]
    newSelectedExercises[index] = selectedOption ?? { label: "", value: "" }
    setSelectedExercises(newSelectedExercises)
  }

  return (
    <div className="space-y-5 pt-5">
      <Button onClick={addComponent}>Add Exercise</Button>
      {components.map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="flex-1">
            <Select
              options={options}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, index)
              }
              styles={{
                control: (provided) => ({
                  ...provided,
                  padding: "5px 10px",
                  border: "1px solid black",
                  boxShadow: "0 2px 4px rgba(0,0,0,.2)",
                }),
                option: (provided, state) => ({
                  ...provided,
                  borderBottom: "1px dotted black",
                  color: state.isSelected ? "white" : "black",
                  backgroundColor: state.isSelected ? "gray" : "white",
                }),
              }}
            />
          </div>
          {/* Input value isn't being shared to the parent and I've had enough of statemanagement for one day */}
          {/* <div className="flex-3">
            <Input type="text" placeholder="Sets" />
          </div> */}
        </div>
      ))}
    </div>
  )
}
