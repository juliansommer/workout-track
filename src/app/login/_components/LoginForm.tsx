"use client"
import createSupabaseBrowserClient from "@/lib/supabase/client"
import Image from "next/image"

export default function LoginForm() {
  const supabase = createSupabaseBrowserClient()

  // using getURL instead of location.origin for the redirect url so it can work on vercel and localhost
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}auth/callback`,
      },
    })
  }

  return (
    <form>
      <a
        className="mb-3 flex w-full items-center justify-center rounded px-7 py-2 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
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
