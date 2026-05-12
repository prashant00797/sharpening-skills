// PART A — typeof narrowing

// A message ID can be a number (local) or UUID string (synced)
// Format it correctly based on its type
function formatMessageId(id: string | number): string {
  // if number → "MSG-{id}"
  // if string → first 8 chars of the UUID
  if (typeof id === "number") {
    return `MSG-${id}`;
  } else {
    return id.substring(0, 9);
  }
}
// ─────────────────────────────────────────────────
// PART B — "in" narrowing

type StreamingResponse = {
  chunk: string;
  isDone: boolean;
};

type CompletedResponse = {
  content: string;
  usage: { prompt_tokens: number; completion_tokens: number };
};

type AIResponse = StreamingResponse | CompletedResponse;

// Returns the displayable text from either response type
function getDisplayText(response: AIResponse): string {
  if ("chunk" in response) {
    return response.chunk;
  }
  return response.content;
}

// Returns total tokens used — only available on CompletedResponse -->checked solution
// Returns null if the response is still streaming
function getTotalTokens(response: AIResponse): number | null {
  if ("usage" in response) {
    return (
      response.usage["prompt_tokens"] + response.usage["completion_tokens"]
    );
  }
  return null;
}

// PART C — Discriminated union (recommended)

// Add a "kind" field to both types and rebuild the functions above
type StreamingResponse2 = {
  kind: "streaming";
  chunk: string;
  isDone: boolean;
};

type CompletedResponse2 = {
  kind: "completed";
  content: string;
  usage: { prompt_tokens: number; completion_tokens: number };
};

type AIResponse2 = StreamingResponse2 | CompletedResponse2;

// Rebuild getDisplayText using discriminated union — use switch
function getDisplayText2(response: AIResponse2): string {
  switch (response.kind) {
    case "streaming":
      return response.chunk;
    case "completed":
      return response.content;
  }
}
