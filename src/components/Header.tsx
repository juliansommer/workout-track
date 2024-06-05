import getUserSession from "@/lib/getUserSession"
import createSupabaseServerClient from "@/lib/supabase/server"
import Link from "next/link"

export default async function Header() {
  const { data } = await getUserSession()

  const logoutAction = async () => {
    "use server"
    const supabase = createSupabaseServerClient()
    await supabase.auth.signOut()
  }

  return (
    <header className="h-20 p-10">
      <nav className="flex h-full items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-2xl font-semibold text-slate-900 dark:text-slate-200">
            Workout Tracker
          </Link>
        </div>
        <ul className="flex items-center space-x-4">
          {!data.session && (
            <>
              <li>
                <Link
                  href="/login"
                  className="text-slate-900 dark:text-slate-200">
                  Login
                </Link>
              </li>
            </>
          )}
          {data.session && (
            <form action={logoutAction} className="flex">
              <li>
                <Link href="/profile" className="text-slate-900">
                  Profile
                </Link>
              </li>
              <li>
                <button className="ml-4">Logout</button>
              </li>
            </form>
          )}
        </ul>
      </nav>
    </header>
  )
}
