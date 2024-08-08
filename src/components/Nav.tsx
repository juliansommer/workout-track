import { buttonVariants } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import getUserSession from "@/lib/getUserSession"
import createSupabaseServerClient from "@/lib/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import ThemeButton from "./ThemeButton"

export default async function Nav() {
  const { data } = await getUserSession()

  async function logoutAction() {
    "use server"
    const supabase = createSupabaseServerClient()
    await supabase.auth.signOut()
    redirect("/")
  }

  return (
    <nav className="flex-between mb-16 flex h-full w-full items-center justify-between pt-3">
      <Link href="/" className="flex-center flex gap-2">
        <p className="text-lg font-medium tracking-wide text-black dark:text-white">
          Workout Track
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden gap-3 sm:flex">
        <ThemeButton />
        {data.session ? (
          <>
            <Link
              href="/exercises"
              className={buttonVariants({ variant: "outline" })}>
              Exercises
            </Link>
            <Link
              href="/plans"
              className={buttonVariants({ variant: "outline" })}>
              Plans
            </Link>
            <form action={logoutAction}>
              <button className={buttonVariants({ variant: "default" })}>
                Logout
              </button>
            </form>
          </>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "default" })}>
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex gap-3 sm:hidden">
        <ThemeButton />
        {data.session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={buttonVariants({ variant: "default" })}>
                Menu
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/exercises">Exercises</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/plans">Plans</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form action={logoutAction}>
                  <button>Logout</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "default" })}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
