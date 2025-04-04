export interface Sender {
  name: string
  email: string
}

export interface Label {
  id: string
  name: string
  type: "work" | "important" | "urgent" | "personal"
}

export interface Email {
  id: string
  sender: Sender
  subject: string
  preview: string
  body: string
  date: string
  unread: boolean
  folder?: "inbox" | "sent" | "trash" | "archive" // Add folder property
  labels?: Label[]
}

