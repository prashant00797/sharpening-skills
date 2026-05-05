// types.ts — define all aliases here
 
// 1. MessageRole — "user", "assistant", or "system"
type MessageRole = "user" | "assistant" | "system"
 
// 2. MessageStatus — "sending", "delivered", "failed"
type MessageStatus = "sending" | "delivered" | "failed"
 
// 3. AIModel — "gpt-4o", "claude-3-5-sonnet", "gemini-2.0-flash"
type AIModel = "gpt-4o" | "claude-3-5-sonnet" | "gemini-2.0-flash"
 
// 4. Message object — id (number), role, content (string), status
type Message = {
    id: number;
    role: MessageRole;
    content: string;
    status: MessageStatus;
}
 
// 5. ChatSession — sessionId (string), model, messages (array of Message)
type ChatSession = {
    sessionId: string;
    model: AIModel;
    messages:Message[]
}
 
// ─────────────────────────────────────────────────
// Now use your aliases in these functions:
 
// Takes a role, returns a display label
function getRoleLabel(role: MessageRole): string {
  if (role === "assistant") return "AI"
  if (role === "system") return "System"
  return "You"
}
 
// Creates a new message object — return type must use your alias
function createMessage(id: number, role: MessageRole, content: string): Message {
  return { id, role, content, status: "sending" }
}
 
// Takes a session, returns the count of failed messages
function countFailed(session: ChatSession): number {
  return session.messages.filter(m => m.status === "failed").length
}

