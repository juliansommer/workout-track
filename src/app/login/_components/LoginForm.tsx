"use client"

import { GoogleLogo } from "@/components/Logos"
import createSupabaseBrowserClient from "@/lib/supabase/client"

export default function LoginForm() {
  const supabase = createSupabaseBrowserClient()

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
  }

  return (
    <form>
      <a
        className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-sm px-7 py-2 text-sm leading-snug font-medium text-white uppercase shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:ring-0 focus:outline-hidden active:shadow-lg"
        style={{ backgroundColor: "#3b5998" }}
        onClick={loginWithGoogle}
        role="button"
      >
        <GoogleLogo
          className="pr-2"
          height={35}
          width={35}
          style={{ height: "2rem" }}
        />
        Continue with Google
      </a>
    </form>
  )
}
