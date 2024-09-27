export default async function Workout({
  params,
}: {
  params: { workout: string }
}) {
  return <div>{params.workout}</div>
}
