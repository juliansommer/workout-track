import type { MetadataRoute } from "next"

import getAllExercisesNames from "@/server/fetching/getAllExercisesNames"
import getTotalExercisePages from "@/server/fetching/getTotalExercisePages"

// generate at build time not request time
// exercises never change so its fine to prebuild
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/login"]

  const routesMap = staticRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const exercisesPromise = getAllExercisesNames().then((exercises) =>
    exercises.map((exercise) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/exercises/${encodeURIComponent(exercise.name)}`,
      lastModified: new Date().toISOString(),
    })),
  )

  const exercisesPagesPromise = getTotalExercisePages().then((totalPages) =>
    Array.from({ length: totalPages }, (_, index) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/exercises/p/${index + 1}`,
      lastModified: new Date().toISOString(),
    })),
  )

  const [exerciseRoutes, paginationRoutes] = await Promise.all([
    exercisesPromise,
    exercisesPagesPromise,
  ])

  // Sort exercise routes alphabetically and pagination routes numerically
  const sortedExerciseRoutes = exerciseRoutes.sort((a, b) =>
    a.url.localeCompare(b.url),
  )
  const sortedPaginationRoutes = paginationRoutes.sort((a, b) => {
    const pageA = Number.parseInt(a.url.split("/").pop() ?? "", 10)
    const pageB = Number.parseInt(b.url.split("/").pop() ?? "", 10)
    return pageA - pageB
  })

  return [...routesMap, ...sortedExerciseRoutes, ...sortedPaginationRoutes]
}
