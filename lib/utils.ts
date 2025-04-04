import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDistanceToNow(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  // If it's today, return the time
  if (date.toDateString() === now.toDateString()) {
    return format(date, "h:mm a")
  }

  // If it's yesterday
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  }

  // If it's within the last week
  if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return format(date, "EEEE") // Day name
  }

  // Otherwise return the date
  return format(date, "MMM d")
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return format(date, "MMM d, yyyy 'at' h:mm a")
}

