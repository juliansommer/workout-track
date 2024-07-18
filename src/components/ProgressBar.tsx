"use client"
import { AppProgressBar } from "next-nprogress-bar"

export default function ProgressBar({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <AppProgressBar
        height="3px"
        color="#0A2FFF"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}
