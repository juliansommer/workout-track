import Header from "@/components/Header"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-white pt-20 dark:bg-black">
        <div className="mx-auto flex h-full items-center justify-center px-6 py-12">
          <div className="bg-gray-200 px-8 py-10 dark:bg-gray-400 md:w-8/12 lg:w-5/12">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  )
}
