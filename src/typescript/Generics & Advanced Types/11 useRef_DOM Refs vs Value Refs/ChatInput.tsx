// ChatInput.tsx
import { useRef, useEffect } from "react"
 
type Message = { id: number; content: string; role: string }
 
export function ChatInput({ messages }: { messages: Message[] }) {
 
  // 1. Ref to the textarea — for auto-focus
  const textareaRef = useRef<HTMLTextAreaElement>(null)
 
  // 2. Ref to the message list container — for auto-scroll
  const messageListRef = useRef<HTMLUListElement>(null)
 
  // 3. Ref to store the polling interval ID
  //    setInterval returns a number in browsers
  const pollingRef = useRef<number>(0)
 
  // Auto-focus the textarea on mount
  useEffect(() => {
    // Use textareaRef here — remember to null-check
      if (textareaRef.current) {
        textareaRef.current.focus
    }
  }, [])
 
  // Auto-scroll when messages change
  useEffect(() => {
    // Use messageListRef here — scroll to bottom -->checked solution
    // scrollTop = scrollHeight scrolls to bottom
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [messages])
 
  // Start polling on mount, clear on unmount

  useEffect(() => {
    pollingRef.current = setInterval(() => {
      console.log("polling...")
    }, 5000)
 
    return () => {
      // Clear the interval using pollingRef
       clearInterval(pollingRef.current)
    }
  }, [])
 
  return (
    <div>
      <ul ref={messageListRef}>{/* message list */}</ul>
      <textarea ref={textareaRef} />
    </div>
  )
}

