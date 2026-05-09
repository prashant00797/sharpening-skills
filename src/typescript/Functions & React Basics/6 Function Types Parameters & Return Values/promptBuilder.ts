/*Scenario
You are building utility functions for an AI prompt builder — a tool that constructs prompts from parts. 
Functions take message arrays, system prompts, and token limits. 
Some functions take callback functions as parameters.
*/

// prompt-builder.ts

type Message = { role: "user" | "assistant" | "system"; content: string };

// 1. Takes a system prompt string and an array of messages
//    Returns the total character count across all content fields
function getTotalLength(systemPrompt: string, messages: Message[]): number {
  const msgLength = messages.reduce((sum, m) => sum + m.content.length, 0);
  return systemPrompt.length + msgLength;
}

// 2. Takes messages and an optional max token limit (default: 4096)
//    Returns only the messages that fit within the limit
//    Assume 1 token = 4 characters
function trimToLimit(messages: Message[], maxTokens: number = 4096): Message[] {
  const limit = (maxTokens ?? 4096) * 4;
  let total = 0;
  return messages.filter((m) => {
    total += m.content.length;
    return total <= limit;
  });
}

// 3. Takes an array of messages and a formatter callback
//    The formatter receives each message and returns a display string
//    Returns an array of formatted strings
function formatMessages(
  messages: Message[],
  formatter: (message: Message) => string,
): string[] {
  return messages.map(formatter);
}

// 4. This function should NEVER return normally — it always throws
//    What return type should it have? -->checked solution
function assertValidPrompt(prompt: string): never {
  if (!prompt.trim()) {
    throw new Error("Prompt cannot be empty");
  }
  throw new Error("This function always throws — it is a guard");
}

// 5. Use formatMessages with an inline arrow function
//    Format each message as: "[ROLE] content"
const formatted = formatMessages(
  [
    { role: "user", content: "hello" },
    { role: "assistant", content: "hi" },
  ],
  (msg: Message) => {
    return `[${msg.role}] ${msg.content}`;
  },
);
