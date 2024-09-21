import getAllExercises from "@/server/fetching/getAllExercises"
import type { MetadataRoute } from "next"

interface Route {
  url: string
  lastModified: string
}

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

  let fetchedRoutes: Route[] = []

  try {
    fetchedRoutes = (await Promise.all([exercisesPromise])).flat()
  } catch (error) {
    throw error
  }

  return [...routesMap, ...fetchedRoutes].sort((a, b) =>
    a.url.localeCompare(b.url),
  )
}
