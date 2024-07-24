import updateSession from "@/lib/supabase/middleware"
import { type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  //console.log(`MIDDLEWARE: `, request.url)
  return await updateSession(request)
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - icons (icons)
   * - images (images)
   * - auth (auth routes)
   * - error (error routes)
   * - login (login routes)
   * this way of adding the allowed routes in the middleware is better as the middleware code will not run at all for these routes
   * so instead of checking in the middleware if its allowed, we just don't run the middleware at all
   * next has an issue where when building it will still say these routes have middleware running on them, but they don't
   */

  matcher: [
    "/((?!api|_next/static|_next/image|icons|images|auth|error|login|favicon.ico).*)",
  ],
}
