// PART A — Intersection types

import { ReactNode } from "react";

 
type WithId = { id: string }
type WithTimestamps = { createdAt: Date; updatedAt: Date }
type WithOwner = { userId: string }
 
// 1. A ChatSession must have id, timestamps, and owner — combine all three
type ChatSession = WithId & WithTimestamps & WithOwner
 
// 2. Base component props that all cards share
type BaseCardProps = {
  className?: string
  onClick?: () => void
}
 
// SessionCard adds session-specific props on top of base
type SessionCardProps = BaseCardProps & {
  session: ChatSession
  isActive: boolean
}


// ─────────────────────────────────────────────────
// PART B — Discriminated union for async state
 
// Build a proper async state type with 3 variants:
// loading — no data, no error
// success — has data of type T, no error
// error   — has error message, no data
 
type LoadingState = { status: "loading"}
type SuccessState<T> = { status: "success"; data: T }
type ErrorState = { status: "error"; message: string }
type RequestState<T> = LoadingState | SuccessState<T> | ErrorState

// Now build a component that renders different UI for each state
type AsyncViewProps<T> = {
  state: RequestState<T>
  renderSuccess: (data: T) => ReactNode
}

export function AsyncView<T,>({ state, renderSuccess }: AsyncViewProps<T>) {
  // Use switch on state.status
  // loading → show spinner text
  // error → show state.message
  // success → call renderSuccess(state.data)
  switch (state.status) {
    case "loading": return <p>Loading...</p>
    case "error": return <p>Error: {state.message}</p>
    case "success": return <>{renderSuccess(state.data)}</>
  }
}
 

 
