import Heading from "@/components/Heading"
import getAllExercises from "@/server/fetching/getAllExercises"
import { type Metadata } from "next"
import PlanForms from "../_components/PlanForms"

export const metadata: Metadata = {
  title: "Create Plan",
  alternates: {
    canonical: "/plans/create",
  },
}

export default async function CreatePlan() {
  const data = await getAllExercises()

  return (
    <div className="w-full max-w-3xl p-5">
      <Heading title="Create Plan" />
      <PlanForms data={data} />
    </div>
  )
}
