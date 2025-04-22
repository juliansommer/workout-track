import { Skeleton } from "@/components/ui/Skeleton"

export function Heading({ title }: { title: string }) {
  return (
    <h1 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
      {title}
    </h1>
  )
}

export function HeadingSkeleton() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Skeleton className="h-8 w-48" />
    </div>
  )
}
