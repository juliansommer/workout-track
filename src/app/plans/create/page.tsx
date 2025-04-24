import type { Metadata } from "next"

import PlanForm from "../_components/PlanForm"
import { Heading } from "@/components/Heading"
import getAllExercisesNames from "@/server/fetching/getAllExercisesNames"

export const metadata: Metadata = {
  title: "Create Plan",
  alternates: {
    canonical: "/plans/create",
  },
}

export default async function CreatePlan() {
  const data = await getAllExercisesNames()

  return (
    <>
      <Heading title="Create Plan" />
      <PlanForm data={data} />
    </>
  )
}
