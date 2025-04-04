import type { Email } from "./types"

export const emails: Email[] = [
  {
    id: "1",
    sender: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
    },
    subject: "Project Update: Q2 Marketing Campaign",
    preview:
      "Hi team, I wanted to share an update on our Q2 marketing campaign progress. We've hit several key milestones...",
    body: "Hi team,\n\nI wanted to share an update on our Q2 marketing campaign progress. We've hit several key milestones and I'm pleased with our progress so far.\n\nThe social media campaign has generated 40% more engagement than projected, and the email open rates are consistently above industry average. The new landing page has a conversion rate of 12%, which exceeds our target of 8%.\n\nI've attached a detailed report with all the metrics and KPIs. Please review and provide your feedback by Friday.\n\nI'd also like to schedule a team review meeting next week to discuss our strategy for the remainder of the quarter. I'll send a calendar invite once I hear back from everyone about their availability.\n\nBest regards,\nSarah",
    date: "2025-04-04T10:23:00",
    folder: "inbox",
    unread: true,
    labels: [
      { id: "1", name: "Work", type: "work" },
      { id: "2", name: "Important", type: "important" },
    ],
  },
  {
    id: "2",
    sender: {
      name: "Alex Williams",
      email: "alex.williams@example.com",
    },
    subject: "Invoice #12345 - Payment Confirmation",
    preview:
      "This email confirms that we've received your payment for Invoice #12345. Thank you for your prompt payment...",
    body: "Hello,\n\nThis email confirms that we've received your payment for Invoice #12345 in the amount of $1,250.00.\n\nThank you for your prompt payment. Your account has been updated and is in good standing.\n\nIf you have any questions about your account or need assistance with anything else, please don't hesitate to contact our support team.\n\nBest regards,\nAlex Williams\nAccounting Department",
    date: "2025-04-03T15:45:00",
    folder: "inbox",
    unread: false,
    labels: [{ id: "1", name: "Work", type: "work" }],
  },
  {
    id: "3",
    sender: {
      name: "Tech Support",
      email: "support@example.com",
    },
    subject: "RE: Help with account access",
    preview:
      "Thank you for contacting our support team. I've reset your account password as requested. You should receive...",
    body: "Hello,\n\nThank you for contacting our support team. I've reset your account password as requested.\n\nYou should receive an email shortly with instructions on how to set a new password. The link in that email will be valid for 24 hours.\n\nIf you don't receive the password reset email within the next 15 minutes, please check your spam folder. If you still don't see it, please reply to this email and I'll help you further.\n\nLet me know if you have any other questions or issues.\n\nBest regards,\nTech Support Team",
    date: "2025-04-03T09:12:00",
    folder: "inbox",
    unread: true,
    labels: [{ id: "3", name: "Urgent", type: "urgent" }],
  },
  {
    id: "4",
    sender: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
    },
    subject: "Meeting Notes - Product Strategy",
    preview:
      "Hello everyone, Attached are the notes from our product strategy meeting yesterday. We covered the roadmap...",
    body: "Hello everyone,\n\nAttached are the notes from our product strategy meeting yesterday. We covered the roadmap for Q3 and Q4, including the launch timeline for the new features we discussed.\n\nKey decisions made:\n\n1. We will prioritize the mobile app redesign for Q3\n2. The new analytics dashboard will be pushed to early Q4\n3. We'll form a small team to explore the AI-powered recommendations feature\n\nPlease review these notes and let me know if I missed anything important or if you have any questions.\n\nThanks,\nMichael",
    date: "2025-04-02T14:30:00",
    folder: "inbox",
    unread: false,
    labels: [
      { id: "1", name: "Work", type: "work" },
      { id: "2", name: "Important", type: "important" },
    ],
  },
  {
    id: "5",
    sender: {
      name: "Jessica Taylor",
      email: "jessica.taylor@example.com",
    },
    subject: "Weekend Plans",
    preview:
      "Hey! I was thinking we could go hiking this weekend if the weather is nice. There's a new trail I've been wanting to try...",
    body: "Hey!\n\nI was thinking we could go hiking this weekend if the weather is nice. There's a new trail I've been wanting to try at the state park.\n\nIt's supposed to be about 5 miles round trip with some great views at the summit. The forecast looks good for Saturday morning.\n\nLet me know if you're interested and we can plan the details. I can pick you up around 8am if that works for you.\n\nCheers,\nJessica",
    date: "2025-04-01T18:22:00",
    folder: "inbox",
    unread: false,
    labels: [{ id: "4", name: "Personal", type: "personal" }],
  },
  {
    id: "6",
    sender: {
      name: "Marketing Team",
      email: "marketing@example.com",
    },
    subject: "Social Media Campaign Results - March 2025",
    preview:
      "Here are the results from our March social media campaigns. Overall engagement increased by 27% compared to February...",
    body: "Hi Team,\n\nHere are the results from our March social media campaigns. Overall engagement increased by 27% compared to February, with particularly strong performance on Instagram and LinkedIn.\n\nKey metrics:\n\n- Total impressions: 1.2M (+18% MoM)\n- Engagement rate: 3.8% (+0.7% MoM)\n- Click-through rate: 2.1% (+0.3% MoM)\n- New followers: 3,450 (+22% MoM)\n\nThe video content we published performed exceptionally well, with 45% higher engagement than our static posts. We should consider allocating more budget to video production for Q2.\n\nI've attached the full report with platform-specific breakdowns for your review.\n\nBest,\nMarketing Team",
    date: "2025-03-31T11:05:00",
    folder: "archive",
    unread: false,
    labels: [{ id: "1", name: "Work", type: "work" }],
  },
  {
    id: "7",
    sender: {
      name: "David Wilson",
      email: "david.wilson@example.com",
    },
    subject: "Thank you for your purchase",
    preview:
      "Thank you for your recent purchase! Your order #54321 has been processed and will be shipped within 2 business days...",
    body: "Dear Customer,\n\nThank you for your recent purchase! Your order #54321 has been processed and will be shipped within 2 business days.\n\nOrder details:\n- 1x Premium Wireless Headphones - $149.99\n- 1x Protective Case - $24.99\n- Shipping - $8.99\n- Total: $183.97\n\nYou will receive a shipping confirmation email with tracking information once your order is on its way. If you have any questions about your order, please don't hesitate to contact our customer service team.\n\nWe appreciate your business!\n\nBest regards,\nDavid Wilson\nCustomer Support",
    date: "2025-03-30T09:45:00",
    folder: "trash",
    unread: false,
    labels: [{ id: "4", name: "Personal", type: "personal" }],
  },
  {
    id: "8",
    sender: {
      name: "Emily Rodriguez",
      email: "emily@example.com",
    },
    subject: "Draft of the proposal for review",
    preview:
      "Hi, I've attached the draft of the client proposal for your review. I've incorporated all the feedback from our last meeting...",
    body: "Hi,\n\nI've attached the draft of the client proposal for your review. I've incorporated all the feedback from our last meeting and added the additional case studies we discussed.\n\nThe executive summary still needs some work, and I'd appreciate your input on the pricing section. I'm not sure if we should include the optional add-on services in the main proposal or as a separate attachment.\n\nCould you please review and send your comments by Thursday? I'd like to finalize this by Friday so we can send it to the client next Monday.\n\nThanks,\nEmily",
    date: "2025-03-29T16:30:00",
    folder: "sent",
    unread: false,
    labels: [
      { id: "1", name: "Work", type: "work" },
      { id: "2", name: "Important", type: "important" },
    ],
  },
]

