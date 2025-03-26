export default async function Workout(props: {
  params: Promise<{ workout: string }>
}) {
  const params = await props.params
  return <div>{params.workout}</div>
}
