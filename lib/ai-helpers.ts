import type { Email } from "./types"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateEmailSummary(email: Email): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Summarize the following email in 1-2 sentences, highlighting the key points and any action items:
      
      Subject: ${email.subject}
      
      ${email.body}`,
      system: "You are an AI assistant that summarizes emails concisely and accurately.",
    })

    return text
  } catch (error) {
    console.error("Error generating email summary:", error)
    return "Unable to generate summary."
  }
}

export async function generateSmartReplies(email: Email): Promise<string[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate 4 short, professional reply options for the following email. Each reply should be 5-10 words:
      
      Subject: ${email.subject}
      
      ${email.body}`,
      system: "You are an AI assistant that helps users respond to emails efficiently.",
    })

    // Parse the response into an array of replies
    const replies = text.split("\n").filter((line) => line.trim().length > 0)
    return replies.slice(0, 4) // Limit to 4 replies
  } catch (error) {
    console.error("Error generating smart replies:", error)
    return ["Thanks for your email.", "I'll get back to you soon.", "Sounds good to me.", "I appreciate the update."]
  }
}

export async function generateFullReply(email: Email, tone = "professional"): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Write a ${tone} reply to the following email:
      
      Subject: ${email.subject}
      
      ${email.body}`,
      system:
        "You are an AI assistant that helps users write email replies. Keep the replies concise, relevant, and in the requested tone.",
    })

    return text
  } catch (error) {
    console.error("Error generating email reply:", error)
    return "Thank you for your email. I appreciate your message and will respond in more detail soon."
  }
}

export async function categorizeEmail(email: Email): Promise<string[]> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Categorize the following email into one or more of these categories: Work, Personal, Important, Urgent, Follow-up, Newsletter, Promotional.
      
      Subject: ${email.subject}
      
      ${email.body}
      
      Return only the category names as a comma-separated list.`,
      system: "You are an AI assistant that categorizes emails accurately.",
    })

    return text.split(",").map((category) => category.trim())
  } catch (error) {
    console.error("Error categorizing email:", error)
    return []
  }
}

export async function generateEmailSuggestions(context?: string): Promise<string[]> {
  try {
    const contextPrompt = context ? `Based on this context: "${context}", ` : ""

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `${contextPrompt}generate 3 short, helpful phrases that could be used in an email.
      
      Each phrase should be professional and versatile enough to be used in different types of emails. Return only the phrases, one per line.`,
      system: "You are an AI assistant that helps users write better emails with helpful suggestions.",
    })

    return text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .slice(0, 3)
  } catch (error) {
    console.error("Error generating email suggestions:", error)
    return [
      "Thank you for your consideration",
      "I look forward to hearing from you",
      "Please let me know if you need anything else",
    ]
  }
}

