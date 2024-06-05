import Header from "@/components/Header"
import getUserAuth from "@/lib/getUserAuth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const { data, error } = await getUserAuth()

  if (error ?? !data?.user) {
    redirect("/login")
  }

  return (
    <>
      <Header />
      <section className="min-h-screen pt-20">
        <div className="mx-auto flex h-[20rem] max-w-4xl items-center justify-center rounded-md">
          <div>
            <p className="mb-3 text-center text-5xl font-semibold">
              Profile Page
            </p>
            <div className="mt-8">
              <p className="mb-3">Id: {data.user.id}</p>
              <p className="mb-3">Role: {data.user.role}</p>
              <p className="mb-3">Email: {data.user.email}</p>
              <p className="mb-3">Created At: {data.user.created_at}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
