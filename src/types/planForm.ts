import { z } from "zod/v4"

export const planFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be 500 characters max"),
  notes: z.string().max(100, "Notes must be 100 characters max").optional(),
  exercises: z
    .array(
      z.object(
        {
          label: z.string().min(1, "Exercise label is required"),
          value: z.string().min(1, "Exercise value is required"),
          sets: z
            .number({
              error: (issue) =>
                issue.input === undefined
                  ? "Sets is required"
                  : "Sets must be a number",
            })
            .min(1, "Sets must be at least 1")
            .max(10, "Sets must be 10 max"),
        },
        {
          error: (issue) =>
            issue.input === undefined
              ? "Exercise is required"
              : "Invalid exercise data",
        },
      ),
      {
        error: (issue) =>
          issue.input === undefined
            ? "Exercises are required"
            : "Invalid exercises format",
      },
    )
    .min(1, "At least one exercise is required"),
})

export type PlanForm = z.infer<typeof planFormSchema>
