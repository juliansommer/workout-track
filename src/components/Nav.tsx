import { buttonVariants } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import getUserSession from "@/server/actions/getUserSession"
import logoutAction from "@/server/actions/logoutAction"
import Link from "next/link"
import ThemeButton from "./ThemeButton"

export default async function Nav() {
  const { data } = await getUserSession()

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
        <Link
          href="/exercises"
          className={buttonVariants({ variant: "outline" })}>
          Exercises
        </Link>
        {data.session ? (
          <>
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
