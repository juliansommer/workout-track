import Nav from "@/components/Nav"
import ThemeButton from "@/components/ThemeButton"
import ThemeProvider from "@/components/ThemeProvider"
import { cn, getURL } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
})

export const viewport: Viewport = {
  themeColor: "black",
}

// order of this doesnt matter as next puts the important stuff (viewport, themecolour, title description) first
// then puts the others alphabeticised
export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: {
    template: "%s | Workout Track",
    default: "Workout Track",
  },
  description: "Workout Track",
  applicationName: "Workout Track",
  keywords: ["Workout", "Track"],

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
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <body
          className={cn(
            "min-h-screen overflow-y-scroll bg-background font-sans antialiased",
            inter.variable,
          )}>
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
