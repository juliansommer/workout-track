import Heading from "@/components/Heading"
import { PlanForms } from "@/components/PlanForms"
import getAllExercisesNames from "@/server/fetching/getAllExercisesNames"
import getPlanName from "@/server/fetching/getPlanName"
import getSpecificPlan from "@/server/fetching/getSpecificPlan"
import type { PlanData } from "@/types"
import type { Metadata } from "next"

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
  const exercisedata = await getAllExercisesNames()
  const plandata: PlanData = await getSpecificPlan(params.plan)

  const newplandata = {
    id: plandata.id,
    name: plandata.name,
    notes: plandata.notes,
    exercises: plandata.exercises.map((exercise) => {
      return {
        label: exercise.name!,
        value: exercise.id,
        sets: exercise.sets!,
      }
    }),
  }
  return (
    <div className="w-full max-w-3xl p-5">
      <Heading title="Edit Plan" />
      <PlanForms data={exercisedata} planData={newplandata} />
    </div>
  )
}
