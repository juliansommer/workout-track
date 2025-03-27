import getWorkoutTime from "@/server/fetching/getWorkoutTime"
import type { Metadata } from "next"

export async function generateMetadata(props: {
  params: Promise<{ workout: string }>
}): Promise<Metadata> {
  const params = await props.params
  const timestamp = await getWorkoutTime(params.workout)
  const time = new Date(timestamp).toISOString().split("T")[0]
  return {
    title: `${time} Workout`,
    alternates: {
      canonical: `/workouts/${params.workout}`,
    },
  }
}

export default async function Workout(props: {
  params: Promise<{ workout: string }>
}) {
  const params = await props.params
  return <div>{params.workout}</div>
}
