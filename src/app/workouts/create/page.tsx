import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { Heading } from "@/components/heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import getUserPlans from "@/server/fetching/getUserPlans"

export const experimental_ppr = true

export const metadata: Metadata = {
  title: "Create Workout",
  alternates: {
    canonical: "/workouts/create",
  },
}

export default function CreateWorkout() {
  return (
    <>
      <Heading title="Create Workout" />
      <h2 className="mb-6 text-center font-semibold text-xl md:text-2xl">
        Select Plan
      </h2>
      <Suspense fallback={<PlansGridSkeleton />}>
        <PlansGrid />
      </Suspense>
    </>
  )
}

async function PlansGrid() {
  const data = await getUserPlans()

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((plan) => (
          <Link href={`/workouts/create/${plan.id}`} key={plan.id}>
            <Card className="transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{plan.notes}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

function PlansGridSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          "card-a",
          "card-b",
          "card-c",
          "card-d",
          "card-e",
          "card-f",
          "card-g",
          "card-h",
        ].map((key) => (
          <Card key={key}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
