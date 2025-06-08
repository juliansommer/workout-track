import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

import { Heading } from "@/components/Heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"
import getUserPlans from "@/server/fetching/getUserPlans"

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
      <h2 className="mb-6 text-center text-xl font-semibold md:text-2xl">
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
          <Link key={plan.id} href={`/workouts/create/${plan.id}`}>
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
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
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
