import { z } from "zod"

// base object for sets, uses by itself for server-side validation
export const setsSchema = z.record(
  z.string(), // exercise.id as key
  z.array(
    z.object({
      weight: z.string().min(1, "Weight is required"),
      reps: z.string().min(1, "Reps is required"),
    }),
  ),
)

export type SetsSchema = z.infer<typeof setsSchema>

// this is the schema used for client-side validation, it uses the base object
export const workoutFormSchema = z.object({
  exercises: setsSchema,
})

export type WorkoutForm = z.infer<typeof workoutFormSchema>
