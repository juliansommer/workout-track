import type { NextRequest, NextResponse } from "next/server"

import updateSession from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest): Promise<NextResponse> {
  return await updateSession(request)
}

export const config = {
  matcher: ["/plans/:path*", "/workouts/:path*"],
}
