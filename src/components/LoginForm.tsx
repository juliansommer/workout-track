"use client"

import createSupabaseBrowserClient from "@/lib/supabase/client"
import Image from "next/image"

export default function LoginForm() {
  const supabase = createSupabaseBrowserClient()

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <form>
      <a
        className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
        style={{ backgroundColor: "#3b5998" }}
        onClick={loginWithGoogle}
        role="button">
        <Image
          className="pr-2"
          src="/images/google.svg"
          alt=""
          style={{ height: "2rem" }}
          width={35}
          height={35}
        />
        Continue with Google
      </a>
    </form>
  )
}
