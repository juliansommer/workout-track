import getUserSession from "@/lib/getUserSession"
import createSupabaseServerClient from "@/lib/supabase/server"
import Link from "next/link"
// import { useState } from "react"

export default async function Nav() {
  const { data } = await getUserSession()
  // const [toggleDropdown, setToggleDropdown] = useState(false)

  async function logoutAction() {
    "use server"
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
  }

  return (
    <nav className="flex-between mb-16 flex h-full w-full items-center justify-between pt-3">
      <Link href="/" className="flex-center flex gap-2">
        <p className="font-satoshi text-lg font-semibold tracking-wide text-black dark:text-white max-sm:hidden">
          Workout Track
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {data.session ? (
          <form action={logoutAction} className="flex gap-3 md:gap-5">
            <Link href="/plans" className="black_btn">
              Plans
            </Link>
            <button className="outline_btn">Logout</button>
          </form>
        ) : (
          <Link type="button" href="/login" className="black_btn">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      {/* <div className="relative flex sm:hidden">
        {!data.session ? (
          <div className="flex">
            {toggleDropdown && (
              <div className="absolute right-0 top-full mt-3 flex w-full min-w-[210px] flex-col items-end justify-end gap-2 rounded-lg bg-white p-5">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="dark:white_btn black_btn mt-5 w-full"
                  onClick={() => {
                    setToggleDropdown(false)
                    void logoutAction()
                  }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link type="button" href="/login" className="black_btn">
              Sign In
            </Link>
          </>
        )}
      </div> */}
    </nav>
  )
}
