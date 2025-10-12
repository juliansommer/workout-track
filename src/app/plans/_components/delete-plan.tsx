"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import deletePlan from "@/server/actions/deletePlan"

export default function DeletePlan({ planId }: { planId: string }) {
  return (
    <Button onClick={() => deletePlan(planId)} size="icon" variant="outline">
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete Plan</span>
    </Button>
  )
}
