"use client"
import { Input } from "@/components/ui/Input"
import type { ExerciseDropdown } from "@/types"
import Select from "react-select"

interface AddExerciseProps {
  index: number
  options: ExerciseDropdown[]
  handleSelectChange: (
    selectedOption: ExerciseDropdown | null,
    index: number,
  ) => void
  handleSetsChange: (value: number, index: number) => void
}

export default function AddExercise({
  index,
  options,
  handleSelectChange,
  handleSetsChange,
}: AddExerciseProps) {
  return (
    <div className="flex items-center space-x-4">
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
      <div className="flex-1">
        <Input
          type="text"
          onChange={(e) => handleSetsChange(Number(e.target.value), index)}
          placeholder="Sets"
        />
      </div>
    </div>
  )
}
