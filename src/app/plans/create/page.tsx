import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { Textarea } from "@/components/ui/Textarea"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Plan",
  alternates: {
    canonical: "/plans/create",
  },
}

export default function CreatePlan() {
  return (
    <div className="w-80 p-5">
      <p>Create Plan</p>
      <div className="pt-5">
        <Input type="text" placeholder="Name" />
      </div>
      <div className="pt-5">
        <Textarea placeholder="Notes" />
      </div>
      <div className="pt-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              Add Exercise
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Exercise</Label>
                  <Input id="muscle" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="maxWidth">Sets</Label>
                  <Input id="sets" className="col-span-2 h-8" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
