import { Heading } from "@/components/Heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import getUserPlans from "@/server/fetching/getUserPlans"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Create Workout",
  alternates: {
    canonical: "/workouts/create",
  },
}

export default async function CreateWorkout() {
  const data = await getUserPlans()

  return (
    <>
      <div className="w-full max-w-3xl p-5">
        <Heading title="Create Workout" />
      </div>
      <h2 className="mb-6 text-center text-xl font-semibold md:text-2xl">
        Select Plan
      </h2>
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
    </>
  )
}
