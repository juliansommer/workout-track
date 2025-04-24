"use client"

import { ProgressProvider } from "@bprogress/next/app"

export default function ProgressBar({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ProgressProvider
        height="3px"
        color="#0A2FFF"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </>
  )
}
