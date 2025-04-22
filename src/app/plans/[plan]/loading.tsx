import { Skeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      {/* Height is guaranteed to be at least 132 pixels as thats the height on desktop with 1 exercise */}
      <Skeleton className="h-132 rounded-lg" />
    </div>
  )
}
