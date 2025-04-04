"use client"
import { Badge } from "@/components/ui/badge"
import type { Email } from "@/lib/types"
import { formatDistanceToNow } from "@/lib/utils"

interface EmailListProps {
  emails: Email[]
  selectedEmailId: string | undefined
  onSelectEmail: (email: Email) => void
}

export default function EmailList({ emails, selectedEmailId, onSelectEmail }: EmailListProps) {
  return (
    <div>
      {emails.map((email) => (
        <div
          key={email.id}
          className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
            email.id === selectedEmailId ? "bg-primary-50" : email.unread ? "bg-white" : "bg-white"
          } hover:bg-gray-50`}
          onClick={() => onSelectEmail(email)}
        >
          <div className="flex justify-between mb-1">
            <div className={`text-sm ${email.unread ? "font-semibold" : "font-normal"}`}>{email.sender.name}</div>
            <div className="text-xs text-gray-500">{formatDistanceToNow(email.date)}</div>
          </div>
          <div className="text-sm font-medium mb-1 truncate">{email.subject}</div>
          <div className="text-xs text-gray-500 mb-2 truncate">{email.preview}</div>

          {email.labels && email.labels.length > 0 && (
            <div className="flex gap-2">
              {email.labels.map((label) => (
                <Badge
                  key={label.id}
                  variant="outline"
                  className={`text-xs px-2 py-0.5 ${
                    label.type === "work"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : label.type === "important"
                        ? "bg-orange-50 text-orange-600 border-orange-200"
                        : label.type === "urgent"
                          ? "bg-red-50 text-red-600 border-red-200"
                          : "bg-blue-50 text-blue-600 border-blue-200"
                  }`}
                >
                  {label.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

