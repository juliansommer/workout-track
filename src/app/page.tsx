import { GithubLogo } from "@/components/Logos"
import { buttonVariants } from "@/components/ui/Button"
import { LinkIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function Page() {
  return (
    <div className="flex max-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Fitness Journey
                </h1>
                <p className="mx-auto max-w-[700px] pt-2">
                  Workout Track is an open source app that helps you monitor
                  your workouts, set goals, and achieve your fitness dreams.
                  Start your journey to a healthier you today.
                </p>
              </div>
              <div className="animate-in fade-in-30 mt-8 items-center justify-center space-y-3 gap-x-3 duration-700 sm:flex sm:space-y-0">
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "other",
                    className: "group",
                    size: "lg",
                  })}>
                  <LinkIcon
                    size={18}
                    className="mr-1 duration-300 group-hover:rotate-[10deg]"
                  />
                  <span>Get Started</span>
                </Link>
                <a
                  href="https://github.com/juliansommer/workout-track"
                  className={buttonVariants({
                    variant: "expandIcon",
                    size: "lg",
                  })}>
                  <GithubLogo
                    height={18}
                    className="mr-1 duration-300 group-hover:-rotate-[10deg]"
                  />
                  <span>Star on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
