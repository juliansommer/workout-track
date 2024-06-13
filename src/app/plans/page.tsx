import { buttonVariants } from "@/components/ui/Button"
import Link from "next/link"

export default async function PlanPage() {
  return (
    <section className="pt-20">
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
    </section>
  )
}
