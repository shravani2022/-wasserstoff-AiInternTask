"use client"

import type React from "react"

import { useState } from "react"
import { X, Sparkles, Send, Loader2, RefreshCw, Inbox, FileText, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AiAssistantModalProps {
  onClose: () => void
}

export default function AiAssistantModal({ onClose }: AiAssistantModalProps) {
  const [activeTab, setActiveTab] = useState("chat")
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI email assistant. I can help you draft emails, summarize conversations, manage your inbox, and more. How can I help you today?",
    },
  ])

  const handleSendMessage = () => {
    if (!userInput.trim()) return

    // Add user message to chat
    setChatMessages([...chatMessages, { role: "user", content: userInput }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      if (userInput.toLowerCase().includes("draft") || userInput.toLowerCase().includes("write")) {
        response =
          "I'd be happy to help you draft an email. Could you provide some details about what you'd like to include? For example, who is it for, what's the purpose, and any specific points you want to mention?"
      } else if (userInput.toLowerCase().includes("summarize")) {
        response =
          "I can summarize email threads for you. If you have a specific conversation in mind, please share the details and I'll create a concise summary highlighting the key points."
      } else if (userInput.toLowerCase().includes("organize") || userInput.toLowerCase().includes("categorize")) {
        response =
          "I can help organize your inbox by suggesting categories for your emails. This can help you prioritize important messages and keep your inbox tidy."
      } else {
        response =
          "I'm here to assist with your email needs. I can help draft emails, summarize conversations, suggest replies, organize your inbox, and more. What specific email task would you like help with?"
      }

      setChatMessages([...chatMessages, { role: "user", content: userInput }, { role: "assistant", content: response }])
      setUserInput("")
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[800px] h-[600px] shadow-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            <h2 className="font-medium">AI Email Assistant</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="chat" className="flex-1 flex flex-col" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mx-4 mt-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="inbox">Inbox Assistant</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col p-4 overflow-hidden">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-gray-500">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg flex items-center p-2">
              <Textarea
                placeholder="Ask me anything about emails..."
                className="flex-1 border-0 focus-visible:ring-0 resize-none min-h-[60px] max-h-[120px]"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                size="icon"
                className="ml-2"
                onClick={handleSendMessage}
                disabled={isLoading || !userInput.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Meeting Request</CardTitle>
                  <CardDescription>Professional template for scheduling meetings</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Subject: Request for Meeting - [Topic]</p>
                  <p className="mt-2">Dear [Name],</p>
                  <p className="mt-2">
                    I hope this email finds you well. I would like to schedule a meeting to discuss [topic]...
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Follow-up Email</CardTitle>
                  <CardDescription>Professional follow-up after meetings</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Subject: Follow-up: [Meeting/Event Name]</p>
                  <p className="mt-2">Hi [Name],</p>
                  <p className="mt-2">
                    Thank you for your time today. I wanted to follow up on our discussion about...
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Thank You Note</CardTitle>
                  <CardDescription>Express gratitude professionally</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Subject: Thank You for [Reason]</p>
                  <p className="mt-2">Dear [Name],</p>
                  <p className="mt-2">
                    I wanted to express my sincere thanks for [reason]. Your support/help/guidance has been
                    invaluable...
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Project Update</CardTitle>
                  <CardDescription>Keep stakeholders informed</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>Subject: [Project Name] - Status Update</p>
                  <p className="mt-2">Hello Team,</p>
                  <p className="mt-2">
                    I'm writing to provide an update on the progress of [project name]. Here are the key developments...
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inbox" className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Inbox Analysis</h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  Refresh
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Inbox className="h-4 w-4 mr-2 text-primary" />
                      Unread
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-500">emails need attention</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-orange-500" />
                      Important
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-gray-500">high priority emails</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      Follow-ups
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-gray-500">emails need follow-up</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-medium mb-3">Suggested Actions</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Archive 8 old newsletters</p>
                      <p className="text-sm text-gray-500">Clean up your inbox</p>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Categorize 5 uncategorized emails</p>
                      <p className="text-sm text-gray-500">Improve organization</p>
                    </div>
                    <Button size="sm">Apply</Button>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-medium">Reply to 3 urgent messages</p>
                      <p className="text-sm text-gray-500">From important contacts</p>
                    </div>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                    Email Summarizer
                  </CardTitle>
                  <CardDescription>Get concise summaries of long email threads</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Paste email thread here..." className="min-h-[100px]" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Summarize</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <RefreshCw className="h-4 w-4 mr-2 text-green-500" />
                    Email Rewriter
                  </CardTitle>
                  <CardDescription>Improve tone and clarity of your emails</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Enter your draft email..." className="min-h-[100px]" />
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      Professional
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Friendly
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Concise
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Rewrite</Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    Email Analyzer
                  </CardTitle>
                  <CardDescription>Get insights and suggestions for your emails</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Paste an email to analyze..." className="min-h-[100px]" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Check Tone</Button>
                  <Button variant="outline">Check Grammar</Button>
                  <Button>Full Analysis</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

