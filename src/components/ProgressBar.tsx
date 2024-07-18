"use client"
import { Next13ProgressBar } from "next13-progressbar"
import React from "react"

export default function ProgressBar({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="4px"
        color="#0A2FFF"
        options={{ showSpinner: false }}
        showOnShallow
      />
    </>
  )
}
