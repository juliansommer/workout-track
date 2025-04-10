import { Heading } from "@/components/Heading"
import { buttonVariants } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import getUserPlans from "@/server/fetching/getUserPlans"
import { type Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Plans",
  alternates: {
    canonical: "/plans",
  },
}

export default async function Plans() {
  const data = await getUserPlans()

  return (
    <>
      <Heading title="Plans" />
      <div className="mx-auto flex max-w-4xl items-center justify-center rounded-md">
        <Link
          type="button"
          href="/plans/create"
          className={cn(buttonVariants({ variant: "default" }), "w-full")}>
          Create Plan
        </Link>
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((plan) => (
            <Link key={plan.id} href={`/plans/${plan.id}`}>
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
