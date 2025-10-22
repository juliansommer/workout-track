import type { Database } from "@/types/supabase"

export interface PlanData {
  id: string
  name: string
  notes: string | null
  exercises: {
    id: string
    sets: number | null
    name: string
    image: string
  }[]
}

export type ExerciseData = Pick<
  Database["public"]["Tables"]["exercise"]["Row"],
  "name" | "image" | "primary_muscles"
>
