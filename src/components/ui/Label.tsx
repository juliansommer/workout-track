"use client"

import { cn } from "@/lib/utils"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    className={cn(labelVariants(), className)}
    {...props}
  />
))
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
