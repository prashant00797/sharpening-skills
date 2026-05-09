// api-types.ts

// CASE 1 — Successful chat response from FastAPI:
// {
//   "id": "chatcmpl-xyz",
//   "model": "gpt-4o",
//   "content": "Here is your answer...",
//   "usage": { "prompt_tokens": 120, "completion_tokens": 80 },
//   "finish_reason": "stop"
// }
type ChatResponse = {
  id: string;
  model: string;
  content: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
  };
  finish_reason: string;
};

// CASE 2 — Error response:
// {
//   "error": "rate_limit_exceeded",
//   "message": "Too many requests",
//   "retry_after": 30   <-- this field may not always be present
// }
type ErrorResponse = {
  error: string;
  message: string;
  retry_after?: number;
};

// CASE 3 — Usage stats (returned daily, weekly, or monthly):
// {
//   "period": "daily",
//   "total_requests": 450,
//   "total_tokens": 128000,
//   "models_used": ["gpt-4o", "claude-3-5-sonnet"]

// }
type UsageStats = {
  period: "daily" | "weekly" | "monthly";
  total_requests: number;
  total_tokens: number;
  models_used: string[];
};

// ─────────────────────────────────────────────────
// Now use your types:

// 1. Extract just the text content from a chat response
function getContent(response: ChatResponse): string {
  return response.content;
}

// 2. Build an error message string from an error response
//    If retry_after exists, append " — retry in Xs" --> checked solution
function buildErrorMessage(err: ErrorResponse): string {
  if (err.retry_after !== undefined) {
    return `${err.message} - retry after ${err.retry_after}`;
  }
  return err.message;
}

// 3. Check if usage has exceeded a given token limit
function isOverLimit(stats: UsageStats, limit: number): boolean {
  return stats.total_requests > limit;
}
