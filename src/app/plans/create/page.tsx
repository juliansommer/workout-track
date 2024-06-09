import { Input } from "@/components/ui/Input"
import getUserAuth from "@/lib/getUserAuth"
import { redirect } from "next/navigation"

export default async function PlanCreatePage() {
  const { data, error } = await getUserAuth()

  if (error ?? !data?.user) {
    redirect("/login")
  }

  return (
    <div className="p-5">
      <p>Create Plan</p>
      <div className="pt-5">
        <Input type="text" placeholder="Name"></Input>
      </div>
      <div className="pt-5">
        <Input type="text" placeholder="Notes"></Input>
      </div>
    </div>

    // shad cn popover thing for add exercise button
  )
}
