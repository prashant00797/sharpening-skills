import { maxLength, z } from "zod"
 
// PART A — Define schemas for the chat API responses
 
// 1. Message schema
//    id: number, role: "user"|"assistant"|"system", content: string, timestamp: string
const messageSchema = z.object({
    id: z.number(),
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
    timestamp:z.string()
})
 
// 2. Chat response schema
//    id: string, model: string, message: (use messageSchema), finish_reason: "stop"|"length"|"error"
const chatResponseSchema = z.object({
    id: z.string(),
    model: z.string(),
    message: messageSchema,
    finish_reason:z.enum(["stop","length","error"])
})
 
// 3. Error response schema
//    error: string, code: number, retry_after: optional number

const errorResponseSchema = z.object({
    error: z.string(),
    code: z.number(),
    retry_after:z.number().optional()
})
 
// Extract all TypeScript types from schemas
type Message = z.infer<typeof messageSchema>
type ChatResponse = z.infer<typeof chatResponseSchema>
type ErrorResponse = z.infer<typeof errorResponseSchema>
 
// ─────────────────────────────────────────────────
// PART B — Use safeParse in a fetch function
 
// This function fetches from the chat API
// It must validate the response before returning it
// If validation fails, it should return null and log the error
async function fetchChatResponse(sessionId: string): Promise<ChatResponse | null> {
  const res = await fetch(`/api/chat/${sessionId}`)
  const data = await res.json()
 
  const result = chatResponseSchema.safeParse(data)
 
  if (result.success) {
    return result.data
  } else {
    console.error("Invalid API response:", result)
    return null
  }
}
 
// ─────────────────────────────────────────────────
// PART C — Add Zod validations (not just shape, but rules)
 
// Build a schema for user-submitted prompt settings:
// maxTokens: number between 100 and 8000
// temperature: number between 0 and 2
// systemPrompt: string, minimum 10 characters
// model: one of the 3 known models
const promptSettingsSchema = z.object({
  maxTokens: z.number().gt(100).lt(8000),
  temperature: z.number().gt(0).lt(2),
  systemPrompt: z.string().min(10),
  model: z.enum(["gpt-0","claude-0","gemini-0"]),
})
 
type PromptSettings = z.infer<typeof promptSettingsSchema>

