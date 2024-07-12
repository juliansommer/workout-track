export default function Heading({ title }: { title: string }) {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold md:text-3xl">{title}</h1>
    </div>
  )
}
