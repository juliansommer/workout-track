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
      <section className="bg-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            <div className="mt-8">
              <p className="mb-3">Id: {data.user.id}</p>
              <p className="mb-3">Role: {data.user.role}</p>
              <p className="mb-3">Email: {data.user.email}</p>
              <p className="mb-3">
                Provider: {data.user.app_metadata.provider}
              </p>
              <p className="mb-3">Created At: {data.user.created_at}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
