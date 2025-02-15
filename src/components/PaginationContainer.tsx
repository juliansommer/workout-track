"use client"
import { Pagination } from "@heroui/pagination"
import { useRouter } from "next-nprogress-bar"

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
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={(page) => router.replace(`${route}?page=${page}`)}
      />
    </div>
  )
}
