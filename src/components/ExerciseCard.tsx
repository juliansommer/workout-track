import { type Database } from "@/types/supabase"
import Image from "next/image"

export default function ExerciseCard({
  exercise,
}: {
  exercise: Database["public"]["Tables"]["exercise"]["Row"]
}) {
  return (
    <div className="flex items-center justify-between rounded-md p-4">
      <div className="flex items-center space-x-4">
        <Image
          src={`${process.env.S3_BUCKET}/exercise/${exercise.image}`}
          alt={`${exercise.name} Image`}
          width={100}
          height={100}
          className="aspect-video overflow-hidden rounded-lg object-cover"
        />
        <div>
          <h2 className="text-lg font-medium">{exercise.name}</h2>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-sm">{exercise.primary_muscles}</p>
      </div>
    </div>
  )
}
