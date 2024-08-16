import Nav from "@/components/Nav"
import ProgressBar from "@/components/providers/ProgressBar"
import ThemeProvider from "@/components/providers/ThemeProvider"
import type { Metadata, Viewport } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const viewport: Viewport = {
  themeColor: "#171717", // neutral-900
}

// order of this doesn't matter as next puts the important stuff (viewport, themecolour, title description) first
// then puts the others alphabetised
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: "%s | Workout Track",
    default: "Workout Track",
  },
  description: "Workout Track",
  applicationName: "Workout Track",
  keywords: ["Workout", "Track"],
  creator: "Julian Sommer",

  // not defining title and description in og as next will use the metadata.title and metadata.description
  // so can update these on page and it will also update the open graph and twitter cards
  // twitter is not defined as next does it automatically with the title and description so can keep all 3 consistent easily
  openGraph: {
    siteName: "Workout Track",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontSans.variable} suppressHydrationWarning>
      <head>
        <body className="min-h-screen overflow-y-scroll bg-neutral-50 font-sans antialiased selection:bg-neutral-200 dark:bg-neutral-900 dark:selection:bg-neutral-700">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange>
            <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 sm:px-16">
              <ProgressBar>
                <Nav />
                {children}
              </ProgressBar>
            </main>
          </ThemeProvider>
        </body>
      </head>
    </html>
  )
}
