/* Your Task
 Read the code below carefully. For each line, decide:
 • A — Annotation is unnecessary (TS already infers this).
 • B — Annotation is correct and needed.
 • C — Annotation is wrong or uses a bad type.
 • D — Annotation is missing — TS needs your help here.

 Then rewrite the full file with correct annotations only.
*/

// ai-logger.ts
let sessionId: string = "sess_abc123"; //A — Annotation is unnecessary (TS already infers this).
let messageCount: number = 0; // A — Annotation is unnecessary (TS already infers this).
let isStreaming: boolean = false; // A — Annotation is unnecessary (TS already infers this).
let rawResponse: any = { content: "Hello!", tokens: 42 }; //C — Annotation is wrong or uses a bad type.

//correct of rawResponse
type RawResponse = {
  content: string;
  tokens: number;
};

let _rawResponse: RawResponse = { content: "Hello", tokens: 42 };
let __rawResponse: { content: string; tokens: number } = {
  content: "Hello",
  tokens: 42,
};

function buildPrompt(userInput: string, systemPrompt: string) {
  //D — Annotation is missing — TS needs your help here. so add string type to each params
  return `${systemPrompt}\nUser: ${userInput}`;
}

function countTokens(text: string): number {
  //B — Annotation is correct and needed.
  return Math.ceil(text.length / 4);
}

const result: string = buildPrompt("Tell me a joke", "You are helpful"); // B — Annotation is correct and needed.

let lastError: string; // B — Annotation is correct and needed.
