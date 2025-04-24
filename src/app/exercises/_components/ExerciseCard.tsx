import Image from "next/image"
import Link from "next/link"

import { Skeleton } from "@/components/ui/Skeleton"
import { titleCase } from "@/lib/utils"
import type { ExerciseData } from "@/types"

export function ExerciseCard({ exercise }: { exercise: ExerciseData }) {
  return (
    <Link href={`/exercises/${encodeURIComponent(exercise.name)}`}>
      <div className="flex items-center justify-between rounded-md p-4">
        <div className="flex items-center space-x-4">
          <Image
            src={`/exercises/${exercise.image}`}
            alt={`${exercise.name} Image`}
            width={100}
            height={100}
            className="aspect-video overflow-hidden rounded-lg object-cover"
            priority
            placeholder="blur"
            blurDataURL="/1x1.png"
          />
          <div>
            <h2 className="text-lg font-medium">{exercise.name}</h2>
          </div>
        </div>
        {/* need to map so can capitalise each muscle as technically primary_muscles is an array (but theres only ever one string stored in it) */}
        <div className="flex items-center space-x-4">
          {exercise.primary_muscles.map((muscle) => (
            <p key={muscle} className="text-sm">
              {titleCase(muscle)}
            </p>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function ExerciseCardSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-md p-4">
      {/* Left side of the card with image and title */}
      <div className="flex items-center space-x-4">
        {/* Placeholder for the exercise image */}
        <Skeleton className="h-[60px] w-[100px] rounded-lg" />
        <div>
          {/* Placeholder for the exercise name/title */}
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Right side of the card with muscle information */}
      <div className="flex items-center space-x-4">
        {/* Placeholder for the primary muscle text */}
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
