import createSupabaseServerClient from "@/lib/supabase/server"
import { type Database } from "@/types/supabase"
import Image from "next/image"

export default async function Exercise({
  params,
}: {
  params: { exercise: string }
}) {
  const exercise = decodeURIComponent(params.exercise)
  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from("exercise")
    .select()
    .eq("name", exercise)
    .returns<Database["public"]["Tables"]["exercise"]["Row"]>()

  if (error) {
    throw new Error("Failed to fetch exercises")
  }

  // why is data.image undefined when i can see the image is defined in the stringified json?
  return (
    <>
      <Image
        src={`${process.env.S3_BUCKET}/exercise/${data.image}`}
        alt={`${exercise} Image`}
        width={100}
        height={100}
      />
      <p>{JSON.stringify(data)}</p>
    </>
  )
}
