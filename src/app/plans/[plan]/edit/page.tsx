import type { Metadata } from "next"
import { Suspense } from "react"

import { Heading } from "@/components/heading"
import { Skeleton } from "@/components/ui/skeleton"
import getAllExercisesNames from "@/server/fetching/getAllExercisesNames"
import getPlanName from "@/server/fetching/getPlanName"
import getSpecificPlan from "@/server/fetching/getSpecificPlan"
import PlanForm from "../../_components/plan-form"
import PlanFormSkeleton from "../../_components/plan-form-skeleton"

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

export default function EditPlan(props: { params: Promise<{ plan: string }> }) {
  return (
    <>
      <Heading title="Edit Plan" />
      <Suspense fallback={<EditPlanFormSkeleton />}>
        <EditPlanForm params={props.params} />
      </Suspense>
    </>
  )
}

async function EditPlanForm(props: { params: Promise<{ plan: string }> }) {
  const { plan } = await props.params
  const exerciseData = await getAllExercisesNames()
  const planData = await getSpecificPlan(plan)

  const newPlanData = {
    id: planData.id,
    name: planData.name,
    notes: planData.notes,
    exercises: planData.exercises.map((exercise) => ({
      label: exercise.name,
      value: exercise.id,
      sets: exercise.sets ?? 0,
    })),
  }

  return <PlanForm data={exerciseData} planData={newPlanData} />
}

function EditPlanFormSkeleton() {
  return (
    <PlanFormSkeleton>
      {/* Exercise components */}
      <div className="space-y-5 pt-5">
        {["exercise-a", "exercise-b", "exercise-c"].map((key) => (
          <div className="flex items-center justify-between" key={key}>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </PlanFormSkeleton>
  )
}
