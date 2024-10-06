import Heading from "@/components/Heading"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Workout",
  alternates: {
    canonical: "/workouts/create",
  },
}

export default async function CreateWorkout() {
  return (
    <div className="w-full max-w-3xl p-5">
      <Heading title="Create Workout" />
    </div>
  )
}
