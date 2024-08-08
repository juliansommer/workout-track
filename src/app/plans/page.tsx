import Heading from "@/components/Heading"
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { type Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Plans",
  alternates: {
    canonical: "/plans",
  },
}

export default function Plans() {
  return (
    <>
      <Heading title="Plans" />
      <div className="mx-auto flex max-w-4xl items-center justify-center rounded-md">
        <Link
          type="button"
          href="/plans/create"
          className={cn(buttonVariants({ variant: "default" }), "w-full")}>
          Create Plan
        </Link>
      </div>
    </>
  )
}
