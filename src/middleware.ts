import updateSession from "@/lib/supabase/middleware"
import { type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  //console.log(`MIDDLEWARE: `, request.url)
  return await updateSession(request)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|auth|error|login|favicon.ico).*)",
  ],
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "purpose", value: "prefetch" },
  ],
}
