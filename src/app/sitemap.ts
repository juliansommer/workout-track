import type { MetadataRoute } from "next"

import getAllExercisesNames from "@/server/fetching/getAllExercisesNames"

// generate at build time not request time
// exercises never change so its fine to prebuild
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/exercises", "/login"]

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

  const fetchedRoutes = (await Promise.all([exercisesPromise])).flat()

  return [...routesMap, ...fetchedRoutes].sort((a, b) =>
    a.url.localeCompare(b.url),
  )
}
