// chat-types.ts
// 1. Role — can only be one of these three exact strings
let messageRole: "user" | "assistant" | "system";
// 2. Message ID — numeric when local, UUID string when synced to server
let messageId: number | string;
// 3. API result — either a text response or an HTTP error code (number)
let apiResult: string | number;
// 4. This function receives a message ID (either type)
// and returns a display label
function formatId(id: typeof messageId): string {
  if (typeof id === "number") {
    return `Message ${id}`;
  }
  return `Synced: ${id.slice(0, 8)}`;
}
// 5. This function takes an API result and returns a status string
// If it's a string, return it directly
// If it's a number (error code), return "Error: {code}"
function handleApiResult(result: typeof apiResult): string | number {
  if (typeof result === "string") {
    return result;
  }
  return `Error: ${result}`;
}
