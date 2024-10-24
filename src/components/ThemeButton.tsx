"use client"
import { Button } from "@/components/ui/Button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

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
        }}>
        {theme === "light" ? (
          <Moon className="scale-70 h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="scale-70 h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
    )
  )
}
