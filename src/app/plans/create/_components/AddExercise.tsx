"use client"
import { Input } from "@/components/ui/Input"
import { type ControllerRenderProps } from "react-hook-form"
import Select from "react-select"
import type { PlanFormSchema } from "./PlanForms"

interface AddExerciseProps {
  options: { label: string; value: string }[]
  field: ControllerRenderProps<PlanFormSchema, `exercises.${number}`>
}

export default function AddExercise({ options, field }: AddExerciseProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <Select
          options={options}
          value={options.find((option) => option.value === field.value?.value)}
          onChange={(selectedOption) =>
            field.onChange({ ...field.value, ...selectedOption })
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
          type="number"
          value={field.value?.sets || ""}
          onChange={(e) =>
            field.onChange({ ...field.value, sets: Number(e.target.value) })
          }
          placeholder="Sets"
        />
      </div>
    </div>
  )
}
