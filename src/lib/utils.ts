import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function cleanTimestamp(timestamp: string): string {
  return new Date(timestamp).toISOString().split("T")[0] ?? ""
}

const TRIM_HYPHENS_START_REGEX = /^-+/
const TRIM_HYPHENS_END_REGEX = /-+$/

export function createSlug(string: string): string {
  return string
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(TRIM_HYPHENS_START_REGEX, "")
    .replace(TRIM_HYPHENS_END_REGEX, "")
}
