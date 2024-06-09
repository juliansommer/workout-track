import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <>
      <section className="bg-white pt-20 dark:bg-black">
        <div className="mx-auto flex h-full items-center justify-center px-6 py-12">
          <LoginForm />
        </div>
      </section>
    </>
  )
}
