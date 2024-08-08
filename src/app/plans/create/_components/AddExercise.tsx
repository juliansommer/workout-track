"use client"
import { Button } from "@/components/ui/Button"
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
    <div className="pt-5">
      <Button onClick={addComponent}>Add Component</Button>
      {components.map((_, index) => (
        <Select
          options={options}
          key={index}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "lightgray",
              padding: "5px 10px",
              border: "1px solid black",
              boxShadow: "0 2px 4px rgba(0,0,0,.2)",
            }),
            option: (provided, state) => ({
              ...provided,
              borderBottom: "1px dotted pink",
              color: state.isSelected ? "white" : "black",
              backgroundColor: state.isSelected ? "hotpink" : "white",
            }),
          }}
        />
      ))}
    </div>
  )
}
