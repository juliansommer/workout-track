import Nav from "@/components/Nav"
import ThemeButton from "@/components/ThemeButton"
import ThemeProvider from "@/components/ThemeProvider"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  applicationName: "Workout Track",
  authors: {
    name: "Julian Sommer",
    url: "https://github.com/juliansommer",
  },
  creator: "Julian Sommer",
  description: "Workout Track",
  keywords: ["Workout", "Track"],
  robots: {
    index: true,
    follow: true,
  },
  title: "Workout Track",
  openGraph: {
    title: "Workout Track",
    description: "Workout Track",
    siteName: "Workout Track",
    locale: "en_AU",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange>
            <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 sm:px-16">
              <Nav />
              {children}
            </main>
            <ThemeButton />
          </ThemeProvider>
        </body>
      </head>
    </html>
  )
}
