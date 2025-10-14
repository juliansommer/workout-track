"use client"

import { Dumbbell } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import createSupabaseBrowserClient from "@/lib/supabase/client"
import logoutAction from "@/server/actions/logoutAction"
import ThemeButton from "./theme-button"

export default function Nav() {
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    async function fetchUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user?.id ?? null)
    }
    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user?.id ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    setUser(null)
    await logoutAction()
    router.push("/")
  }

  return (
    <nav className="mb-16 flex h-full w-full flex-between items-center justify-between pt-3">
      <Link className="flex items-center justify-center" href="/">
        <Dumbbell className="mr-2 h-6 w-6" />
        <span className="font-bold">Workout Track</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden gap-3 md:flex">
        <ThemeButton />
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/exercises/p/1"
        >
          Exercises
        </Link>
        {user ? (
          <>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/plans"
            >
              Plans
            </Link>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/workouts"
            >
              Workouts
            </Link>
            <button
              className={buttonVariants({ variant: "default" })}
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/login"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="relative flex gap-3 md:hidden">
        <ThemeButton />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={buttonVariants({ variant: "default" })}
                type="button"
              >
                Menu
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/exercises/p/1">Exercises</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/plans">Plans</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/workouts">Workouts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={handleLogout} type="button">
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/login"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
