"use client"

import { Button } from "@/components/ui/button"

interface QuickRepliesProps {
  onSelectReply: (reply: string) => void
  selectedReply: string | null
}

export default function QuickReplies({ onSelectReply, selectedReply }: QuickRepliesProps) {
  const quickReplies = [
    "Thanks for the update!",
    "I'll review and get back to you",
    "Available next week",
    "Great progress!",
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {quickReplies.map((reply, index) => (
        <Button
          key={index}
          variant={selectedReply === reply ? "default" : "outline"}
          size="sm"
          className={selectedReply === reply ? "bg-primary text-white" : "bg-white"}
          onClick={() => onSelectReply(reply)}
        >
          {reply}
        </Button>
      ))}
    </div>
  )
}

