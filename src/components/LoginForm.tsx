"use client"

import createSupabaseBrowserClient from "@/lib/supabase/client"
import Image from "next/image"

// use this instead of location.origin for the redirect url so it can work on vercel and localhost
function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/"
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`
  return url
}

export default function LoginForm() {
  const supabase = createSupabaseBrowserClient()

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL()}/auth/callback`,
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
