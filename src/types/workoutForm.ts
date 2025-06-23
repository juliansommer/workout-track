import { z } from "zod/v4"

// base object for sets, uses by itself for server-side validation
export const setsSchema = z.record(
  z.string(), // exercise.id as key
  z.array(
    z.object({
      weight: z
        .number({
          error: (issue) =>
            issue.input === undefined
              ? "Weight is required"
              : "Weight must be a number",
        })
        .min(1, "Weight must be greater than 0")
        .max(1000, "Weight must be less than 1000"),
      reps: z
        .number({
          error: (issue) =>
            issue.input === undefined
              ? "Reps is required"
              : "Reps must be a number",
        })
        .min(1, "Reps must be greater than 0")
        .max(1000, "Reps must be less than 1000"),
    }),
  ),
)
export type SetsSchema = z.infer<typeof setsSchema>

// this is the schema used for client-side validation, it uses the base object
export const workoutFormSchema = z.object({
  exercises: setsSchema,
})

export type WorkoutForm = z.infer<typeof workoutFormSchema>

export type WorkoutTargets = Record<
  string,
  Record<
    number,
    {
      weight: number
      reps: number
    }
  >
>
