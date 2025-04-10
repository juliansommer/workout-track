import { HeadingSkeleton } from "@/components/Heading"
import { Skeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <main className="w-full max-w-4xl">
        <div className="grid gap-6">
          <HeadingSkeleton />

          {/* Image skeleton */}
          <Skeleton className="aspect-video w-full rounded-lg" />

          {/* Muscle tags skeleton */}
          <div className="grid gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {/* Primary muscles */}
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={`primary-${index}`}
                  className="h-6 w-16 rounded-md"
                />
              ))}
            </div>
          </div>

          {/* Instructions collapsible skeleton */}
          <div className="space-y-4 pb-10">
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </main>
    </div>
  )
}
