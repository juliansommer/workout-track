"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"

export default function ThemeButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // need to check if mounted as otherwise there is hydration error
  if (!mounted) {
    return null
  }

  return (
    mounted && (
      <Button
        variant="outline"
        size="icon"
        aria-label={theme === "dark" ? "Toggle light mode" : "Toggle dark mode"}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark")
        }}
      >
        {theme === "light" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] scale-70" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] scale-70" />
        )}
      </Button>
    )
  )
}
