import updateSession from "@/lib/supabase/middleware"
import { type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  //console.log(`MIDDLEWARE: `, request.url)
  return await updateSession(request)
}

export const config = {
  // ignore auth, error, login + all next images and api routes
  // this way of adding the allowed routes in the middleware is better as the middleware code will not run at all for these routes
  // so instead of checking in the middleware if its allowed, we just don't run the middleware at all
  matcher: [
    "/((?!api|_next/static|_next/image|icons|images|auth|error|login|favicon.ico).*)",
  ],
}
