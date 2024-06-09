import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import getUserSession from "@/lib/getUserSession"
import createSupabaseServerClient from "@/lib/supabase/server"
import Link from "next/link"

export default async function Nav() {
  const { data } = await getUserSession()

  async function logoutAction() {
    "use server"
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
  }

  return (
    <nav className="flex-between mb-16 flex h-full w-full items-center justify-between pt-3">
      <Link href="/" className="flex-center flex gap-2">
        <p className="font-satoshi text-lg font-semibold tracking-wide text-black dark:text-white">
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
      <div className="relative flex sm:hidden">
        {data.session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <form action={logoutAction}>
                <DropdownMenuItem>
                  <Link href="/plans">Plans</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button>Logout</button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link type="button" href="/login" className="black_btn">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
