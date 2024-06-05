import Header from "@/components/Header"

export default function Home() {
  return (
    <>
      <Header />
      <section className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto rounded-md h-[20rem] flex justify-center items-center">
          <p className="text-3xl font-semibold text-black dark:text-white">
            Test
          </p>
        </div>
      </section>
    </>
  )
}
