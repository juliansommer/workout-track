import { Skeleton } from "@/components/ui/Skeleton"

interface PlanFormSkeletonProps {
  children?: React.ReactNode
}

export default function PlanFormSkeleton({ children }: PlanFormSkeletonProps) {
  return (
    <div className="w-full max-w-3xl">
      {/* Name input */}
      <div className="w-full space-y-2 pt-5">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Notes textarea */}
      <div className="pt-5">
        <Skeleton className="h-20 w-full" />
      </div>

      {/* Add Exercise button */}
      <div className="pt-5">
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Custom content area */}
      {children}
    </div>
  )
}
