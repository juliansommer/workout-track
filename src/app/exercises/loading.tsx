import { HeadingSkeleton } from "@/components/Heading"
import { ExerciseCardSkeleton } from "./_components/ExerciseCard"

export default function Loading() {
  return (
    <div className="w-full">
      <HeadingSkeleton />

      <div className="pt-6">
        {/* Create an array of 5 skeleton cards to represent loading state */}
        {Array.from({ length: 5 }).map((_, index) => (
          <ExerciseCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
