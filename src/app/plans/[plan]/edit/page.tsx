import type { Metadata } from "next"

import { Heading } from "@/components/Heading"
import getAllExercisesNames from "@/server/fetching/getAllExercisesNames"
import getPlanName from "@/server/fetching/getPlanName"
import getSpecificPlan from "@/server/fetching/getSpecificPlan"

import PlanForm from "../../_components/PlanForm"

export async function generateMetadata(props: {
  params: Promise<{ plan: string }>
}): Promise<Metadata> {
  const params = await props.params
  const name = await getPlanName(params.plan)
  return {
    title: `Edit Plan ${name}`,
    alternates: {
      canonical: `/plans/${params.plan}/edit`,
    },
  }
}

export default async function EditPlan(props: {
  params: Promise<{ plan: string }>
}) {
  const params = await props.params
  const exerciseData = await getAllExercisesNames()
  const planData = await getSpecificPlan(params.plan)

  const newPlanData = {
    id: planData.id,
    name: planData.name,
    notes: planData.notes,
    exercises: planData.exercises.map((exercise) => {
      return {
        label: exercise.name!,
        value: exercise.id,
        sets: exercise.sets!,
      }
    }),
  }

  return (
    <>
      <Heading title="Edit Plan" />
      <PlanForm data={exerciseData} planData={newPlanData} />
    </>
  )
}
