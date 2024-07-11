"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"
import createSupabaseBrowserClient from "@/lib/supabase/client"
import { type Database } from "@/types/supabase"
import { useEffect, useState } from "react"
0
export default function ExerciseTable() {
  const [data, setData] = useState<
    Database["public"]["Tables"]["exercise"]["Row"][]
  >([])
  const [currentPage, setCurrentPage] = useState(1)

  const supabase = createSupabaseBrowserClient()

  //const { data } = supabase.from("exercise").select("*").limit(3)

  return
}
