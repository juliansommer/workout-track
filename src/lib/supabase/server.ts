/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export default function createSupabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {}
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {}
        },
      },
    },
  )
}
