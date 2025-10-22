import { LinkIcon } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { GithubLogo } from "@/components/logos"
import { buttonVariants } from "@/components/ui/button"
import { robotsMetadata } from "@/lib/robotsMetadata"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  robots: robotsMetadata,
}

export default function Page() {
  return (
    <div className="flex max-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-4 md:py-8 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-bold text-2xl tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
                    Track Your Fitness Journey Like Never Before
                  </h1>
                  <p className="max-w-full text-muted-foreground text-sm md:text-base lg:text-xl">
                    Workout Track is an open source app that helps you monitor
                    your workouts, set goals, and achieve your fitness dreams.
                    Start your journey to a healthier you today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className={buttonVariants({
                      variant: "other",
                      className: "group w-full text-center min-[400px]:w-auto",
                      size: "default",
                    })}
                    href="/login"
                  >
                    <LinkIcon className="mr-1" size={16} />
                    <span>Get Started</span>
                  </Link>
                  <a
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full text-center min-[400px]:w-auto",
                      size: "default",
                    })}
                    href="https://github.com/juliansommer/workout-track"
                  >
                    <GithubLogo className="mr-1" height={16} />
                    <span>Star on GitHub</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-muted md:aspect-square lg:aspect-video">
                  <Image
                    alt="App Screenshot"
                    className="object-cover"
                    fill
                    preload
                    src="/display.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
