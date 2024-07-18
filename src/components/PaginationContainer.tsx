"use client"
import { Pagination } from "@nextui-org/pagination"
import { useRouter } from "next-nprogress-bar"

export default function PaginationContainer({
  totalPages,
  currentPage,
  route,
}: {
  totalPages: number
  currentPage: number
  route: string
}) {
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
