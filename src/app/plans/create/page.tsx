import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { type Metadata } from "next"
import FetchExercises from "./_components/FetchExercises"

export const metadata: Metadata = {
  title: "Create Plan",
  alternates: {
    canonical: "/plans/create",
  },
}

export default function CreatePlan() {
  return (
    <div className="w-80 p-5">
      <p>Create Plan</p>
      <div className="pt-5">
        <Input type="text" placeholder="Name" />
      </div>
      <div className="pt-5">
        <Textarea placeholder="Notes" />
      </div>
      <FetchExercises />
    </div>
  )
}
