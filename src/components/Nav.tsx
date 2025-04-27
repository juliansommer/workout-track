import { Dumbbell } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import getUserSession from "@/server/actions/getUserSession"
import logoutAction from "@/server/actions/logoutAction"

import ThemeButton from "./ThemeButton"

export default async function Nav() {
  const { data } = await getUserSession()

  return (
    <nav className="flex-between mb-16 flex h-full w-full items-center justify-between pt-3">
      <Link className="flex items-center justify-center" href="/">
        <Dumbbell className="mr-2 h-6 w-6" />
        <span className="font-bold">Workout Track</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden gap-3 md:flex">
        <ThemeButton />
        <Link
          href="/exercises"
          className={buttonVariants({ variant: "outline" })}
        >
          Exercises
        </Link>
        {data.session ? (
          <>
            <Link
              href="/plans"
              className={buttonVariants({ variant: "outline" })}
            >
              Plans
            </Link>
            <Link
              href="/workouts"
              className={buttonVariants({ variant: "outline" })}
            >
              Workouts
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
            className={buttonVariants({ variant: "default" })}
          >
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex gap-3 md:hidden">
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
                <Link href="/workouts">Workouts</Link>
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
            className={buttonVariants({ variant: "default" })}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
