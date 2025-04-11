import { Heading } from "@/components/Heading"
import PlanForm from "@/components/PlanForm"
import getAllExercisesNames from "@/server/fetching/getAllExercisesNames"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Plan",
  alternates: {
    canonical: "/plans/create",
  },
}

export default async function CreatePlan() {
  const data = await getAllExercisesNames()

  return (
    <div className="w-full max-w-3xl p-5">
      <Heading title="Create Plan" />
      <PlanForm data={data} />
    </div>
  )
}
