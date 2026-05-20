// awaited-practice.ts

import { useState } from "react";

async function fetchChatSession(id: string) {
  const res = await fetch(`/api/sessions/${id}`);
  return res.json() as Promise<{
    id: string;
    title: string;
    messageCount: number;
  }>;
}

// 1. Extract the resolved return type using Awaited + ReturnType
type FetchedSession = Awaited<ReturnType<typeof fetchChatSession>>;

// 2. Use it for state
const [session, setSession] = useState<FetchedSession | null>(null);
