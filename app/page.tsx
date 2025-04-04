"use client"

import { useState, useEffect } from "react"
import { Mail, Inbox, Send, Trash, Tag, Plus, Search, ArchiveIcon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EmailList from "@/components/email-list"
import EmailView from "@/components/email-view"
import ComposeModal from "@/components/compose-modal"
import AiAssistantModal from "@/components/ai-assistant-modal"
import { emails } from "@/lib/data"
import type { Email } from "@/lib/types"

// View types for navigation
type ViewType = "inbox" | "sent" | "trash" | "archive"
// Label types for filtering
type LabelType = "work" | "important" | "urgent" | "personal" | null

export default function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [showAiAssistantModal, setShowAiAssistantModal] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [showEmailView, setShowEmailView] = useState(false)
  const [currentView, setCurrentView] = useState<ViewType>("inbox")
  const [activeLabel, setActiveLabel] = useState<LabelType>(null)
  const [filteredEmails, setFilteredEmails] = useState<Email[]>(emails)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filter emails based on current view, active label, and search query
  useEffect(() => {
    let filtered = [...emails]

    // Filter by view type
    if (currentView === "sent") {
      filtered = filtered.filter((email) => email.folder === "sent")
    } else if (currentView === "trash") {
      filtered = filtered.filter((email) => email.folder === "trash")
    } else if (currentView === "archive") {
      filtered = filtered.filter((email) => email.folder === "archive")
    } else {
      // Default to inbox
      filtered = filtered.filter((email) => email.folder === "inbox" || !email.folder)
    }

    // Filter by label if active
    if (activeLabel) {
      filtered = filtered.filter((email) => email.labels?.some((label) => label.type === activeLabel))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (email) =>
          email.subject.toLowerCase().includes(query) ||
          email.preview.toLowerCase().includes(query) ||
          email.sender.name.toLowerCase().includes(query) ||
          email.sender.email.toLowerCase().includes(query),
      )
    }

    setFilteredEmails(filtered)
  }, [currentView, activeLabel, searchQuery])

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email)
    if (isMobileView) {
      setShowEmailView(true)
    }
  }

  const handleBackToList = () => {
    setShowEmailView(false)
  }

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
    setActiveLabel(null)
    setSelectedEmail(null)
  }

  const handleLabelChange = (label: LabelType) => {
    setActiveLabel(label)
    setSelectedEmail(null)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[240px] bg-white border-r border-gray-200 p-5 flex flex-col hidden md:flex">
        <div className="flex items-center font-semibold text-lg mb-8 text-primary">
          <Sparkles className="mr-2" />
          <span>Smart Mail</span>
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <Button className="rounded-full" onClick={() => setShowComposeModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Compose
          </Button>

          <Button variant="outline" className="rounded-full" onClick={() => setShowAiAssistantModal(true)}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Assistant
          </Button>
        </div>

        <div className="space-y-1">
          <Button
            variant={currentView === "inbox" ? "secondary" : "ghost"}
            className="w-full justify-start font-normal"
            onClick={() => handleViewChange("inbox")}
          >
            <Inbox className={`mr-2 h-4 w-4 ${currentView === "inbox" ? "text-primary" : ""}`} />
            Inbox
          </Button>
          <Button
            variant={currentView === "sent" ? "secondary" : "ghost"}
            className="w-full justify-start font-normal"
            onClick={() => handleViewChange("sent")}
          >
            <Send className={`mr-2 h-4 w-4 ${currentView === "sent" ? "text-primary" : ""}`} />
            Sent
          </Button>
          <Button
            variant={currentView === "trash" ? "secondary" : "ghost"}
            className="w-full justify-start font-normal"
            onClick={() => handleViewChange("trash")}
          >
            <Trash className={`mr-2 h-4 w-4 ${currentView === "trash" ? "text-primary" : ""}`} />
            Trash
          </Button>
          <Button
            variant={currentView === "archive" ? "secondary" : "ghost"}
            className="w-full justify-start font-normal"
            onClick={() => handleViewChange("archive")}
          >
            <ArchiveIcon className={`mr-2 h-4 w-4 ${currentView === "archive" ? "text-primary" : ""}`} />
            Archive
          </Button>
        </div>

        <div className="mt-8 mb-2 text-sm text-gray-500 font-medium px-3">LABELS</div>
        <div className="space-y-1">
          <Button
            variant={activeLabel === "important" ? "secondary" : "ghost"}
            className="w-full justify-start font-normal"
            onClick={() => handleLabelChange(activeLabel === "important" ? null : "important")}
          >
            <Tag className="mr-2 h-4 w-4 text-orange-500" />
            Important
          </Button>
          <Button
            variant={activeLabel === "work" ? "secondary" : "ghost"}
            className="w-full justify-start font-normal"
            onClick={() => handleLabelChange(activeLabel === "work" ? null : "work")}
          >
            <Tag className="mr-2 h-4 w-4 text-green-500" />
            Work
          </Button>
          <Button
            variant={activeLabel === "personal" ? "secondary" : "ghost"}
            className="w-full justify-start font-normal"
            onClick={() => handleLabelChange(activeLabel === "personal" ? null : "personal")}
          >
            <Tag className="mr-2 h-4 w-4 text-blue-500" />
            Personal
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around items-center md:hidden z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleViewChange("inbox")}
          className={currentView === "inbox" ? "text-primary" : ""}
        >
          <Inbox className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleViewChange("sent")}
          className={currentView === "sent" ? "text-primary" : ""}
        >
          <Send className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowComposeModal(true)}
          className="bg-primary text-white rounded-full h-12 w-12 flex items-center justify-center shadow-md"
        >
          <Plus className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowAiAssistantModal(true)}
          className={showAiAssistantModal ? "text-primary" : ""}
        >
          <Sparkles className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleViewChange("archive")}
          className={currentView === "archive" ? "text-primary" : ""}
        >
          <ArchiveIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden pb-16 md:pb-0">
        {/* Email List */}
        <div
          className={`w-full md:w-[350px] bg-white border-r border-gray-200 overflow-y-auto ${isMobileView && showEmailView ? "hidden" : "block"}`}
        >
          <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
            <div className="flex items-center bg-gray-50 rounded-lg px-3">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredEmails.length > 0 ? (
            <EmailList emails={filteredEmails} selectedEmailId={selectedEmail?.id} onSelectEmail={handleEmailSelect} />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Mail className="h-12 w-12 text-gray-300 mb-2" />
              <p>No emails found</p>
              {(activeLabel || searchQuery) && (
                <Button
                  variant="ghost"
                  className="mt-2 text-primary"
                  onClick={() => {
                    setActiveLabel(null)
                    setSearchQuery("")
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Email View */}
        <div className={`flex-1 ${isMobileView && !showEmailView ? "hidden" : "block"}`}>
          {selectedEmail ? (
            <EmailView email={selectedEmail} onBackToList={handleBackToList} isMobileView={isMobileView} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select an email to view</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && <ComposeModal onClose={() => setShowComposeModal(false)} />}

      {/* AI Assistant Modal */}
      {showAiAssistantModal && <AiAssistantModal onClose={() => setShowAiAssistantModal(false)} />}
    </div>
  )
}

