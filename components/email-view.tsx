"use client"

import { useState } from "react"
import { ArrowLeft, MoreHorizontal, Trash2, Archive, Reply, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import type { Email } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import AiSummary from "@/components/ai-summary"
import QuickReplies from "@/components/quick-replies"

interface EmailViewProps {
  email: Email
  onBackToList: () => void
  isMobileView: boolean
}

export default function EmailView({ email, onBackToList, isMobileView }: EmailViewProps) {
  const [replyText, setReplyText] = useState("")
  const [selectedReply, setSelectedReply] = useState<string | null>(null)

  const handleQuickReplySelect = (reply: string) => {
    setSelectedReply(reply)
    setReplyText(reply)
  }

  const handleAiAssist = async () => {
    // This would be implemented with AI SDK
    setReplyText(
      "Thank you for the update, Sarah. I've reviewed the campaign progress and I'm impressed with the results so far. I'm available next Tuesday for the team review meeting. Looking forward to discussing our strategy for the remainder of the quarter.\n\nBest regards,",
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 flex items-center bg-white">
        {isMobileView && (
          <Button variant="ghost" size="icon" onClick={onBackToList} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="flex-1"></div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon">
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <h1 className="text-xl font-medium mb-5">{email.subject}</h1>

        <div className="flex items-center mb-6">
          <Avatar className="h-10 w-10 mr-3 bg-primary text-white">{email.sender.name.charAt(0)}</Avatar>
          <div className="flex-1">
            <div className="font-medium">{email.sender.name}</div>
            <div className="text-sm text-gray-500">{email.sender.email}</div>
          </div>
          <div className="text-sm text-gray-500">{formatDate(email.date)}</div>
        </div>

        <AiSummary email={email} />

        <div className="prose prose-sm max-w-none mb-8">
          {email.body.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center text-sm font-medium mb-3 text-primary">
            <Reply className="h-4 w-4 mr-1.5" />
            REPLY
          </div>

          <QuickReplies onSelectReply={handleQuickReplySelect} selectedReply={selectedReply} />

          <div className="bg-white border border-gray-200 rounded-md p-3 mt-4">
            <Textarea
              placeholder="Write your reply..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[100px] resize-none"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-between items-center mt-3">
              <Button variant="outline" size="sm" className="text-primary" onClick={handleAiAssist}>
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                AI Assist
              </Button>
              <Button size="sm">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

