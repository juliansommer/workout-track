import type { Metadata } from "next"

export function generateMetadata({
  params,
}: {
  params: { plan: string }
}): Metadata {
  // need to make query to supabase to get the plan name based on the id from params
  return {
    title: params.plan,
    alternates: {
      canonical: `/plans/${params.plan}`,
    },
  }
}

export default async function Plan({ params }: { params: { plan: string } }) {
  // needs to make request to supabase to get plan data based on plan param
  // then just display the data in a read only format with button to edit

  const planId = params.plan
  return <p>{planId}</p>
}
