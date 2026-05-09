/* You are building a search feature for an AI document assistant. 
 Search results are arrays of objects. 
 Model pricing is a key-value map. 
A search result's position is a fixed [row, column] pair. You need to type all of these correctly.
*/

// search-types.ts

// You already have this from Day 3:
type AIModel = "gpt-4o" | "claude-3-5-sonnet" | "gemini-2.0-flash";

// 1. A single search result
type SearchResult = {
  documentId: string;
  title: string;
  snippet: string;
  score: number; // relevance score 0-1

  position: [row: number, column: number]; // [row, column] — fixed 2-number pair
};

// 2. Type the following variables correctly

// An array of search results
let results: SearchResult[];

// Cost per 1K tokens for each model — keys are model names
// { "gpt-4o": 0.005, "claude-3-5-sonnet": 0.003, "gemini-2.0-flash": 0.001 }
let modelPricing: Record<AIModel, number> = {
  "gpt-4o": 0.005,
  "claude-3-5-sonnet": 0.003,
  "gemini-2.0-flash": 0.001,
};

// Track how many searches each user ran today
// { "user_abc": 12, "user_xyz": 5 }  — user IDs are unknown strings
let searchCounts: Record<string, number> = {};

// 3. Complete these functions

// Returns the highest-scoring result from an array
function getTopResult(results: SearchResult[]): SearchResult {
  return results.reduce((best, current) =>
    current.score > best.score ? current : best,
  );
}

// Returns the cost estimate for a given model and token count
function estimateCost(model: AIModel, tokens: number): number {
  // use modelPricing here
  return modelPricing[model] * (tokens / 1000);
}

// Returns [minScore, maxScore] from results — must be a tuple
function getScoreRange(results: SearchResult[]): SearchResult["position"] {
  const scores = results.map((r) => r.score);
  return [Math.min(...scores), Math.max(...scores)];
}
