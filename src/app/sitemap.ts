import getAllExercises from "@/server/fetching/getAllExercises"
import type { MetadataRoute } from "next"

interface Route {
  url: string
  lastModified: string
}

export const dynamic = "force-dynamic"

// this dynamically generates the sitemap ON REQUEST, not build time
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/exercises", "/login"]

  const routesMap = staticRoutes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const exercisesPromise = getAllExercises().then((exercises) =>
    exercises.map((exercise) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/exercises/${encodeURIComponent(exercise.name)}`,
      lastModified: new Date().toISOString(),
    })),
  )

  const fetchedRoutes: Route[] = (await Promise.all([exercisesPromise])).flat()

  return [...routesMap, ...fetchedRoutes].sort((a, b) =>
    a.url.localeCompare(b.url),
  )
}
