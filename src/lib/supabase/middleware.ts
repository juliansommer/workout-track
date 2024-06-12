import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export default async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  const user = await supabase.auth.getUser()

  // if user is not logged in and are going to auth route (middleware only running on auth routes), redirect to login
  // middleware is only running on authed routes, however there is no way to stop the middleware from running on the root route
  // so need to check if they are on the root route to prevent it going in a loop
  // when next fixes middleware can remove this check and only check auth
  const allowedRoutes = ["/"]

  if (user.error && !allowedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
}
