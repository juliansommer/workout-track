import { type Database } from "@/types/supabase"
import Image from "next/image"

export default function ExerciseCard({
  exercise,
}: Readonly<{
  exercise: Database["public"]["Tables"]["exercise"]["Row"]
}>) {
  return (
    <div className="rounded-lg bg-background p-4 shadow-lg">
      <Image
        src={`${process.env.S3_BUCKET}exercise/${exercise.image}`}
        alt={`${exercise.name} Image`}
        width={100}
        height={100}></Image>
      <h2 className="text-xl font-bold">{exercise.name}</h2>
      <p>{exercise.instructions}</p>
    </div>
  )
}
