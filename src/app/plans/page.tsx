import getUserAuth from "@/lib/getUserAuth"
import createSupabaseServerClient from "@/lib/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function PlanPage() {
  const { data, error } = await getUserAuth()

  if (error ?? !data?.user) {
    redirect("/login")
  }

  const supabase = await createSupabaseServerClient()
  const { data: plan } = await supabase.from("plan").select()

  return (
    <section className="min-h-screen pt-20">
      <div className="mx-auto flex h-[20rem] max-w-4xl items-center justify-center rounded-md">
        <div>
          <p className="mb-3 text-center text-5xl font-semibold">Plan Page</p>
          <pre>{JSON.stringify(plan, null, 2)}</pre>
          <Link type="button" href="/plans/create" className="black_btn">
            Create Plan
          </Link>
        </div>
      </div>
    </section>
  )
}
