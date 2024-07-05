import updateSession from "@/lib/supabase/middleware"
import { type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  //console.log(`MIDDLEWARE: `, request.url)
  return await updateSession(request)
}

export const config = {
  // ignore auth, error, login + all next images and api routes
  matcher: [
    "/((?!api|_next/static|_next/image|icons|images|auth|error|login|favicon.ico).*)",
  ],
}
