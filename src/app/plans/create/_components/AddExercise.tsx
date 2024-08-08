"use client"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useState } from "react"
import Select from "react-select"

export default function AddExercise({ data }: { data: { name: string }[] }) {
  const [components, setComponents] = useState<number[]>([])
  const addComponent = () => {
    setComponents([...components, components.length])
  }

  const options = data.map((exercise) => ({
    label: exercise.name,
    value: exercise.name,
  }))

  return (
    <div className="space-y-5 pt-5">
      <Button onClick={addComponent}>Add Exercise</Button>
      {components.map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="flex-1">
            <Select
              options={options}
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
          <div className="flex-3">
            <Input type="text" placeholder="Sets" />
          </div>
        </div>
      ))}
    </div>
  )
}
