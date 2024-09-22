import getPlanName from "@/server/fetching/getPlanName"
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
  return (
    <div>
      <h1>Edit Plan</h1>
      <p>p{params.plan}</p>
    </div>
  )
}
