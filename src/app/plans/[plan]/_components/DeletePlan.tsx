"use client"
import { Button } from "@/components/ui/Button"
import deletePlan from "@/server/actions/deletePlan"
import { Trash2 } from "lucide-react"

export default function DeletePlan({ planId }: { planId: string }) {
  return (
    <Button onClick={() => deletePlan(planId)} variant="outline" size="icon">
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete Plan</span>
    </Button>
  )
}
