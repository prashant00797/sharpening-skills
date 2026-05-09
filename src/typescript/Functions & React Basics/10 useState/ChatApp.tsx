/*
Your Task
You are building the state layer for the AI chat app. 
Complete the useState calls for every piece of state.
*/

import { useState } from "react";

type AIModel = "gpt-4o" | "claude-3-5-sonnet" | "gemini-2.0-flash";
type MessageRole = "user" | "assistant" | "system";
type Message = {
  id: number;
  role: MessageRole;
  content: string;
  timestamp: Date;
};
type User = { id: string; name: string; email: string };

export function ChatApp() {
  // 1. Messages array — starts empty
  const [messages, setMessages] = useState<Message[]>([]);

  // 2. Current user — starts as null (not logged in yet)
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 3. Selected model — starts as gpt-4o
  const [selectedModel, setSelectedModel] = useState<AIModel>("gpt-4o");

  // 4. App status — can be idle, loading, or error
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  // 5. Input value — starts as empty string
  const [inputValue, setInputValue] = useState("");

  // 6. Error message — either null (no error) or a string
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ─────────────────────────────────────────────────
  // Now complete these state update functions:

  // Adds a new message to the list
  const addMessage = (role: MessageRole, content: string) => {
    const newMessage: Message = {
      id: Date.now(),
      role,
      content,
      timestamp: new Date(),
    };
    // Use functional update — new state depends on previous
    setMessages((prev) => [...prev, newMessage]);
  };

  // Clears all messages and resets error
  const clearChat = () => {
    setMessages([]);
    setErrorMsg(null);
  };

  // Sets user after login — receives a full User object
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setStatus("idle");
  };

  return <div>...</div>;
}
