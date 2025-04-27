import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { robotsMetadata } from "@/lib/robotsMetadata"
import getUserSession from "@/server/actions/getUserSession"

import LoginForm from "./_components/LoginForm"

export const metadata: Metadata = {
  title: "Login",
  alternates: {
    canonical: "/login",
  },
  robots: robotsMetadata,
}

export default async function Login() {
  // check if user is already logged in and redirect to root
  // don't need to use getUser as its just checking if logged in aka session exists
  // actual checks for whether user is authed to view a route is done through middleware
  // + user is checked before each data call
  const { data } = await getUserSession()

  if (data.session) {
    redirect("/")
  }

  return (
    <div className="mx-auto flex h-full items-center justify-center px-6 py-12">
      <LoginForm />
    </div>
  )
}
