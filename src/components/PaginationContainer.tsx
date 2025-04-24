"use client"

import { useRouter } from "@bprogress/next"
import { Pagination } from "@heroui/pagination"

interface PaginationContainerProps {
  totalPages: number
  currentPage: number
  route: string
}

export default function PaginationContainer({
  totalPages,
  currentPage,
  route,
}: PaginationContainerProps) {
  const router = useRouter()
  if (totalPages === 1) return null

  return (
    <div className="flex items-center p-5">
      <Pagination
        className="cursor-pointer rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-xs dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={(page) => router.replace(`${route}?page=${page}`)}
      />
    </div>
  )
}
