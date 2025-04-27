import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter as FontSans } from "next/font/google"

import Nav from "@/components/Nav"
import ProgressBar from "@/components/ProgressBar"

import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: "%s | Workout Track",
    default: "Workout Track",
  },
  description: "Workout Track",
  robots: {
    index: false,
  },
  openGraph: {
    siteName: "Workout Track",
    locale: "en_US",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    site: process.env.NEXT_PUBLIC_SITE_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontSans.variable} suppressHydrationWarning>
      <body className="min-h-screen overflow-y-scroll bg-neutral-50 font-sans antialiased selection:bg-neutral-200 dark:bg-neutral-900 dark:selection:bg-neutral-700">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 sm:px-16">
            <ProgressBar>
              <Nav />
              {children}
            </ProgressBar>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
