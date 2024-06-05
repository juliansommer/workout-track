import Header from "@/components/Header"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <>
      <Header />
      <section className="bg-white dark:bg-black min-h-screen pt-20">
        <div className="mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-gray-200 dark:bg-gray-400 px-8 py-10">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  )
}
