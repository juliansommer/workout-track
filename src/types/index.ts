export interface PlanData {
  name: string
  notes: string | null
  exercises: {
    sets: number | null
    name: string | undefined
    image: string | undefined
  }[]
}
