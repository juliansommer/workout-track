import ExerciseCard from "@/components/ExerciseCard"
import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Exercises",
}

export default async function Exercises() {
  const supabase = await createSupabaseServerClient()

  const { data } = await supabase.from("exercise").select("*").limit(3)
  return (
    <div className="w-full">
      {data?.map(
        (item: Database["public"]["Tables"]["exercise"]["Row"], index) => (
          <ExerciseCard key={index} exercise={item}></ExerciseCard>
        ),
      )}
    </div>
  )
}
