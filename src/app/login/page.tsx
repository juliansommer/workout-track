import LoginForm from "@/components/LoginForm"
import getUserSession from "@/lib/getUserSession"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  // check if user is already logged in and redirect to root
  const { data } = await getUserSession()

  // dont need to use getUser as its just checking if logged in aka session exists
  if (data.session) {
    redirect("/")
  }

  return (
    <div className="mx-auto flex h-full items-center justify-center px-6 py-12">
      <LoginForm />
    </div>
  )
}
