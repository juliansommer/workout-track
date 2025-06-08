import type { Metadata } from "next"
import { Suspense } from "react"

import { Heading } from "@/components/Heading"
import { Skeleton } from "@/components/ui/Skeleton"
import getAllExercisesNames from "@/server/fetching/getAllExercisesNames"
import getPlanName from "@/server/fetching/getPlanName"
import getSpecificPlan from "@/server/fetching/getSpecificPlan"

import PlanForm from "../../_components/PlanForm"
import PlanFormSkeleton from "../../_components/PlanFormSkeleton"

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

  return (
    <>
      <Heading title="Edit Plan" />
      <Suspense fallback={<EditPlanFormSkeleton />}>
        <EditPlanFormWithData planId={params.plan} />
      </Suspense>
    </>
  )
}

async function EditPlanFormWithData({ planId }: { planId: string }) {
  const exerciseData = await getAllExercisesNames()
  const planData = await getSpecificPlan(planId)

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

  return <PlanForm data={exerciseData} planData={newPlanData} />
}

function EditPlanFormSkeleton() {
  return (
    <PlanFormSkeleton>
      {/* Exercise components skeleton */}
      <div className="space-y-5 pt-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </PlanFormSkeleton>
  )
}
