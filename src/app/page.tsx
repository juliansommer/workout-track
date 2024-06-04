import Header from "@/components/Header"

export default function Home() {
  return (
    <>
      <Header />
      <section className="bg-blue-600 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <p className="text-3xl font-semibold">
            Implement Authentication with Supabase in Next.js 14
          </p>
        </div>
      </section>
    </>
  )
}
