import { buttonVariants } from "@/components/ui/Button"
import { type Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
}

export default function NotFound() {
  return (
    <>
      <div className="flex max-h-screen flex-col items-center justify-center text-center">
        <h2 className="text-2xl">404 - Not Found</h2>
        <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          type="button"
          href="/plans/create"
          className={buttonVariants({ variant: "default" })}>
          Return Home
        </Link>
      </div>
    </>
  )
}
