"use client"

import { GithubLogo, GoogleLogo } from "@/components/Logos"
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

  async function loginWithGitHub() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
  }

  return (
    <div className="grid gap-3">
      <form>
        <button
          className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-sm px-7 py-2 font-medium text-sm text-white uppercase leading-snug shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-hidden focus:ring-0 active:shadow-lg"
          onClick={loginWithGoogle}
          style={{ backgroundColor: "#3b5998" }}
          type="button"
        >
          <GoogleLogo
            className="pr-2"
            height={35}
            style={{ height: "2rem" }}
            width={35}
          />
          Continue with Google
        </button>
      </form>
      <form>
        <button
          className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-sm px-7 py-2 font-medium text-sm text-white uppercase leading-snug shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-hidden focus:ring-0 active:shadow-lg"
          onClick={loginWithGitHub}
          style={{ backgroundColor: "#666666" }}
          type="button"
        >
          <GithubLogo
            className="pr-2"
            height={35}
            style={{ height: "2rem" }}
            width={35}
          />
          Continue with GitHub
        </button>
      </form>
    </div>
  )
}
