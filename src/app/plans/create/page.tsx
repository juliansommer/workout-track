import type { Metadata } from "next"
import { Suspense } from "react"

import { Heading } from "@/components/Heading"
import { Skeleton } from "@/components/ui/Skeleton"
import getAllExercisesNames from "@/server/fetching/getAllExercisesNames"

import PlanForm from "../_components/PlanForm"
import PlanFormSkeleton from "../_components/PlanFormSkeleton"

export const metadata: Metadata = {
  title: "Create Plan",
  alternates: {
    canonical: "/plans/create",
  },
}

export default function CreatePlan() {
  return (
    <>
      <Heading title="Create Plan" />
      <Suspense fallback={<CreatePlanFormSkeleton />}>
        <PlanFormWithData />
      </Suspense>
    </>
  )
}

async function PlanFormWithData() {
  const data = await getAllExercisesNames()
  return <PlanForm data={data} />
}

function CreatePlanFormSkeleton() {
  return (
    <>
      <PlanFormSkeleton>
        {/* Submit Button */}
        <div className="pt-5">
          <Skeleton className="h-10 w-20" />
        </div>
      </PlanFormSkeleton>
    </>
  )
}
