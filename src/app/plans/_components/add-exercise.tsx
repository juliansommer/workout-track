"use client"

import type { ControllerRenderProps } from "react-hook-form"
import Select from "react-select"

import { Input } from "@/components/ui/input"
import type { PlanFormData } from "@/types/planForm"

interface AddExerciseProps {
  options: { label: string; value: string }[]
  field: ControllerRenderProps<PlanFormData, `exercises.${number}`>
}

export default function AddExercise({ options, field }: AddExerciseProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-60 md:w-96">
        <Select
          onChange={(selectedOption) =>
            field.onChange({ ...field.value, ...selectedOption })
          }
          options={options}
          styles={{
            control: (provided) => ({
              ...provided,
              padding: "5px 10px",
              border: "1px solid black",
              boxShadow: "0 2px 4px rgba(0,0,0,.2)",
            }),
            option: (provided, state: { isSelected: unknown }) => ({
              ...provided,
              borderBottom: "1px dotted black",
              color: state.isSelected ? "white" : "black",
              backgroundColor: state.isSelected ? "gray" : "white",
            }),
          }}
          value={options.find((option) => option.value === field.value?.value)}
        />
      </div>
      <div className="flex-2">
        <Input
          onChange={(e) =>
            field.onChange({ ...field.value, sets: Number(e.target.value) })
          }
          placeholder="Sets"
          type="number"
          value={field.value?.sets ?? ""}
        />
      </div>
    </div>
  )
}
