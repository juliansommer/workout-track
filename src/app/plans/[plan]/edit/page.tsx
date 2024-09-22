import Heading from "@/components/Heading"
import PlanForms from "@/components/PlanForms"
import getAllExercises from "@/server/fetching/getAllExercises"
import getPlanName from "@/server/fetching/getPlanName"
import getSpecificPlan from "@/server/fetching/getSpecificPlan"
import type { PlanData } from "@/types"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { plan: string }
}): Promise<Metadata> {
  const name = await getPlanName(params.plan)
  return {
    title: `Edit Plan ${name}`,
    alternates: {
      canonical: `/plans/${params.plan}/edit`,
    },
  }
}

export default async function EditPlan({
  params,
}: {
  params: { plan: string }
}) {
  const exercisedata = await getAllExercises()
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
