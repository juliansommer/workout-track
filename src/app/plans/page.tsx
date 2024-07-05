import { buttonVariants } from "@/components/ui/Button"
import { type Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Plans",
  alternates: {
    canonical: "/plans",
  },
}

export default async function Plans() {
  return (
    <div className="pt-20">
      <div className="mx-auto flex h-[20rem] max-w-4xl items-center justify-center rounded-md">
        <div>
          <p className="mb-3 text-center text-5xl font-semibold">Plan Page</p>
          <Link
            type="button"
            href="/plans/create"
            className={buttonVariants({ variant: "default" })}>
            Create Plan
          </Link>
        </div>
      </div>
    </div>
  )
}
