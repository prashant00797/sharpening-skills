// utility-practice.ts
 
type ChatSession = {
  id: string
  userId: string
  model: "gpt-4o" | "claude-3-5-sonnet" | "gemini-2.0-flash"
  title: string
  createdAt: Date
  updatedAt: Date
  messageCount: number
  isPinned: boolean
}
 
// 1. CreateSessionInput — everything except id, createdAt, updatedAt
//    (the server generates these)
type CreateSessionInput = Omit<ChatSession, "id" | "createdAt" | "updatedAt">
 
// 2. SessionPreview — only the fields needed for the sidebar list
//    (id, title, model, updatedAt, messageCount)
type SessionPreview = Pick<ChatSession, "id" | "title" | "model" | "updatedAt" | "messageCount">
 
// 3. UpdateSessionInput — all fields optional except id (required)
//    Pattern: Pick id, then merge with Partial of the rest
type UpdateSessionInput = Pick<ChatSession, "id"> & Partial<Omit<ChatSession, "id">>
 
// 4. SessionConfig — readonly version of ChatSession (for a frozen config)
type SessionConfig = Readonly<ChatSession>
 
// 5. ModelPricing — maps each model to a cost per token
type AIModel = ChatSession["model"]   // extract the model type from ChatSession
type ModelPricing = Record<AIModel, number>
 
// ─────────────────────────────────────────────────
// Use your types in these functions:
 
// Creates a new session (no id, createdAt, updatedAt)
function createSession(input: CreateSessionInput): ChatSession {
  return {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date()
  }

}
 
// Returns only the preview fields from a full session
function toPreview(session: ChatSession): SessionPreview {
  const { id, title, model, updatedAt, messageCount } = session
  return { id, title, model, updatedAt, messageCount }
}
 
// Takes an update object — id is required, rest optional
function updateSession(update: UpdateSessionInput): void {
  console.log("updating session", update.id)
  // update.model might be undefined — it is optional
}

