import getAllExercises from "@/server/actions/getAllExercises"
import type { MetadataRoute } from "next"

interface Route {
  url: string
  lastModified: string
}

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [""].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const exercisesPromise = getAllExercises().then((exercises) =>
    exercises.map((exercise) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/exercises/${exercise.name}`,
      lastModified: new Date().toISOString(),
    })),
  )

  let fetchedRoutes: Route[] = []

  try {
    fetchedRoutes = (await Promise.all([exercisesPromise])).flat()
  } catch (error) {
    throw JSON.stringify(error, null, 2)
  }

  return [...routesMap, ...fetchedRoutes]
}
