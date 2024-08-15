export default function Heading({ title }: { title: string }) {
  return (
    <h1 className="mb-6 text-center text-2xl font-semibold md:text-3xl">
      {title}
    </h1>
  )
}
