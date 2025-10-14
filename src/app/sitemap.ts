import type { MetadataRoute } from "next"

import exercises from "@/lib/exercises.json" with { type: "json" }
import { createSlug } from "@/lib/utils"

// generate at build time not request time
// exercises never change so its fine to prebuild
export const dynamic = "force-static"

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/login"]

  const routesMap = staticRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  // Exercise detail pages with slugs
  const exerciseRoutes = exercises.map((exercise) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/exercises/${createSlug(exercise.name)}`,
    lastModified: new Date().toISOString(),
  }))

  // Pagination pages
  const totalPages = Math.ceil(exercises.length / 10)
  const paginationRoutes = Array.from({ length: totalPages }, (_, index) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/exercises/p/${index + 1}`,
    lastModified: new Date().toISOString(),
  }))

  // Sort exercise routes alphabetically
  const sortedExerciseRoutes = exerciseRoutes.sort((a, b) =>
    a.url.localeCompare(b.url),
  )

  // Sort pagination routes numerically
  const sortedPaginationRoutes = paginationRoutes.sort((a, b) => {
    const pageA = Number.parseInt(a.url.split("/").pop() ?? "", 10)
    const pageB = Number.parseInt(b.url.split("/").pop() ?? "", 10)
    return pageA - pageB
  })

  return Promise.resolve([
    ...routesMap,
    ...sortedExerciseRoutes,
    ...sortedPaginationRoutes,
  ])
}
