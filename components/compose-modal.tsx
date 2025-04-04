"use client"

import { useState } from "react"
import { X, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ComposeModalProps {
  onClose: () => void
}

export default function ComposeModal({ onClose }: ComposeModalProps) {
  const [to, setTo] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([
    "Thank you for your email",
    "I'll get back to you soon",
    "Best regards",
  ])

  const handleSuggestionClick = (suggestion: string) => {
    setBody(body + (body ? " " : "") + suggestion)
  }

  const handleRefreshSuggestions = async () => {
    // In a real implementation, this would use the AI SDK
    const newSuggestions = [
      "I appreciate your message",
      "Looking forward to our collaboration",
      "Thank you for your consideration",
    ]
    setSuggestions(newSuggestions)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-[600px] shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-medium">New Message</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <Input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} className="border-gray-200" />
          </div>

          <div className="mb-4">
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border-gray-200"
            />
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Write your message..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[180px] resize-vertical border-gray-200"
            />
          </div>

          <div className="bg-primary-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4 mr-1.5" />
                AI SUGGESTIONS
              </div>
              <Button variant="ghost" size="sm" className="text-primary h-7 text-xs" onClick={handleRefreshSuggestions}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start h-auto py-2 px-3 text-sm bg-white"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 border-t border-gray-200">
          <Button onClick={onClose} variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button>Send</Button>
        </div>
      </div>
    </div>
  )
}

