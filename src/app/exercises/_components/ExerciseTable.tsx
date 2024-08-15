import { type Database } from "@/types/supabase"
import ExerciseCard from "./ExerciseCard"

export default function ExerciseTable({
  data,
}: {
  data: Database["public"]["Tables"]["exercise"]["Row"][]
}) {
  return (
    <div className="w-full">
      {data.map(
        (item: Database["public"]["Tables"]["exercise"]["Row"], index) => (
          <ExerciseCard key={index} exercise={item}></ExerciseCard>
        ),
      )}
    </div>
  )
}
