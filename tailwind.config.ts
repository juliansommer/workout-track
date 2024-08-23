/* eslint-disable */
import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
