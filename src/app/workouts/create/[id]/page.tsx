import getPlanName from "@/server/fetching/getPlanName"
import getSpecificPlan from "@/server/fetching/getSpecificPlan"
import type { Metadata } from "next"
import WorkoutForm from "../../_components/WorkoutForm"

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const params = await props.params
  const name = await getPlanName(params.id)
  return {
    title: `Create Workout of Plan ${name}`,
    alternates: {
      canonical: `/workouts/create/${params.id}`,
    },
  }
}

export default async function CreateWorkoutId(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const data = await getSpecificPlan(params.id)

  return (
    <div>
      <WorkoutForm workoutData={data} />
    </div>
  )
}
